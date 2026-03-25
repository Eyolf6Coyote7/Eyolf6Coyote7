import { test, expect } from '@playwright/test';

test.describe('Auth Page', () => {
  test('shows login form by default', async ({ page }) => {
    await page.goto('/auth');
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('switches to sign up tab', async ({ page }) => {
    await page.goto('/auth');
    await page.getByText('Sign Up').click();
    await expect(page.getByPlaceholder('Full name')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText('Create Account');
  });

  test('mock login navigates to dashboard', async ({ page }) => {
    await page.goto('/auth');
    await page.getByPlaceholder('Email').fill('test@example.com');
    await page.getByPlaceholder('Password').fill('password123');
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL('/dashboard');
  });
});
