export const adminValido = {
  email: process.env.ADMIN_EMAIL || 'admin@senai.com',
  senha: process.env.ADMIN_SENHA || 'admin123',
};

export const usuarioInvalido = {
  email: 'usuario.invalido@teste.com',
  senha: 'senha-incorreta',
};

export function gerarEmailUnico(prefixo = 'playwright') {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  return `${prefixo}.${timestamp}.${random}@teste.com`;
}

function gerarCpfFormatado() {
  const random = Math.floor(Math.random() * 1000000000);
  const digits = String(random).padStart(9, '0');
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-00`;
}

export function gerarProfessorAdmin() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);

  return {
    nome: `Professor Playwright ${timestamp}`,
    email: gerarEmailUnico('professor.playwright'),
    cpf: gerarCpfFormatado(),
    senha: '123456',
    role: 'PROFESSOR',
    tipoUsuario: 'PROFESSOR',
    statusCadastro: 'APROVADO',
    matricula: `PW${timestamp}${random}`,
  };
}

// Mantido como alias para compatibilidade com materiais anteriores.
export function gerarProfessorPublico() {
  return gerarProfessorAdmin();
}
