/**
 * TESTE 04 — Rota protegida
 *
 * Objetivo:
 * Verificar se uma rota administrativa bloqueia usuários não autenticados.
 *
 * O que este teste ensina:
 * - Teste de autorização no frontend.
 * - Validação de redirecionamento para login.
 * - Proteção de páginas privadas.
 *
 * Quando usar:
 * Para garantir que telas internas não possam ser acessadas diretamente
 * sem autenticação.
 */
import { test, expect } from '@playwright/test';

test.describe('04 - Rota protegida', () => {
  test('deve redirecionar ou bloquear usuário não autenticado', async ({ page }) => {
    await page.goto('/usuarios');
    if (page.url().includes('/login')) await expect(page).toHaveURL(/login/);
    else await expect(page.locator('body')).toContainText(/acesso|login|não autorizado|entrar/i);
  });
});
