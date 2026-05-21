import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90_000,
  retries: 1,
  workers: 1,
  use: {
    baseURL: 'https://practicetestautomation.com/practice-test-login/',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  reporter: [['html'], ['list']],
});
