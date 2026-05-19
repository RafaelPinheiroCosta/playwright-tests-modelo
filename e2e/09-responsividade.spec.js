import { test, expect } from '@playwright/test';

test.describe('09 - Responsividade', () => {
  test('deve carregar login em largura de celular', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/login');
    await expect(page.locator('body')).toBeVisible();
    await expect(page.getByRole('button', { name: /entrar|login|acessar/i })).toBeVisible();
  });

  test('deve carregar login em largura desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto('/login');
    await expect(page.locator('body')).toBeVisible();
    await expect(page.getByRole('button', { name: /entrar|login|acessar/i })).toBeVisible();
  });
});
