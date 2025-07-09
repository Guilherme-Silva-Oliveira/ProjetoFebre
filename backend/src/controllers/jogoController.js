const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.criarJogo = async (req, reply) => {
  const { data, local, adversario } = req.body;

  try {
    const novoJogo = await prisma.jogo.create({
      data: {
        data: new Date(data), // precisa ser string ISO ex: "2025-07-05T19:00:00Z"
        local,
        adversario,
      },
    });

    reply.send({ mensagem: 'Jogo criado com sucesso', jogo: novoJogo });
  } catch (err) {
    reply.code(500).send({ erro: 'Erro ao criar jogo', detalhe: err.message });
  }
};