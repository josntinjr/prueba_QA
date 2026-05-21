import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { getLoginExpectation } from '../rules/login_rules';

// Por defecto 1 (3 tests del PDF). Usar npm run test:x3 o test:20 para más repeticiones.
const REPETICIONES = Number(process.env.REPETICIONES) || 1;

for (let i = 1; i <= REPETICIONES; i++) {
  test(`login correcto [${i}/${REPETICIONES}]`, async ({ page }) => {
    const user = 'student';
    const pass = 'Password123';
    const expected = getLoginExpectation(user, pass);

    expect(expected.shouldSucceed).toBe(true);

    const login = new LoginPage(page);
    await login.open();
    await login.login(user, pass);
    await login.verifySuccess(expected.expectedUrlContains);
  });

  test(`usuario incorrecto [${i}/${REPETICIONES}]`, async ({ page }) => {
    const user = 'incorrectUser';
    const pass = 'Password123';
    const expected = getLoginExpectation(user, pass);

    expect(expected.shouldSucceed).toBe(false);

    const login = new LoginPage(page);
    await login.open();
    await login.login(user, pass);
    await login.verifyError(expected.expectedMessage);
  });

  test(`password incorrecto [${i}/${REPETICIONES}]`, async ({ page }) => {
    const user = 'student';
    const pass = 'incorrectPassword';
    const expected = getLoginExpectation(user, pass);

    expect(expected.shouldSucceed).toBe(false);

    const login = new LoginPage(page);
    await login.open();
    await login.login(user, pass);
    await login.verifyError(expected.expectedMessage);
  });
}
