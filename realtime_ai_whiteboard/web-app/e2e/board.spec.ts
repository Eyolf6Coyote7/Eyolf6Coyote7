import { test, expect } from '@playwright/test';
import { mockLogin } from './helpers/auth';

test.describe('Board Canvas', () => {
  test.beforeEach(async ({ page }) => {
    await mockLogin(page);
    await page.goto('/board/1');
  });

  test('shows canvas with toolbar', async ({ page }) => {
    await expect(page.getByTitle('Select')).toBeVisible();
    await expect(page.getByTitle('Rectangle')).toBeVisible();
    await expect(page.getByTitle('Freehand')).toBeVisible();
  });

  test('shows back button', async ({ page }) => {
    await expect(page.getByText('← Back')).toBeVisible();
  });

  test('AI button opens chat panel', async ({ page }) => {
    await page.getByText('✨ AI').click();
    await expect(page.getByText('AI Assistant')).toBeVisible();
    await expect(page.getByPlaceholder('Ask AI anything...')).toBeVisible();
  });

  test('share button is visible', async ({ page }) => {
    await expect(page.getByText('Share')).toBeVisible();
  });
});
