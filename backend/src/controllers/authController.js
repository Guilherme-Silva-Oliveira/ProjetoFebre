const bcrypt = require('bcrypt');

exports.register = async (req, reply) => {
  try {
    const prisma = req.server.prisma;
    const { nome, email, senha } = req.body;

    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) {
      return reply.code(400).send({ error: 'Email já cadastrado' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaCriptografada }
    });

    return reply.send({ mensagem: 'Usuário registrado com sucesso', usuario: novoUsuario });
  } catch (err) {
    console.error('Erro no register:', err);
    return reply.code(500).send({ error: 'Erro interno no servidor' });
  }
};

exports.login = async (req, reply) => {
  try {
    const prisma = req.server.prisma;
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return reply.code(401).send({ error: 'Email não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return reply.code(401).send({ error: 'Senha inválida' });
    }

    return reply.send({ mensagem: 'Login bem-sucedido', usuario: { id: usuario.id, nome: usuario.nome } });
  } catch (err) {
    console.error('Erro no login:', err);
    return reply.code(500).send({ error: 'Erro interno no servidor' });
  }
};