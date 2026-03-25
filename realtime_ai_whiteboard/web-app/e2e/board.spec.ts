import { test, expect } from '@playwright/test';
import { mockLogin } from './helpers/auth';

test.describe('Board Canvas', () => {
  test.beforeEach(async ({ page }) => {
    await mockLogin(page);
    await expect(page).toHaveURL('/dashboard');
    // Click first board to navigate
    await page.getByText('Sprint Planning').click();
    await page.waitForURL(/\/board\//);
  });

  test('shows canvas with toolbar', async ({ page }) => {
    await expect(page.getByTitle('Select')).toBeVisible();
    await expect(page.getByTitle('Rectangle')).toBeVisible();
  });

  test('shows back button', async ({ page }) => {
    await expect(page.getByText('← Back')).toBeVisible();
  });

  test('AI button opens chat panel', async ({ page }) => {
    await page.getByText('✨ AI').click();
    await expect(page.getByPlaceholder('Ask AI anything...')).toBeVisible();
  });

  test('share button is visible', async ({ page }) => {
    await expect(page.getByText('Share')).toBeVisible();
  });
});
