export default async function carrinhoRoutes(fastify, opts) {
  const { prisma } = fastify;

   fastify.post('/pedido/criar', async (req, reply) => {
    const { usuarioId } = req.body;

    try {
      const novoPedido = await prisma.pedido.create({
        data: {
          usuarioId,
          precoTotal: 0,
        },
      });

      reply.send({ pedidoId: novoPedido.id });
    } catch (err) {
      reply.status(500).send({ erro: 'Erro ao criar pedido', detalhes: err.message });
    }
  });

  fastify.post('/carrinho/adicionar', async (req, reply) => {
    const { pedidoId, produtoVariacaoId, quantidade } = req.body;

    const variacao = await prisma.produtoVariacao.findUnique({
      where: { id: produtoVariacaoId },
    });

    if (!variacao || variacao.quantidade < quantidade) {
      return reply.status(400).send({ erro: 'Estoque insuficiente' });
    }

    const item = await prisma.pedidoProduto.create({
      data: {
        pedidoId,
        produtoVariacaoId,
        quantidade,
        precoUnitario: variacao.preco,
      },
    });

    reply.send(item);
  });

  fastify.post('/carrinho/finalizar', async (req, reply) => {
    const { pedidoId } = req.body;

    const itens = await prisma.pedidoProduto.findMany({
      where: { pedidoId },
      include: { produtoVariacao: true },
    });

    if (!itens.length) {
      return reply.status(400).send({ erro: 'Pedido vazio' });
    }

    let total = 0;

    for (const item of itens) {
      total += Number(item.precoUnitario) * item.quantidade;

      await prisma.produtoVariacao.update({
        where: { id: item.produtoVariacaoId },
        data: { quantidade: { decrement: item.quantidade } },
      });
    }

    const pedidoFinalizado = await prisma.pedido.update({
      where: { id: pedidoId },
      data: {
        precoTotal: total,
        data: new Date(),
      },
    });

    reply.send(pedidoFinalizado);
  });
}
