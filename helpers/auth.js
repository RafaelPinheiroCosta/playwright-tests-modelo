import { adminValido } from '../fixtures/usuarios.js';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';

export async function realizarLoginPelaInterface(page, usuario = adminValido) {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await loginPage.login(usuario.email, usuario.senha);
  await homePage.deveEstarAutenticado();
}
