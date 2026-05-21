# Automatización de Login – Prueba Técnica

Pruebas UI del login con **Playwright** y **TypeScript**.

**Repositorio:** https://github.com/josntinjr/prueba_QA  
**Sitio:** https://practicetestautomation.com/practice-test-login/

## Requisitos

- Node.js 18+
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

Incluye 3 casos UI del PDF + 4 tests de `login_rules`.  
Opcional: `npm run test:x3` (9 UI) o `npm run test:20` (60 UI).

## Reporte HTML

```bash
npm run report
```

Screenshots y traces en fallos: carpeta `test-results/`.

Capturas del reporte HTML (para entregar): `docs/capturas/` — generar con `npm run capturas` después de `npm test`.

## Calidad de código

```bash
npm run lint
npm run format:check
```

## Casos automatizados (PDF)

| Caso                | Usuario       | Password          | Validación                  |
| ------------------- | ------------- | ----------------- | --------------------------- |
| 1 Positivo          | student       | Password123       | URL éxito, mensaje, Log out |
| 2 Usuario inválido  | incorrectUser | Password123       | Your username is invalid!   |
| 3 Password inválido | student       | incorrectPassword | Your password is invalid!   |

## Estructura

- `pages/LoginPage.ts` – Page Object Model
- `rules/login_rules.ts` – Opción A: `getLoginExpectation()` → `{ shouldSucceed, expectedUrlContains, expectedMessage }`
- `tests/login.spec.ts` – 3 casos UI (usan `login_rules` en todos)
- `tests/login_rules.spec.ts` – tests de la lógica (vacías, válidas, errores)
- `.github/workflows/tests.yml` – CI en GitHub Actions

## Decisiones técnicas

- URL directa al login (no el home del sitio).
- Selectores por `id` y `role` para Log out.
- Sin `sleep`; esperas de Playwright y `expect`.
- Todos los flujos UI leen expectativas desde `login_rules`.
- Credencial válida: **`student`** (no `estudiante`).

## CI

El archivo está en `.github/workflows/tests.yml`. Para subirlo a GitHub, el token debe tener permisos **repo** y **workflow**:

```powershell
git add .github
git commit -m "Agregar CI GitHub Actions"
git push origin main
```
