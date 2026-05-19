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
