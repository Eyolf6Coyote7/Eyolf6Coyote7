import { Page } from '@playwright/test';

export async function mockLogin(page: Page) {
  await page.goto('/auth');
  await page.getByPlaceholder('Email').fill('test@example.com');
  await page.getByPlaceholder('Password').fill('password123');
  await page.locator('button[type="submit"]').click();
}
