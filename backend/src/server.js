require('dotenv').config();
const Fastify = require('fastify');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/auth');

const app = Fastify({ logger: true });
const prisma = new PrismaClient();

const jogoRoutes = require('./routes/jogos');
const presencaRoutes = require('./routes/presencas');
const produtoRoutes = require('./routes/produto');
const carrinhoRoutes = require('./routes/carrinho');

app.decorate('prisma', prisma);
app.register(authRoutes, { prefix: '/auth' });
app.register(jogoRoutes);
app.register(presencaRoutes);
app.register(produtoRoutes);
app.register(carrinhoRoutes);

app.listen({ port: 3000 }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
