/**
 * TESTE 02 — Login com sucesso
 *
 * Objetivo:
 * Validar se um usuário válido consegue autenticar pela interface.
 *
 * O que este teste ensina:
 * - Preenchimento de formulário.
 * - Clique em botão.
 * - Uso de Page Object.
 * - Validação de navegação após login.
 *
 * Quando usar:
 * Para garantir que o fluxo principal de autenticação está funcionando
 * corretamente na interface web.
 */
import { test } from '@playwright/test';
import { adminValido } from '../fixtures/usuarios.js';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';

test.describe('02 - Login com sucesso', () => {
  test('deve autenticar com usuário válido', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginPage.login(adminValido.email, adminValido.senha);
    await homePage.deveEstarAutenticado();
    await homePage.deveExibirAlgumConteudoPrincipal();
  });
});
