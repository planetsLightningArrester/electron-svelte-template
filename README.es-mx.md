# Plantilla Electron-Svelte

<p align="center">
  <a href="https://github.com/planetsLightningArrester/electron-svelte-template/blob/main/README.zh-cn.md"><b>简体中文</b></a> |
  <a href="https://github.com/planetsLightningArrester/electron-svelte-template/blob/main/README.en-us.md"><b>English</b></a> |
  <a href="https://github.com/planetsLightningArrester/electron-svelte-template/blob/main/README.es-mx.md"><b>Español</b></a> |
  <a href="https://github.com/planetsLightningArrester/electron-svelte-template/blob/main/README.md"><b>Português</b></a>
</p>

<h2 align="center">Plantilla de aplicación portátil para escritorio para Windows, Linux y MacOS usando <a href="https://www.electronjs.org/"><b>Electron.js</b></a> y <a href="https://svelte.dev/"><b>Svelte</b></a></h2>

# Contenido

- [Plantilla Electron-Svelte](#plantilla-electron-svelte)
- [Contenido](#contenido)
  - [💯 Casos de Uso](#-casos-de-uso)
  - [✨ Características](#-características)
  - [🚩 Consideraciones](#-consideraciones)
  - [🚀 Uso](#-uso)
  - [🐛 Posibles Problemas](#-posibles-problemas)
  - [💻 Desarrollo](#-desarrollo)
    - [⚙️ Configuración](#️-configuración)
    - [🧪 Pruebas](#-pruebas)
  - [🫡 ¿Gracias? De Nada](#-gracias-de-nada)
  - [📜 Licencia](#-licencia)

## 💯 Casos de Uso
- [Leitor de notas de corretagem](https://github.com/planetsLightningArrester/leitor-de-notas-de-corretagem)

## ✨ Características

Repositorio de plantilla para crear aplicaciones utilizando Electron.js como backend y Svelte como frontend.

- Frontend - `frontend/package.json`
  - [Svelte](https://svelte.dev/) como el framework
  - [Vite](https://vitejs.dev/) como el empaquetador
  - [i18n](https://github.com/kaisermann/svelte-i18n) para aplicaciones multilingües en el frontend
  - [svelte-check](https://www.npmjs.com/package/svelte-check) como el verificador de vulnerabilidades
  - Prettier
  - Eslint
  - Typescript
- Backend - `backend/package.json`
  - [Electron](https://www.electronjs.org/) como el framework
  - [Electron forge](https://www.electronforge.io/) como el empaquetador
  - [Playwright](https://playwright.dev/) como el motor de pruebas
  - [Electronegativity](https://github.com/doyensec/electronegativity) como el verificador de vulnerabilidades
  - [Nodemon](https://nodemon.io/) para desarrollo en modo de recarga automática
  - Actualización automática nativa basada en GitHub Releases (no requiere firma de software)
  - Prettier
  - Eslint
  - Typescript
- Infraestructura - `./package.json`
  - [Husky](https://github.com/typicode/husky) habilitado con:
    - Mensajes de commit según [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
    - Lint automático antes de `git commit`
    - Lint, pruebas y construcción antes de `git push`
    - `npm ci` para el `package.json` raíz, backend y frontend después de ejecutar `git pull`
  - VS Code
    - `.vscode/launch.json` y `.vscode/tasks` con VS Code listo para depurar
    - Extensiones recomendadas
  - GitHub
    - Plantilla de solicitud de extracción
    - Plantilla de problema para informe de error y solicitud de función
    - Flujo de trabajo para Integración Continua ejecutando pruebas en `push`
    - Flujo de trabajo para actualizar automáticamente dependencias a la última versión diariamente (si pasa la CI, aumenta la [versión de parche](https://semver.org/))
    - Flujo de trabajo para crear lanzamientos en actualización automática o `git tag` enviado siguiendo el [versionamiento semántico](https://semver.org/).
      - Ej: `git tag v2.11.553 && git push -u origin main --tags`

## 🚩 Consideraciones
- Solo hay pruebas de extremo a extremo (e2e) `backend/src/__tests__/e2e`. No hay pruebas solo de frontend o solo de backend
- El resultado de la construcción es un archivo `.zip` con un ejecutable portátil. El portátil siempre se genera para el sistema operativo actual en ejecución
- No se genera ningún instalador porque usar instaladores requiere [pagar por claves de firma](https://www.electronjs.org/docs/latest/tutorial/code-signing)

## 🚀 Uso

**Ejecuta los comandos desde el directorio raíz**

```bash
# Instala todas las dependencias en la raíz, backend y frontend. También instala ganchos de git de husky
npm ci
# Ejecuta todas las pruebas (solo están disponibles las pruebas e2e)
npm run test
# Inicia frontend y backend e inicia la aplicación con recarga automática habilitada
npm run start
# Genera un zip con un ejecutable portátil
npm run build
# Para hacer un lanzamiento, incrementa `version` dentro de `backend/package.json`. Los otros `package.json` no tienen el campo `version`
cd backend && npm version patch
```

## 🐛 Posibles Problemas

- El flujo de trabajo de actualización automática actualiza las dependencias de prod y dev a sus últimas versiones y ejecuta una CI. Si todo pasa, se creará un nuevo lanzamiento. Si decides usar esto, asegúrate de tener una buena cobertura de pruebas para evitar degradaciones en el lanzamiento.
- Si encuentras algún problema, considera informar un [Issue](https://github.com/planetsLightningArrester/electron-svelte-template/issues)
- Los mensajes de error se pueden encontrar en:
  - Linux: `~/.config/electron

-svelte-template/log`
  - Mac: `~/Library/Application Support/electron-svelte-template/log`
  - Windows: `%APPDATA%/electron-svelte-template/log`

## 💻 Desarrollo

Requiere Node `>=18`.

### ⚙️ Configuración

Para ejecutar en WSL, se necesitan instalar algunos paquetes:

```bash
sudo apt install libgconf-2-4 libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 libgbm-dev libnss3-dev libxss-dev libasound2 zip
```

Para reducir el ruido debido a `dbus` en WSL:

```bash
source scripts/dbus.sh
```

Los scripts `scripts/force_update*` se utilizan en `.github/workflows/auto_update.yml` para forzar la actualización de dependencias de prod y dev a sus últimas versiones para validación.

### 🧪 Pruebas

```bash
npm ci
npm run test
```

## 🫡 ¿Gracias? De Nada

Si te ayudé, ¡envía un "Gracias!" 👋 a través de [pix](https://www.bcb.gov.br/en/financialstability/pix_en) 😊
> a09e5878-2355-45f7-9f36-6df4ccf383cf

## 📜 Licencia

De acuerdo con la licencia, este software no proporciona garantía alguna, y el autor renuncia a cualquier responsabilidad por su uso. Úsalo bajo tu propia responsabilidad y riesgo.

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)