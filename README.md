# Automatización login – Prueba técnica

Tests de login con Playwright + TypeScript sobre:
https://practicetestautomation.com/practice-test-login/

## Requisitos

- Node.js 18+
- npm

## Cómo correr

```bash
npm install
npx playwright install chromium
npm test
```

## Ver reporte

```bash
npm run report
```

## Estructura

- `pages/LoginPage.ts` – Page Object con acciones del formulario
- `rules/login_rules.ts` – según usuario/password devuelve qué resultado se espera
- `tests/login.spec.ts` – los 3 casos del enunciado

## Nota

En `open()` uso `goto('.')` y no `goto('/')`, porque con el baseURL del config `/` te manda al home del sitio y no al login.
