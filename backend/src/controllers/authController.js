const bcrypt = require('bcrypt');

exports.register = async (req, reply) => {
  try {
    const prisma = req.server.prisma;
    const { nome, email, senha, cpf } = req.body;

    const usuarioExistente = await prisma.usuario.findFirst({
      where: {
        OR: [
          { email },
          { cpf }
        ]
      }
    });

    if (usuarioExistente) {
      return reply.code(400).send({ error: 'Email ou CPF já cadastrado' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
        cpf,
        confirmPagamento: false
      }
    });

    reply.send({ mensagem: 'Usuário registrado com sucesso. Aguarde confirmação de pagamento.', usuario: { id: novoUsuario.id, nome: novoUsuario.nome } });
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

    if (!usuario.confirmPagamento) {
    return reply.code(403).send({ error: 'Pagamento pendente. Aguarde a confirmação para acessar a conta.' });
  }

    return reply.send({ mensagem: 'Login bem-sucedido', usuario: { id: usuario.id, nome: usuario.nome } });
  } catch (err) {
    console.error('Erro no login:', err);
    return reply.code(500).send({ error: 'Erro interno no servidor' });
  }
};