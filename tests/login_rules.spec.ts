import { test, expect } from '@playwright/test';
import { getLoginExpectation } from '../rules/login_rules';

test.describe('login_rules', () => {
  test('credenciales validas', () => {
    const r = getLoginExpectation('student', 'Password123');
    expect(r.shouldSucceed).toBe(true);
    expect(r.expectedUrlContains).toBe('/logged-in-successfully/');
  });

  test('usuario invalido', () => {
    const r = getLoginExpectation('incorrectUser', 'Password123');
    expect(r.shouldSucceed).toBe(false);
    expect(r.expectedMessage).toBe('Your username is invalid!');
  });

  test('password invalido', () => {
    const r = getLoginExpectation('student', 'incorrectPassword');
    expect(r.shouldSucceed).toBe(false);
    expect(r.expectedMessage).toBe('Your password is invalid!');
  });

  test('credenciales vacias', () => {
    const r = getLoginExpectation('', '');
    expect(r.shouldSucceed).toBe(false);
  });
});
