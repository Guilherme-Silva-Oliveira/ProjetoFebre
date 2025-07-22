const presencaController = require('../controllers/presencaController');

async function presencaRoutes(fastify, options) {
  fastify.post('/presenca', presencaController.confirmarPresenca);
  fastify.post('/presenca/confirmar', presencaController.confirmarPresenca);
  fastify.post('/presenca/retirar', presencaController.retirarPresenca);
}

module.exports = presencaRoutes;