# Electron-Svelte template

<p align="center">
  <a href="https://github.com/planetsLightningArrester/electron-svelte-template/blob/main/README.zh-cn.md"><b>简体中文</b></a> |
  <a href="https://github.com/planetsLightningArrester/electron-svelte-template/blob/main/README.en-us.md"><b>English</b></a> |
  <a href="https://github.com/planetsLightningArrester/electron-svelte-template/blob/main/README.es-mx.md"><b>Español</b></a> |
  <a href="https://github.com/planetsLightningArrester/electron-svelte-template/blob/main/README.md"><b>Português</b></a>
</p>

<h2 align="center">Template de app portátil para desktop para Windows, Linux e MacOS usando <a href="https://www.electronjs.org/"><b>Electron.js</b></a> e <a href="https://svelte.dev/"><b>Svelte</b></a></h2>

# Conteúdo

- [Electron-Svelte template](#electron-svelte-template)
- [Conteúdo](#conteúdo)
  - [💯 Casos de Uso](#-casos-de-uso)
  - [✨ Recursos](#-recursos)
  - [🚩 Considerações](#-considerações)
  - [🚀 Utilização](#-utilização)
  - [🐛 Possíveis Problemas](#-possíveis-problemas)
  - [💻 Desenvolvimento](#-desenvolvimento)
    - [⚙️ Configuração](#️-configuração)
    - [🧪 Testes](#-testes)
  - [🫡 Obrigado? De Nada](#-obrigado-de-nada)
  - [📜 Licença](#-licença)

## 💯 Casos de Uso
- [Leitor de notas de corretagem](https://github.com/planetsLightningArrester/leitor-de-notas-de-corretagem)

## ✨ Recursos

Repositório modelo para criar aplicativos usando Electron.js como backend e Svelte como frontend.

- Frontend - `frontend/package.json`
  - [Svelte](https://svelte.dev/) como o framework
  - [Vite](https://vitejs.dev/) como o bundler
  - [i18n](https://github.com/kaisermann/svelte-i18n) para aplicativos multilíngues no frontend
  - [svelte-check](https://www.npmjs.com/package/svelte-check) como o verificador de vulnerabilidades
  - Prettier
  - Eslint
  - Typescript
- Backend - `backend/package.json`
  - [Electron](https://www.electronjs.org/) como o framework
  - [Electron forge](https://www.electronforge.io/) como o bundler
  - [Playwright](https://playwright.dev/) como a engine de teste
  - [Electronegativity](https://github.com/doyensec/electronegativity) como o verificador de vulnerabilidades
  - [Nodemon](https://nodemon.io/) para desenvolvimento com hot-reload
  - Atualização automática nativa com base em GitHub Releases (não requer assinatura de software)
  - Prettier
  - Eslint
  - Typescript
- Infraestrutura - `./package.json`
  - [Husky](https://github.com/typicode/husky) ativado com:
    - Mensagens de commit conforme [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
    - Lint automático antes do `git commit`
    - Lint, teste e build antes do `git push`
    - `npm ci` para o `package.json` raiz, backend e frontend após executar `git pull`
  - VS Code
    - `.vscode/launch.json` e `.vscode/tasks` com o VS Code pronto para depuração
    - Extensões recomendadas
  - GitHub
    - Modelo de pull request
    - Modelo de issue para bug report e feature request
    - Workflow para CI executando testes no `push`
    - Workflow para atualizar automaticamente dependências para a última versão diariamente (se passar na CI, aumenta a [patch version](https://semver.org/))
    - Workflow para criar release na atualização automática. Também criar release com `git tag` seguindo a [versionamento semântico](https://semver.org/).
      - Ex: `git tag v2.11.553 && git push -u origin main --tags`

## 🚩 Considerações
- Existem apenas testes de ponta a ponta (e2e) `backend/src/__tests__/e2e`. Não há teste apenas de frontend ou apenas de backend
- O resultado do build é um arquivo `.zip` com um executável portátil. O portátil é sempre gerado para o sistema operacional atual em execução
- Nenhum instalador é gerado porque para usar instaladores requer [pagamento por chaves de assinatura](https://www.electronjs.org/docs/latest/tutorial/code-signing)

## 🚀 Utilização

**Execute os comandos a partir do diretório raiz**

```bash
# Instala todas as dependências no diretório raiz, backend e frontend. Também instala git hooks do husky
npm ci
# Executa todos os testes (apenas testes e2e estão disponíveis)
npm run test
# Inicia frontend e backend e inicializa o app com hot-reload habilitado
npm run start
# Gera um zip com um executável portátil
npm run build
# Para fazer uma release, incremente `version` dentro de `backend/package.json`. Os outros `package.json` não têm o campo `version`
cd backend && npm version patch
```

## 🐛 Possíveis Problemas

- O workflow de auto-update atualiza as dependências de prod e dev para suas últimas versões e executa o CI. Se tudo passar, uma nova release é criada. Se optar por usar isso, certifique-se de ter uma boa cobertura de testes para evitar que degradações na release.
- Se encontrar algum problema, considere relatar um [Issue](https://github.com/planetsLightningArrester/electron-svelte-template/issues)
- Mensagens de erro podem ser encontradas em:
  - Linux: `~/.config/electron-svelte-template/log`
  - Mac: `~/Library/Application Support/electron-svelte-template/log`
  - Windows: `%APPDATA%/electron-svelte-template/log`

## 💻 Desenvolvimento

Requer Node `>=18`.

### ⚙️ Configuração

Para executar no WSL, alguns pacotes precisam ser instalados:

```bash
sudo apt install libgconf-2-4 libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 libgbm-dev libnss3-dev libxss-dev libasound2 zip
```

Para reduzir o ruído devido ao `dbus` no WSL:

```bash
source scripts/dbus.sh
```

Os scripts `scripts/force_update*` são usados no `.github/workflows/auto_update.yml` para forçar a atualização de dependências de prod e dev para suas últimas versões para validação.

### 🧪 Testes

```bash
npm ci
npm run test
```

## 🫡 Obrigado? De Nada

Se eu te ajudei, envie um "Obrigado!" 👋 através do [pix](https://www.bcb.gov.br/en/financialstability/pix_en) 😊
> a09e5878-2355-45f7-9f36-6df4ccf383cf

## 📜 Licença

De acordo com a licença, este software não fornece garantia alguma, e o autor se isenta de qualquer responsabilidade pelo uso. Use por sua própria responsabilidade e risco.

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)