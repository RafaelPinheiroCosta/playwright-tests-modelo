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
