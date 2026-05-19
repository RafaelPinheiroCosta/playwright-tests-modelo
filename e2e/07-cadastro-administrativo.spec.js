import { test } from '@playwright/test';
import { realizarLoginPelaInterface } from '../helpers/auth.js';
import { CadastroPage } from '../pages/CadastroPage.js';
import { gerarProfessorAdmin } from '../fixtures/usuarios.js';

test.describe('07 - Cadastro administrativo de usuário', () => {
  test('deve cadastrar um professor pelo painel administrativo', async ({ page }) => {
    await realizarLoginPelaInterface(page);

    const professor = gerarProfessorAdmin();
    const cadastroPage = new CadastroPage(page);

    await cadastroPage.cadastrarProfessor(professor);
    await cadastroPage.deveExibirSucesso();
  });
});
