import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const reportPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../cypress/reports/index.html'
);

if (!fs.existsSync(reportPath)) {
  console.error('No hay reporte. Ejecuta primero: npm test');
  process.exit(1);
}

const cmd =
  process.platform === 'win32'
    ? `start "" "${reportPath}"`
    : process.platform === 'darwin'
      ? `open "${reportPath}"`
      : `xdg-open "${reportPath}"`;

exec(cmd, (err) => {
  if (err) {
    console.error('No se pudo abrir el navegador.');
    console.error('Abre este archivo manualmente:\n', reportPath);
    process.exit(1);
  }
  console.log('Reporte abierto:', reportPath);
});
