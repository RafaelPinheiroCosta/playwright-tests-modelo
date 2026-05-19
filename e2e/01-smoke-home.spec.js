import { test, expect } from '@playwright/test';

test.describe('01 - Smoke da aplicação', () => {
  test('deve carregar a página inicial', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });
});
