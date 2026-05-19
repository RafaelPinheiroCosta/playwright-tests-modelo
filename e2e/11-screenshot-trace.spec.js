import { test, expect } from '@playwright/test';

test.describe('11 - Screenshot e diagnóstico', () => {
  test('deve gerar screenshot manual da tela de login', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('body')).toBeVisible();
    await page.screenshot({ path: 'test-results/login-screenshot.png', fullPage: true });
  });
});
