import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { getLoginExpectation } from '../rules/login_rules';

// Por defecto 1 (3 tests del PDF). Usar npm run test:x3 o test:20 para más repeticiones.
const REPETICIONES = Number(process.env.REPETICIONES) || 1;

for (let i = 1; i <= REPETICIONES; i++) {
  test(`login correcto [${i}/${REPETICIONES}]`, async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('student', 'Password123');
    await login.verifySuccess();
  });

  test(`usuario incorrecto [${i}/${REPETICIONES}]`, async ({ page }) => {
    const login = new LoginPage(page);
    const expected = getLoginExpectation('incorrectUser', 'Password123');

    await login.open();
    await login.login('incorrectUser', 'Password123');
    await login.verifyError(expected.expectedMessage);
  });

  test(`password incorrecto [${i}/${REPETICIONES}]`, async ({ page }) => {
    const login = new LoginPage(page);
    const expected = getLoginExpectation('student', 'incorrectPassword');

    await login.open();
    await login.login('student', 'incorrectPassword');
    await login.verifyError(expected.expectedMessage);
  });
}
