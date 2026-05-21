Automatización de Login – Prueba Técnica

Este proyecto implementa pruebas automatizadas de UI sobre un formulario de login utilizando Playwright y TypeScript, siguiendo buenas prácticas de automatización y diseño de código.

**Repositorio:** https://github.com/josntinjr/prueba_QA

Sitio bajo prueba:
https://practicetestautomation.com/practice-test-login/

¿Qué incluye este proyecto?

Se automatizan los 3 escenarios solicitados:
- Login exitoso
- Usuario inválido
- Password inválido

Tecnologías utilizadas:
- Playwright
- TypeScript
- Node.js

Requisitos:
- Node.js 18 o superior
- npm

Instalación:
npm install
npx playwright install chromium

Ejecución de pruebas:
npm test

Ejecuciones adicionales:
npm run test:x3
npm run test:20

Reporte:
npm run report

En caso de fallos, se generan screenshots y traces en:
test-results/

Casos automatizados:

1. Login exitoso
   Usuario: student
   Password: Password123
   Validaciones: URL, mensaje y botón Log out

2. Usuario inválido
   Usuario: incorrectUser
   Password: Password123
   Validación: Your username is invalid!

3. Password inválido
   Usuario: student
   Password: incorrectPassword
   Validación: Your password is invalid!

Estructura del proyecto:

pages/     → Page Object Model
rules/     → lógica programable
tests/     → casos de prueba

Credenciales válidas:
Usuario: student
Password: Password123

Decisiones técnicas:
- Uso de URL directa al login
- Selectores por id
- Sin uso de sleeps
- Uso de auto-wait de Playwright
- Implementación de lógica reusable (login_rules)

Enfoque:
El objetivo fue mantener código limpio, reutilizable y estable, aplicando buenas prácticas de automatización.