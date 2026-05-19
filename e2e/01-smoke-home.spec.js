/**
 * TESTE 01 — Smoke da aplicação
 *
 * Objetivo:
 * Verificar se a aplicação web carrega corretamente.
 *
 * O que este teste ensina:
 * - Uso básico do `page.goto()`.
 * - Validação de carregamento da página.
 * - Uso de `expect()` com elementos visíveis.
 *
 * Quando usar:
 * Antes de executar testes maiores, para confirmar que o frontend está online
 * e que a página principal consegue ser carregada pelo navegador.
 */
import { test, expect } from '@playwright/test';

test.describe('01 - Smoke da aplicação', () => {
  test('deve carregar a página inicial', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });
});
