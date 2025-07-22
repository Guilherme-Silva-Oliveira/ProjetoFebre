const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Usuários
  const usuario1 = await prisma.usuario.create({
    data: {
      nome: "João Silva",
      email: "joao@email.com",
      senha: "senha123",
      cpf: "12345678900"
    }
  });

  // Jogos
  const jogo1 = await prisma.jogo.create({
    data: {
      data: new Date("2025-08-15T19:00:00Z"),
      local: "Estádio da Vila",
      adversario: "Time Inimigo",
      campeonato: "Campeonato Paulista"
    }
  });

  const jogo2 = await prisma.jogo.create({
    data: {
      data: new Date("2025-07-10T16:00:00Z"),
      local: "Estádio do Pacaembu",
      adversario: "Time Antigo",
      campeonato: "Amistoso",
      jaPassou: true
    }
  });

  // Presença confirmada
  await prisma.presenca.create({
    data: {
      usuarioId: usuario1.id,
      jogoId: jogo1.id,
      confirmado: true
    }
  });

  // Produto com variações
  const produto1 = await prisma.produto.create({
    data: {
      nome: "Camisa Oficial",
      variacoes: {
        create: [
          {
            tamanho: "M",
            preco: new Prisma.Decimal(120),
            quantidade: 50
          },
          {
            tamanho: "G",
            preco: new Prisma.Decimal(125),
            quantidade: 30
          }
        ]
      }
    },
    include: { variacoes: true }
  });

  // Pedido com produtos
  await prisma.pedido.create({
    data: {
      usuarioId: usuario1.id,
      precoTotal: new Prisma.Decimal(120),
      produtos: {
        create: [
          {
            produtoVariacaoId: produto1.variacoes[0].id,
            quantidade: 1,
            precoUnitario: new Prisma.Decimal(120)
          }
        ]
      }
    }
  });

  console.log("Seeding concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });