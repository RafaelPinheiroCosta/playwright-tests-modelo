/**
 * TESTE 08 — Fluxo completo administrativo
 *
 * Objetivo:
 * Executar um fluxo E2E mais completo: login, cadastro de professor e retorno
 * para a listagem de usuários.
 *
 * O que este teste ensina:
 * - Encadeamento de várias ações em um único cenário.
 * - Reuso de Page Objects.
 * - Teste de fluxo real de negócio.
 * - Validação de que a aplicação continua navegável após uma criação.
 *
 * Quando usar:
 * Para demonstrar um teste de ponta a ponta mais próximo do uso real do
 * sistema por um administrador.
 */
import { test } from '@playwright/test';
import { realizarLoginPelaInterface } from '../helpers/auth.js';
import { CadastroPage } from '../pages/CadastroPage.js';
import { UsuariosPage } from '../pages/UsuariosPage.js';
import { gerarProfessorAdmin } from '../fixtures/usuarios.js';

test.describe('08 - Fluxo completo administrativo', () => {
  test('deve criar professor e acessar a listagem de usuários', async ({ page }) => {

    // Login administrativo
    await realizarLoginPelaInterface(page);

    // Gera dados únicos para evitar conflito de e-mail
    const professor = gerarProfessorAdmin();

    // Abre formulário e realiza cadastro
    const cadastroPage = new CadastroPage(page);

    await cadastroPage.cadastrarProfessor(professor);

    // Valida criação com sucesso
    await cadastroPage.deveExibirSucesso();

    // Volta para listagem
    const usuariosPage = new UsuariosPage(page);

    await usuariosPage.acessar();

    // Valida que a listagem carregou corretamente
    await usuariosPage.deveExibirListagem();
  });
});