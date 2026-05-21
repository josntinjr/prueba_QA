# Prueba técnica – Login automatizado

Automatización del formulario de login de [Practice Test Automation](https://practicetestautomation.com/practice-test-login/) con Playwright y TypeScript.

Repo: https://github.com/josntinjr/prueba_QA

## Qué necesitás

- Node 18 o más
- npm

## Cómo lo corro en mi máquina

```bash
npm install
npx playwright install chromium
npm test
```

Eso ejecuta los 3 casos del enunciado (login ok, usuario mal, password mal) y unos tests chicos de `login_rules`.

Si querés repetir los casos varias veces:

```bash
npm run test:x3    # 3 veces cada uno
npm run test:20    # 20 veces (tarda)
```

## Ver el reporte

```bash
npm run report
```

Si algo falla, mirá `test-results/` (screenshots y trace).

Capturas listas para adjuntar en la entrega: `docs/capturas/`.  
Para regenerarlas: `npm test` y después `npm run capturas`.

## Los 3 casos segun ek docunmeto

1. **Login correcto** – `student` / `Password123` → redirige, mensaje de éxito y botón Log out.
2. **Usuario mal** – `incorrectUser` → `Your username is invalid!`
3. **Password mal** – `incorrectPassword` → `Your password is invalid!`

> En la página a veces dice `estudiante` en el paso 2, pero el usuario que funciona es **`student`** (inglés). Si probás con `estudiante` te tira error.

## Cómo está armado el proyecto

- `pages/LoginPage.ts` – abre la página, hace login y valida
- `rules/login_rules.ts` – según user/pass devuelve qué debería pasar (requisito de la prueba)
- `tests/login.spec.ts` – los 3 tests de UI
- `tests/login_rules.spec.ts` – pruebas de la función de reglas

Uso `#username`, `#password`, `#submit` y `#error` porque son estables. No puse `sleep`; Playwright espera solo.

En `open()` voy directo a la URL del login. Si usás `goto('/')` con el baseURL te manda al home y los tests no encuentran el formulario.

## Lint (opcional)

```bash
npm run lint
npm run format:check
```

## CI

Dejé el workflow en `.github/workflows/tests.yml` pero no lo subí al repo porque mi token no tenía permiso `workflow`.
