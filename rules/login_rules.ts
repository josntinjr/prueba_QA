// Opcion A del enunciado: que resultado esperar segun credenciales
export function getLoginExpectation(username: string, password: string) {
  if (username === 'student' && password === 'Password123') {
    return {
      shouldSucceed: true,
      expectedUrlContains: '/logged-in-successfully/',
      expectedMessage: 'successfully logged in',
    };
  }

  if (username !== 'student') {
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
