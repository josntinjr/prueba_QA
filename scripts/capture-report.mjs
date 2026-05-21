import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const reportUrl =
  'file:///' + path.join(root, 'playwright-report', 'index.html').replace(/\\/g, '/');

const outDir = path.join(root, 'docs', 'capturas');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

await page.goto(reportUrl);
await page.waitForTimeout(1500);

await page.screenshot({
  path: path.join(outDir, '01-reporte-resumen.png'),
  fullPage: true,
});

const passed = page.getByRole('button', { name: /Passed/i }).first();
if (await passed.isVisible().catch(() => false)) {
  await passed.click();
  await page.waitForTimeout(500);
}

await page.screenshot({
  path: path.join(outDir, '02-reporte-solo-passed.png'),
  fullPage: true,
});

const firstTest = page.getByText(/login correcto/).first();
if (await firstTest.isVisible().catch(() => false)) {
  await firstTest.click();
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(outDir, '03-detalle-login-correcto.png'),
    fullPage: true,
  });
}

await browser.close();
console.log('Capturas guardadas en docs/capturas/');
