const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

exports.register = async (req, reply) => {
  const { nome, email, senha } = req.body;

  const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
  if (usuarioExistente) {
    return reply.code(400).send({ error: 'Email já cadastrado' });
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);
  const novoUsuario = await prisma.usuario.create({
    data: { nome, email, senha: senhaCriptografada }
  });

  reply.send({ mensagem: 'Usuário registrado com sucesso', usuario: novoUsuario });
};

exports.login = async (req, reply) => {
  const { email, senha } = req.body;

  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) return reply.code(401).send({ error: 'Email não encontrado' });

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) return reply.code(401).send({ error: 'Senha inválida' });

  reply.send({ mensagem: 'Login bem-sucedido', usuario: { id: usuario.id, nome: usuario.nome } });
};
