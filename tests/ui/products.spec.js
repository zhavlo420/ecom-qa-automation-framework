const { test, expect } = require('../../fixtures/testFixtures');
const { loginAsStandardUser } = require('../../utils/testHelpers');

test.describe('Product catalogue', () => {
  test.beforeEach(async ({ loginPage, users }) => {
    await loginAsStandardUser(loginPage, users);
  });

  test('PROD-001 product page is displayed', async ({ inventoryPage }) => {
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('PROD-002 six products are displayed', async ({ inventoryPage }) => {
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test('PROD-003 product names are not empty', async ({ inventoryPage }) => {
    const names = await inventoryPage.productNames();
    expect(names).toHaveLength(6);
    expect(names.every(name => name.trim().length > 0)).toBeTruthy();
  });

  test('PROD-004 product prices are positive numbers', async ({ inventoryPage }) => {
    const prices = await inventoryPage.productPrices();
    expect(prices).toHaveLength(6);
    expect(prices.every(price => Number.isFinite(price) && price > 0)).toBeTruthy();
  });

  test('PROD-005 sort products by name ascending', async ({ inventoryPage }) => {
    await inventoryPage.sort('az');
    const names = await inventoryPage.productNames();
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  test('PROD-006 sort products by name descending', async ({ inventoryPage }) => {
    await inventoryPage.sort('za');
    const names = await inventoryPage.productNames();
    expect(names).toEqual([...names].sort((a, b) => b.localeCompare(a)));
  });

  test('PROD-007 sort products by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sort('lohi');
    const prices = await inventoryPage.productPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('PROD-008 sort products by price high to low', async ({ inventoryPage }) => {
    await inventoryPage.sort('hilo');
    const prices = await inventoryPage.productPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('PROD-009 product images are present', async ({ page }) => {
    const images = page.locator('.inventory_item_img img');
    await expect(images).toHaveCount(6);
    for (let i = 0; i < await images.count(); i++) {
      await expect(images.nth(i)).toBeVisible();
    }
  });

  test('PROD-010 cart badge starts hidden', async ({ inventoryPage }) => {
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });
});
