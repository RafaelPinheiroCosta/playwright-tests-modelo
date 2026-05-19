# Projeto Modelo de Testes E2E com Playwright

Este projeto foi criado como material didático para ensinar **Playwright** em uma aplicação web real com autenticação, painel administrativo e cadastro de usuário.

A versão atual foi ajustada para o fluxo real da aplicação web:

- o cadastro público pertence ao app mobile;
- a web usa cadastro administrativo em `/usuarios/novo`;
- o teste de cadastro agora faz login como administrador, abre a tela de novo usuário e cadastra um professor pelo painel web.

---

## 1. O que é Playwright?

O **Playwright** é uma ferramenta de automação de navegadores usada principalmente para testes **E2E** (*End-to-End*).

Ele permite escrever código para controlar um navegador real:

- abrir páginas;
- clicar em botões;
- preencher formulários;
- validar textos;
- testar login;
- testar rotas protegidas;
- testar tabelas;
- simular telas mobile e desktop;
- observar chamadas HTTP;
- capturar screenshots;
- gerar traces para depuração.

Na prática, o Playwright responde à pergunta:

```txt
O usuário consegue usar o sistema pela interface?
```

---

## 2. O que é teste E2E?

E2E significa **End-to-End**, ou seja, teste de ponta a ponta.

Um teste E2E valida o fluxo completo:

```txt
navegador
↓
frontend
↓
backend/API
↓
banco de dados
↓
resposta na interface
```

Exemplo real deste projeto:

```txt
abrir login
↓
preencher e-mail e senha
↓
clicar em entrar
↓
entrar no painel administrativo
↓
abrir usuários
↓
criar novo professor
↓
validar mensagem de sucesso
```

---

## 3. Diferença entre Playwright e k6

| Ferramenta | Objetivo principal |
|---|---|
| Playwright | Testar comportamento do usuário na interface |
| k6 | Testar performance/carga da API |

O Playwright abre navegador real.

O k6 não abre navegador; ele faz requisições HTTP diretamente.

```txt
Playwright → o sistema funciona para o usuário?
k6         → a API aguenta carga?
```

---

## 4. Estrutura do projeto

```txt
playwright-tests-modelo/
├── README.md
├── package.json
├── playwright.config.js
├── e2e/
│   ├── 01-smoke-home.spec.js
│   ├── 02-login-sucesso.spec.js
│   ├── 03-login-invalido.spec.js
│   ├── 04-rota-protegida.spec.js
│   ├── 05-auth-me-ui.spec.js
│   ├── 06-listagem-usuarios.spec.js
│   ├── 07-cadastro-administrativo.spec.js
│   ├── 08-fluxo-completo.spec.js
│   ├── 09-responsividade.spec.js
├── pages/
│   ├── LoginPage.js
│   ├── HomePage.js
│   ├── UsuariosPage.js
│   └── CadastroPage.js
├── fixtures/
│   └── usuarios.js
└── helpers/
    ├── auth.js
    ├── debug.js
    └── routes.js
```

---

## 5. Instalação

Entre na pasta do projeto:

```bash
cd playwright-tests-modelo
```

Instale as dependências:

```bash
npm install
```

Instale os navegadores usados pelo Playwright:

```bash
npx playwright install
```

---

## 6. Configuração da URL

No arquivo `playwright.config.js`, a URL base está assim:

```js
baseURL: process.env.BASE_URL || 'http://localhost:5173'
```

Isso significa que:

```js
await page.goto('/login')
```

abre:

```txt
http://localhost:5173/login
```

Para testar localmente, altere via variável de ambiente.

### CMD

```bash
set BASE_URL=http://localhost:5173
npx playwright test
```

### PowerShell

```powershell
$env:BASE_URL="http://localhost:5173"
npx playwright test
```

---

## 7. Configuração de usuário administrador

No arquivo `fixtures/usuarios.js`, existe um admin padrão:

```js
export const adminValido = {
  email: process.env.ADMIN_EMAIL || 'admin@senai.com',
  senha: process.env.ADMIN_SENHA || 'admin123',
};
```

Você pode sobrescrever no terminal.

### CMD

```bash
set ADMIN_EMAIL=admin@senai.com
set ADMIN_SENHA=admin123
npx playwright test
```

### PowerShell

```powershell
$env:ADMIN_EMAIL="admin@senai.com"
$env:ADMIN_SENHA="admin123"
npx playwright test
```

---

## 8. Como executar os testes

Rodar todos:

```bash
npx playwright test
```

Rodar com navegador visível:

```bash
npx playwright test --headed
```

Rodar interface visual:

```bash
npx playwright test --ui
```

Rodar um teste específico:

```bash
npx playwright test e2e/02-login-sucesso.spec.js
```

Abrir relatório:

```bash
npx playwright show-report
```

---

## 9. Codegen

O Codegen grava ações realizadas na tela e gera código Playwright.

```bash
npx playwright codegen http://localhost:5173
```

Use especialmente quando um seletor falhar.

Exemplo:

```js
await page.getByPlaceholder('Nome').fill('Professor Teste');
await page.getByRole('button', { name: 'Salvar' }).click();
```

---

## 10. Conceitos fundamentais

### `page`

Representa uma aba do navegador.

```js
await page.goto('/login');
```

### `locator`

Representa um elemento da tela.

```js
const botao = page.getByRole('button', { name: /entrar/i });
await botao.click();
```

### `expect`

Valida comportamento esperado.

```js
await expect(page).toHaveURL(/usuarios/);
await expect(page.getByText(/Usuários/i)).toBeVisible();
```

### `getByRole`

Busca elemento pela semântica/acessibilidade.

```js
page.getByRole('button', { name: /salvar/i })
```

### `getByPlaceholder`

Busca campos pelo placeholder.

Neste projeto, a tela de novo usuário usa placeholders como:

```txt
Nome
E-mail
CPF
Senha
```

Então o Page Object usa:

```js
page.getByPlaceholder(/nome/i)
```

---

## 11. Page Object

Page Object é um padrão para organizar testes.

Em vez de repetir seletores em todos os testes, criamos classes para representar telas:

```txt
pages/LoginPage.js
pages/UsuariosPage.js
pages/CadastroPage.js
```

Exemplo:

```js
const cadastroPage = new CadastroPage(page);
await cadastroPage.cadastrarProfessor(professor);
```

Vantagens:

- evita repetição;
- facilita manutenção;
- melhora leitura;
- aproxima do uso profissional.

---

## 12. Testes incluídos

### 01 — Smoke da aplicação

Arquivo:

```txt
e2e/01-smoke-home.spec.js
```

Valida se a aplicação carrega.

---

### 02 — Login com sucesso

Arquivo:

```txt
e2e/02-login-sucesso.spec.js
```

Valida o fluxo de autenticação pela interface.

---

### 03 — Login inválido

Arquivo:

```txt
e2e/03-login-invalido.spec.js
```

Mostra teste negativo: o sistema não deve autenticar credenciais inválidas.

---

### 04 — Rota protegida

Arquivo:

```txt
e2e/04-rota-protegida.spec.js
```

Tenta acessar `/usuarios` sem login e verifica se o sistema bloqueia ou redireciona.

---

### 05 — Usuário autenticado

Arquivo:

```txt
e2e/05-auth-me-ui.spec.js
```

Valida se o usuário autenticado sai da tela de login e entra na área protegida.

---

### 06 — Listagem de usuários

Arquivo:

```txt
e2e/06-listagem-usuarios.spec.js
```

Faz login como admin e valida a tela de usuários.

---

### 07 — Cadastro administrativo de usuário

Arquivo:

```txt
e2e/07-cadastro-administrativo.spec.js
```

Faz login como admin, abre:

```txt
/usuarios/novo
```

preenche:

```txt
Nome
E-mail
CPF
Tipo de usuário = Professor
Status = Aprovado
Senha
```

e valida a mensagem:

```txt
Usuário criado com sucesso.
```

Esse teste substitui o cadastro público, porque o cadastro público pertence ao app mobile, não à interface web.

---

### 08 — Fluxo completo administrativo

Arquivo:

```txt
e2e/08-fluxo-completo.spec.js
```

Executa:

```txt
login admin
↓
abrir novo usuário
↓
cadastrar professor
↓
validar sucesso
↓
voltar para listagem
↓
buscar e-mail criado
↓
validar usuário na tabela
```

---

### 09 — Responsividade

Arquivo:

```txt
e2e/09-responsividade.spec.js
```

Testa a tela de login em largura mobile e desktop.

---

### 10 — Observando API

Arquivo:

```txt
e2e/10-network-api.spec.js
```

Mostra como aguardar uma resposta de rede:

```js
page.waitForResponse(...)
```

---

### 11 — Screenshot

Arquivo:

```txt
e2e/11-screenshot-trace.spec.js
```

Mostra como capturar screenshot manual.

---

## 13. Como interpretar falhas

Exemplo:

```txt
waiting for getByPlaceholder(/nome/i)
```

Significa:

```txt
O Playwright tentou encontrar o campo Nome, mas ele não apareceu na tela.
```

Possíveis causas:

- rota errada;
- usuário não estava autenticado;
- campo usa outro placeholder;
- tela ainda está carregando;
- layout mudou;
- seletor precisa ser atualizado.

---

## 14. Trace Viewer

Quando um teste falha, abra o relatório:

```bash
npx playwright show-report
```

O trace pode mostrar:

- ações executadas;
- screenshots;
- DOM;
- console;
- chamadas de rede;
- tempo de cada etapa.

---

## 15. Boas práticas

### Prefira seletores estáveis

Prefira:

```js
getByRole()
getByPlaceholder()
getByLabel()
getByText()
```

Evite seletores frágeis como:

```js
.locator('.css-abc123')
```

---

### Use dados únicos

Os testes geram e-mails e CPFs únicos para evitar conflito:

```txt
professor.playwright.171234567.12345@teste.com
```

---

### Cuidado com banco real

Os testes 07 e 08 criam usuários no banco.

Em aula, prefira:

- ambiente local;
- banco de teste;
- homologação;
- rotina de limpeza depois dos testes.

---

## 16. Ordem recomendada para aula

1. Explicar E2E.
2. Rodar smoke test.
3. Mostrar `page.goto()`.
4. Mostrar `locator` e `expect`.
5. Rodar login com sucesso.
6. Rodar login inválido.
7. Explicar Page Object.
8. Testar listagem de usuários.
9. Testar cadastro administrativo.
10. Mostrar Codegen.
11. Mostrar UI Mode.
12. Mostrar Trace Viewer.
13. Comparar Playwright com k6.

---

## 17. Próximas evoluções

Depois deste projeto, é possível evoluir para:

- adicionar `data-testid` no frontend;
- fazer login via API para acelerar testes;
- criar script de limpeza de usuários de teste;
- integrar com GitHub Actions;
- rodar cross-browser;
- testar mobile por projeto;
- usar mocks com `page.route()`;
- validar uploads de foto e anexos.
