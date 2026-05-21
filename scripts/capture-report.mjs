import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const reportDir = path.join(root, 'cypress', 'reports');
const indexPath = path.join(reportDir, 'index.html');
const outDir = path.join(root, 'docs', 'capturas');
const PORT = 9340;
const baseUrl = `http://127.0.0.1:${PORT}/`;

if (!fs.existsSync(indexPath)) {
  console.error('No hay reporte. Ejecuta primero: npm test');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

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

function startServer() {
  return new Promise((resolve) => {
    server.listen(PORT, '127.0.0.1', resolve);
  });
}

async function capture() {
  await startServer();
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForFunction(
    () =>
      document.body.innerText.includes('pass') ||
      document.body.innerText.includes('Pass'),
    { timeout: 120000 }
  );
  await new Promise((r) => setTimeout(r, 2000));

  await page.screenshot({
    path: path.join(outDir, '01-reporte-resumen.png'),
    fullPage: false,
  });

  await page.screenshot({
    path: path.join(outDir, '02-reporte-tests-passed.png'),
    fullPage: true,
  });

  await page.evaluate(() => {
    const rows = [...document.querySelectorAll('li.test')];
    const row = rows.find((el) => el.textContent?.includes('login correcto'));
    row?.querySelector('.test-title')?.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  await page.screenshot({
    path: path.join(outDir, '03-detalle-login-correcto.png'),
    fullPage: false,
  });

  await browser.close();
  server.close();

  console.log('Capturas guardadas en docs/capturas/');
  for (const f of fs.readdirSync(outDir)) {
    console.log(' -', f);
  }
}

capture().catch((err) => {
  console.error(err);
  server.close();
  process.exit(1);
});
