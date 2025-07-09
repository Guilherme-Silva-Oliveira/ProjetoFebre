export default async function produtoRoutes(fastify, opts) {
  const { prisma } = fastify;

  fastify.get('/produtos', async (req, reply) => {
    const produtos = await prisma.produto.findMany({
      include: {
        variacoes: {
          where: { quantidade: { gt: 0 } },
        },
      },
    });
    reply.send(produtos);
  });
}
