import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Mock login first
    await page.goto('/auth');
    await page.getByPlaceholder('Email').fill('test@example.com');
    await page.getByPlaceholder('Password').fill('password123');
    await page.getByRole('button', { name: 'Log In' }).click();
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
