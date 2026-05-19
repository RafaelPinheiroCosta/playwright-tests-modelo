import { test, expect } from '@playwright/test';
import { usuarioInvalido } from '../fixtures/usuarios.js';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('03 - Login inválido', () => {
  test('deve permanecer no login ou mostrar erro ao informar credenciais inválidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(usuarioInvalido.email, usuarioInvalido.senha);
    const continuaNoLogin = page.url().includes('/login');
    const mensagemErro = page.getByText(/inválid|erro|credenciais|senha|e-mail/i);
    if (continuaNoLogin) await loginPage.deveEstarNaTelaDeLogin();
    else await expect(mensagemErro).toBeVisible();
  });
});
