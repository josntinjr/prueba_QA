import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { getLoginExpectation } from '../rules/login_rules';

test('login correcto', async ({ page }) => {
  const login = new LoginPage(page);

  await login.open();
  await login.login('student', 'Password123');
  await login.verifySuccess();
});

test('usuario incorrecto', async ({ page }) => {
  const login = new LoginPage(page);
  const expected = getLoginExpectation('incorrectUser', 'Password123');

  await login.open();
  await login.login('incorrectUser', 'Password123');
  await login.verifyError(expected.expectedMessage);
});

test('password incorrecto', async ({ page }) => {
  const login = new LoginPage(page);
  const expected = getLoginExpectation('student', 'incorrectPassword');

  await login.open();
  await login.login('student', 'incorrectPassword');
  await login.verifyError(expected.expectedMessage);
});
