# Prueba técnica – Login (Cypress + TypeScript)

Automatización UI para [Practice Test Login](https://practicetestautomation.com/practice-test-login/), según el PDF de la prueba técnica.

**Repositorio:** https://github.com/josntinjr/prueba_QA

## Requisitos

- **Node.js** 18+ (recomendado 20 LTS)
- **npm** 9+

## Instalación

```bash
npm install
```

## Ejecución local

```bash
# Todos los tests (3 UI data-driven + 4 reglas)
npm test

# Interfaz gráfica de Cypress
npm run test:open
```

## Reporte HTML

Tras `npm test` se genera el reporte Mochawesome en `cypress/reports/index.html`:

```bash
npm run report
```

Levanta el servidor en **http://127.0.0.1:9333/** y abre el navegador (puerto **9333**, no 9323). Deja esa terminal abierta (Ctrl+C para cerrar).

> **9323** era el puerto por defecto de Playwright; si ves 404 ahí, cierra ese proceso y usa `npm run report` (9333).

Solo abrir el archivo HTML sin servidor:

```bash
npm run report:file
```

## Casos obligatorios (PDF)

| Caso              | Usuario         | Password            | Verificación                                                          |
| ----------------- | --------------- | ------------------- | --------------------------------------------------------------------- |
| Login positivo    | `student`       | `Password123`       | URL `/logged-in-successfully/`, mensaje de éxito, **Log out** visible |
| Usuario inválido  | `incorrectUser` | `Password123`       | `#error` visible, `Your username is invalid!`                         |
| Password inválido | `student`       | `incorrectPassword` | `#error` visible, `Your password is invalid!`                         |

El usuario válido del sitio es **`student`** (no `estudiante`).

## Estructura

```
cypress/
  e2e/login.cy.ts         → 3 casos UI (data-driven con LOGIN_SCENARIOS)
  e2e/login_rules.cy.ts   → tests de getLoginExpectation (edge cases)
  pages/LoginPage.ts        → Page Object Model
  support/e2e.ts            → reporter HTML
rules/login_rules.ts        → pieza programable (Opción A del PDF)
cypress.config.ts
docs/ci-workflow.yml.example → plantilla CI (GitHub Actions)
docs/capturas/               → evidencias del reporte
```

## Decisiones técnicas

- **Framework:** Cypress por API simple, auto-wait y reporte Mochawesome integrable.
- **POM:** `LoginPage` encapsula navegación, acciones y aserciones (`open`, `login`, `verifySuccess`, `verifyError`).
- **Pieza programable (Opción A):** `getLoginExpectation(username, password)` devuelve `{ shouldSucceed, expectedUrlContains, expectedMessage }`. Los tests UI recorren `LOGIN_SCENARIOS` (data-driven).
- **Selectores:** IDs estables (`#username`, `#password`, `#submit`, `#error`) y enlace `Log out`.
- **Esperas:** Sin `sleep`; `should()` y comandos Cypress con reintentos implícitos. `pageLoadTimeout` 90s y 1 retry en CI/local por sitio externo lento.
- **Navegación:** `baseUrl` apunta a la ruta de login; `cy.visit('/')` abre esa página (no el home del dominio).

## Calidad de código

```bash
npm run lint
npm run format:check
```

## Supuestos

- El sitio mantiene textos de error y la ruta de éxito documentados en la prueba.
- Los tests corren contra el entorno público (sin credenciales en variables de entorno).
- Fallos intermitentes por latencia del sitio se mitigan con timeout y reintentos, no con sleeps fijos.

## Evidencias (capturas)

Tras ejecutar los tests, genera screenshots del reporte HTML en `docs/capturas/`:

```bash
npm run capturas
```

Archivos: resumen del reporte, lista de tests passed y detalle del caso *login correcto*.

## CI

CI: plantilla en `docs/ci-workflow.yml.example` (copiar a `.github/workflows/ci.yml`; el push del workflow requiere token con scope `workflow`).
