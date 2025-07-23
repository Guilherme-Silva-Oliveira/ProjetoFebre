// controllers/presencaController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.confirmarPresenca = async (req, reply) => {
  const { usuarioId, jogoId, convidados } = req.body; // convidados: array de strings

  if (convidados && convidados.length > 3) {
    return reply.code(400).send({ erro: 'Limite de até 3 convidados.' });
  }

  try {
    // Verifica se já há presença
    const presencaExistente = await prisma.presenca.findFirst({
      where: { usuarioId, jogoId }
    });

    if (presencaExistente) {
      return reply.code(400).send({ erro: 'Presença já confirmada para este jogo.' });
    }

    // Cria presença
    const novaPresenca = await prisma.presenca.create({
      data: {
        usuarioId,
        jogoId,
        confirmado: true,
        qtdConvidados: convidados?.length || 0
      }
    });

    // Cria convidados, se existirem
    if (convidados?.length) {
      const convidadosCriados = await prisma.convidado.createMany({
        data: convidados.map(nome => ({
          nome,
          presencaId: novaPresenca.id
        }))
      });
    }

    reply.send({ mensagem: 'Presença confirmada com sucesso.' });
  } catch (err) {
    reply.code(500).send({ erro: 'Erro ao confirmar presença', detalhe: err.message });
  }
};

exports.retirarPresenca = async (req, reply) => {
  const { usuarioId, jogoId } = req.body;

  try {
    const presenca = await prisma.presenca.findFirst({
      where: { usuarioId, jogoId }
    });

    if (!presenca) {
      return reply.code(404).send({ erro: 'Presença não encontrada.' });
    }

    // Remove os convidados primeiro
    await prisma.convidado.deleteMany({
      where: { presencaId: presenca.id }
    });

    // Remove a presença
    await prisma.presenca.delete({
      where: { id: presenca.id }
    });

    reply.send({ mensagem: 'Presença retirada com sucesso.' });
  } catch (err) {
    reply.code(500).send({ erro: 'Erro ao retirar presença', detalhe: err.message });
  }
};