const { PrismaClient } = require ('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.produto.create({
    data: {
      nome: 'Camisa Febre Amarela',
      variacoes: {
        create: [
          { tamanho: 'P', quantidade: 10, preco: 99.90 },
          { tamanho: 'M', quantidade: 5, preco: 99.90 },
          { tamanho: 'G', quantidade: 0, preco: 99.90 },
        ],
      },
    },
  });

  await prisma.produto.create({
    data: {
      nome: 'Boné Oficial',
      variacoes: {
        create: [{ tamanho: 'Único', quantidade: 15, preco: 59.90 }],
      },
    },
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
