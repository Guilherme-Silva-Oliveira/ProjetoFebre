const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.confirmarPresenca = async (req, reply) => {
  const { usuarioId, jogoId } = req.body;

  try {
    const novaPresenca = await prisma.presenca.create({
      data: {
        usuarioId: Number(usuarioId),
        jogoId: Number(jogoId),
        confirmado: true
      },
    });

    reply.send({ mensagem: 'Presença confirmada!', presenca: novaPresenca });
  } catch (err) {
    reply.code(500).send({ erro: 'Erro ao confirmar presença', detalhe: err.message });
  }
};