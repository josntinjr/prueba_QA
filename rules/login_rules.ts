export type LoginExpectation = {
  shouldSucceed: boolean;
  expectedUrlContains?: string;
  expectedMessage: string;
};

// Opcion A del PDF: resultado esperado segun credenciales
export function getLoginExpectation(
  username: string,
  password: string
): LoginExpectation {
  const user = username?.trim() ?? '';
  const pass = password?.trim() ?? '';

  if (!user || !pass) {
    return {
      shouldSucceed: false,
      expectedMessage: 'Your username is invalid!',
    };
  }

  if (user === 'student' && pass === 'Password123') {
    return {
      shouldSucceed: true,
      expectedUrlContains: '/logged-in-successfully/',
      expectedMessage: 'successfully logged in',
    };
  }

  if (user !== 'student') {
    return {
      shouldSucceed: false,
      expectedMessage: 'Your username is invalid!',
    };
  }

  return {
    shouldSucceed: false,
    expectedMessage: 'Your password is invalid!',
  };
}
