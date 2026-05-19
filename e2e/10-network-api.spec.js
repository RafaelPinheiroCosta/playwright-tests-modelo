import { test, expect } from '@playwright/test';
import { adminValido } from '../fixtures/usuarios.js';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('10 - Observando chamadas de rede', () => {
  test('deve aguardar a resposta da API de login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.acessar();
    await loginPage.preencherEmail(adminValido.email);
    await loginPage.preencherSenha(adminValido.senha);
    const [response] = await Promise.all([
      page.waitForResponse((resp) => resp.url().includes('/auth/login') && resp.request().method() === 'POST'),
      loginPage.clicarEntrar(),
    ]);
    expect(response.status()).toBe(200);
  });
});
