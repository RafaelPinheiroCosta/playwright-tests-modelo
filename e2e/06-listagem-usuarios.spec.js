/**
 * TESTE 06 — Listagem de usuários
 *
 * Objetivo:
 * Validar se um administrador consegue acessar a tela de usuários.
 *
 * O que este teste ensina:
 * - Login antes de acessar uma tela protegida.
 * - Navegação para rota administrativa.
 * - Validação de carregamento de listagem/tabela.
 *
 * Quando usar:
 * Para garantir que a tela de gestão de usuários está acessível e carregando
 * corretamente.
 */
import { test } from '@playwright/test';
import { realizarLoginPelaInterface } from '../helpers/auth.js';
import { UsuariosPage } from '../pages/UsuariosPage.js';

test.describe('06 - Listagem de usuários', () => {
  test('deve acessar e exibir a listagem de usuários', async ({ page }) => {
    await realizarLoginPelaInterface(page);
    const usuariosPage = new UsuariosPage(page);
    await usuariosPage.acessar();
    await usuariosPage.deveExibirListagem();
  });
});
