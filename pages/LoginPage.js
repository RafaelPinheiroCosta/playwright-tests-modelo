import { expect } from '@playwright/test';
import { routes } from '../helpers/routes.js';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByLabel(/e-?mail/i);
    this.senhaInput = page.getByLabel(/senha/i);
    this.entrarButton = page.getByRole('button', { name: /entrar|login|acessar/i });
  }

  async acessar() { await this.page.goto(routes.login); }
  async preencherEmail(email) { await this.emailInput.fill(email); }
  async preencherSenha(senha) { await this.senhaInput.fill(senha); }
  async clicarEntrar() { await this.entrarButton.click(); }

  async login(email, senha) {
    await this.acessar();
    await this.preencherEmail(email);
    await this.preencherSenha(senha);
    await this.clicarEntrar();
  }

  async deveEstarNaTelaDeLogin() { await expect(this.page).toHaveURL(/login/); }
  async deveExibirBotaoEntrar() { await expect(this.entrarButton).toBeVisible(); }
}
