import { expect } from '@playwright/test';
import { routes } from '../helpers/routes.js';

export class UsuariosPage {
  constructor(page) {
    this.page = page;
    this.novoUsuarioButton = page.getByRole('button', { name: /novo usuário/i });
    this.buscarInput = page.getByPlaceholder(/buscar na tabela/i);
  }

  async acessar() {
    await this.page.goto(routes.usuarios);
    await expect(
      this.page.locator('h4', { hasText: /^Usuários$/i })
    ).toBeVisible();
  }

  async irParaNovoUsuario() {
    await this.novoUsuarioButton.click();
    await expect(this.page).toHaveURL(/usuarios\/novo/);
  }

  async deveExibirListagem() {
    const body = this.page.locator('body');
    await expect(body).toBeVisible();
    await expect(body).toContainText(/resultados|usuário|papel|status/i);
  }

  async buscarNaTabela(texto) {
    if (await this.buscarInput.count()) {
      await this.buscarInput.fill(texto);
    }
  }

  async deveConterEmail(email) {
    await expect(this.page.getByText(email)).toBeVisible();
  }
}
