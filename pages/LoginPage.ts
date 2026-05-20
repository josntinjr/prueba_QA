import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('.', { waitUntil: 'domcontentloaded' });
  }

  async login(user: string, pass: string) {
    await this.page.fill('#username', user);
    await this.page.fill('#password', pass);
    await this.page.click('#submit');
  }

  async verifySuccess() {
    await expect(this.page).toHaveURL(/logged-in-successfully/);
    await expect(this.page.getByText(/Congratulations|successfully logged in/i)).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Log out' })).toBeVisible();
  }

  async verifyError(text: string) {
    await expect(this.page.locator('#error')).toBeVisible();
    await expect(this.page.locator('#error')).toHaveText(text);
  }
}
