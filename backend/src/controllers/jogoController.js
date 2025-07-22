const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Já existente
exports.criarJogo = async (req, reply) => {
  const { data, local, adversario, campeonato } = req.body;

  try {
    const novoJogo = await prisma.jogo.create({
      data: {
        data: new Date(data),
        local,
        adversario,
        campeonato,
      },
    });

    reply.send({ mensagem: 'Jogo criado com sucesso', jogo: novoJogo });
  } catch (err) {
    reply.code(500).send({ erro: 'Erro ao criar jogo', detalhe: err.message });
  }
};

// NOVA função para visão geral
function formatarJogo(jogo) {
  if (!jogo) return null;

  return {
    adversario: jogo.adversario,
    local: jogo.local,
    campeonato: jogo.campeonato,
    data: jogo.data.toLocaleDateString('pt-BR'),
    horario: jogo.data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    confronto: `São Bernardo do Campo x ${jogo.adversario}`
  };
}

exports.obterResumoDosJogos = async (req, reply) => {
  const agora = new Date();

  try {
    const ultimoJogo = await prisma.jogo.findFirst({
      where: {
        data: { lt: agora }
      },
      orderBy: { data: 'desc' }
    });

    const proximosJogos = await prisma.jogo.findMany({
      where: {
        data: { gte: agora }
      },
      orderBy: { data: 'asc' },
      take: 2
    });

    const proximoJogo = proximosJogos[0] || null;
    const segundoProximo = proximosJogos[1] || null;

    reply.send({
      ultimoJogo: formatarJogo(ultimoJogo),
      proximoJogo: formatarJogo(proximoJogo),
      segundoProximo: formatarJogo(segundoProximo)
    });
  } catch (err) {
    reply.code(500).send({ erro: 'Erro ao buscar resumo dos jogos', detalhe: err.message });
  }
};