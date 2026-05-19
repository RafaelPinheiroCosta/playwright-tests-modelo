import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) { this.page = page; }

  async deveEstarAutenticado() {
    await expect(this.page).not.toHaveURL(/login/);
  }

  async deveExibirAlgumConteudoPrincipal() {
    await expect(this.page.locator('body')).toBeVisible();
  }
}
