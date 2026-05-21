import { expect, Page } from '@playwright/test';

const LOGIN_URL = 'https://practicetestautomation.com/practice-test-login/';

export class LoginPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded' });
    await expect(this.page.locator('#username')).toBeVisible();
  }

  async login(user: string, pass: string) {
    await this.page.fill('#username', user);
    await this.page.fill('#password', pass);
    await this.page.click('#submit');
  }

  async verifySuccess(urlPart = '/logged-in-successfully/') {
    const path = urlPart.replace(/\//g, '\\/');
    await expect(this.page).toHaveURL(new RegExp(path));
    await expect(
      this.page.getByText(/Congratulations|successfully logged in/i)
    ).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Log out' })).toBeVisible();
  }

  async verifyError(message: string) {
    await expect(this.page.locator('#error')).toBeVisible();
    await expect(this.page.locator('#error')).toHaveText(message);
  }
}
