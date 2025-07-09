const presencaController = require('../controllers/presencaController');

async function presencaRoutes(fastify, options) {
  fastify.post('/presenca', presencaController.confirmarPresenca);
}

module.exports = presencaRoutes;