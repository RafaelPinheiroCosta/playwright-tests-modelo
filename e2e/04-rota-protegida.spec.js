import { test, expect } from '@playwright/test';

test.describe('04 - Rota protegida', () => {
  test('deve redirecionar ou bloquear usuário não autenticado', async ({ page }) => {
    await page.goto('/usuarios');
    if (page.url().includes('/login')) await expect(page).toHaveURL(/login/);
    else await expect(page.locator('body')).toContainText(/acesso|login|não autorizado|entrar/i);
  });
});
