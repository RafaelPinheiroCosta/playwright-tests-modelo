import { expect } from '@playwright/test';
import { routes } from '../helpers/routes.js';

export class CadastroPage {
  constructor(page) {
    this.page = page;

    this.nomeInput = page.getByRole('textbox', { name: /^nome$/i });
    this.emailInput = page.getByRole('textbox', { name: /e-?mail/i });
    this.cpfInput = page.getByRole('textbox', { name: /cpf/i });
    this.senhaInput = page.getByLabel(/^senha$/i);

    this.salvarButton = page.getByRole('button', { name: /salvar/i });
  }

  async acessarNovoUsuario() {
    await this.page.goto(routes.usuariosNovo);

    await expect(
      this.page.locator('h4', { hasText: /novo usuário/i })
    ).toBeVisible();
  }

  async selecionarTipoProfessor() {
    const tipoUsuario = this.page.getByRole('combobox', {
      name: /tipo de usuário/i,
    });

    await tipoUsuario.click();
    await this.page.getByRole('option', { name: /professor/i }).click();
  }

  async preencherProfessor(usuario) {
    await expect(this.nomeInput).toBeVisible();
    await this.nomeInput.fill(usuario.nome);

    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(usuario.email);

    await expect(this.cpfInput).toBeVisible();
    await this.cpfInput.fill(usuario.cpf);

    await this.selecionarTipoProfessor();

    await expect(this.senhaInput).toBeVisible();
    await this.senhaInput.fill(usuario.senha);
  }

  async salvar() {
    const [response] = await Promise.all([
      this.page.waitForResponse((resp) =>
        resp.url().includes('/usuarios') &&
        resp.request().method() === 'POST'
      ),
      this.salvarButton.click(),
    ]);

    if (response.status() !== 201) {
      console.log('CREATE USER STATUS:', response.status());
      console.log('CREATE USER BODY:', await response.text());
    }

    await expect(response.status()).toBe(201);
  }

  async cadastrarProfessor(usuario) {
    await this.acessarNovoUsuario();
    await this.preencherProfessor(usuario);
    await this.salvar();
  }

  async deveExibirSucesso() {
    const mensagemSucesso = this.page.getByText(/usuário criado|sucesso|salvo/i);
    const tituloUsuarios = this.page.locator('h4', { hasText: /^Usuários$/i });

    await expect(
      mensagemSucesso.or(tituloUsuarios)
    ).toBeVisible({ timeout: 10000 });
  }
}