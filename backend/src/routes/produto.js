export default async function produtoRoutes(fastify, opts) {
  const { prisma } = fastify;

  fastify.get('/produtos', async (req, reply) => {
    try {
      const produtos = await prisma.produto.findMany({
        include: {
          variacoes: {
            where: { quantidade: { gt: 0 } },
            take: 1, // só uma variação por produto
          },
        },
      });

      const formatados = produtos.map((produto) => {
        const variacao = produto.variacoes[0];

        return {
          id: produto.id,
          nome: produto.nome,
          imagem: produto.imagem,
          preco: variacao ? Number(variacao.preco) : 0,
          variacaoId: variacao ? variacao.id : null,
        };
      });

      reply.send(formatados);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      reply.status(500).send({ erro: 'Erro ao buscar produtos' });
    }
  });
}
