const jogoController = require('../controllers/jogoController');

async function jogoRoutes(fastify, options) {
  fastify.post('/jogos', jogoController.criarJogo);

  fastify.get('/resumo-jogos', jogoController.obterResumoDosJogos);
}

module.exports = jogoRoutes;