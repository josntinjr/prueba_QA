# Automatización login – Prueba técnica

Tests UI del formulario de login con **Playwright** y **TypeScript**.

**Sitio:** https://practicetestautomation.com/practice-test-login/

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
npx playwright install chromium
```

## Ejecutar tests

```bash
npm test
```

Una pasada de cada caso del PDF (3 tests).

```bash
npm run test:x3    # 3 veces cada caso (9 tests)
npm run test:20    # 20 veces cada caso (60 tests, tarda varios minutos)
```

## Ver reporte HTML

Después de correr los tests:

```bash
npm run report
```

Si un test falla, Playwright guarda screenshot y trace en `test-results/`.

## Casos automatizados

| Caso | Usuario | Password | Validación |
|------|---------|----------|------------|
| 1 – Positivo | student | Password123 | URL de éxito, mensaje, Log out |
| 2 – Usuario inválido | incorrectUser | Password123 | Your username is invalid! |
| 3 – Password inválido | student | incorrectPassword | Your password is invalid! |

## Estructura

- `pages/LoginPage.ts` – Page Object (acciones y aserciones)
- `rules/login_rules.ts` – pieza programable: mensaje/éxito según credenciales
- `tests/login.spec.ts` – los 3 casos del PDF

## Credenciales correctas (caso 1)

En la página a veces el paso 2 del recuadro dice `estudiante`, pero las credenciales válidas del sitio y del PDF son en **inglés**:

- Usuario: **`student`** (no `estudiante`)
- Password: **`Password123`**

Si escribís `estudiante`, el sitio muestra *"Your username is invalid!"* — es el comportamiento esperado de un login fallido, no del caso positivo.

## Decisiones técnicas

- **URL directa** al login en `LoginPage.open()` para no abrir el home del sitio por error.
- **Selectores por id** (`#username`, `#password`, `#submit`, `#error`) y rol para Log out.
- **Sin `sleep`**: se usan las esperas automáticas de Playwright y `expect`.
- **`login_rules`**: centraliza el mensaje esperado en casos negativos (requisito Opción A).
