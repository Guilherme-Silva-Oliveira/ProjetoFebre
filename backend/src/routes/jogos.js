const jogoController = require('../controllers/jogoController');

async function jogoRoutes(fastify, options) {
  fastify.post('/jogos', jogoController.criarJogo);
}

module.exports = jogoRoutes;