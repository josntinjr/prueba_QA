import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://practicetestautomation.com/practice-test-login/',
  },
  reporter: 'html',
});
