import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows hero text and CTA', async ({ page }) => {
    await expect(page.getByText('Think together, in real time')).toBeVisible();
    await expect(page.getByText('Get Started Free')).toBeVisible();
  });

  test('language toggle switches to zh-TW', async ({ page }) => {
    await page.getByText('中文').click();
    await expect(page.getByText('即時協作，一起思考')).toBeVisible();
  });

  test('CTA navigates to auth page', async ({ page }) => {
    await page.getByText('Get Started Free').click();
    await expect(page).toHaveURL('/auth');
  });
});
