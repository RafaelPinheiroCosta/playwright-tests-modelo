import { test, expect } from '@playwright/test';
import { realizarLoginPelaInterface } from '../helpers/auth.js';

test.describe('05 - Usuário autenticado na interface', () => {
  test('deve carregar área autenticada após login', async ({ page }) => {
    await realizarLoginPelaInterface(page);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).not.toHaveURL(/login/);
  });
});
