import { test, expect } from '@playwright/test';
import { mockLogin } from './helpers/auth';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await mockLogin(page);
    await expect(page).toHaveURL('/dashboard');
  });

  test('shows board list', async ({ page }) => {
    await expect(page.getByText('My Boards')).toBeVisible();
    await expect(page.getByText('Sprint Planning')).toBeVisible();
  });

  test('new board button exists', async ({ page }) => {
    await expect(page.getByText('+ New Board')).toBeVisible();
  });

  test('clicking board navigates to canvas', async ({ page }) => {
    await page.getByText('Sprint Planning').click();
    await expect(page).toHaveURL(/\/board\//);
  });
});
