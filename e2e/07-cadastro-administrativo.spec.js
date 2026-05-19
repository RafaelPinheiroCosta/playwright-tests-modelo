/**
 * TESTE 07 — Cadastro administrativo de usuário
 *
 * Objetivo:
 * Validar se um administrador consegue criar um novo professor pelo painel web.
 *
 * O que este teste ensina:
 * - Preenchimento de formulário administrativo.
 * - Seleção de tipo de usuário.
 * - Geração de dados únicos para evitar conflito.
 * - Validação de criação de registro.
 *
 * Quando usar:
 * Para testar um fluxo de escrita no sistema, ou seja, um cenário em que o
 * usuário altera o estado do banco de dados.
 */
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
