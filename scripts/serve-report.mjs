import { exec } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const reportDir = path.join(root, 'cypress', 'reports');
const indexPath = path.join(reportDir, 'index.html');
const PORT = 9333;
const url = `http://127.0.0.1:${PORT}/`;

if (!fs.existsSync(indexPath)) {
  console.error('No hay reporte. Ejecuta primero: npm test');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const safePath =
    req.url === '/' || req.url === '/index.html'
      ? 'index.html'
      : path.normalize(req.url).replace(/^(\.\.[/\\])+/, '');

  const filePath = path.join(reportDir, safePath);
  if (!filePath.startsWith(reportDir) || !fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Reporte: ${url}`);
  console.log('Ctrl+C para cerrar\n');

  const openCmd =
    process.platform === 'win32'
      ? `start "" "${url}"`
      : process.platform === 'darwin'
        ? `open "${url}"`
        : `xdg-open "${url}"`;
  exec(openCmd);
});

process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});
