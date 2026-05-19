/**
 * TESTE 05 — Usuário autenticado na interface
 *
 * Objetivo:
 * Validar se, após o login, a aplicação carrega uma área autenticada.
 *
 * O que este teste ensina:
 * - Reaproveitamento de helper de login.
 * - Validação de estado autenticado.
 * - Organização de código com funções auxiliares.
 *
 * Quando usar:
 * Para verificar se o login realmente altera o estado da aplicação e libera
 * acesso às áreas internas.
 */
import { test, expect } from '@playwright/test';
import { realizarLoginPelaInterface } from '../helpers/auth.js';

test.describe('05 - Usuário autenticado na interface', () => {
  test('deve carregar área autenticada após login', async ({ page }) => {
    await realizarLoginPelaInterface(page);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).not.toHaveURL(/login/);
  });
});
