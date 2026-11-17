const { test, expect } = require('../../fixtures/testFixtures');
const { loginAsStandardUser } = require('../../utils/testHelpers');

test.describe('Shopping cart', () => {
  test.beforeEach(async ({ loginPage, users }) => {
    await loginAsStandardUser(loginPage, users);
  });

  test('CART-001 add one product to cart', async ({ inventoryPage }) => {
    await inventoryPage.addProductByName('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('CART-002 add two different products', async ({ inventoryPage }) => {
    await inventoryPage.addProductByName('Sauce Labs Backpack');
    await inventoryPage.addProductByName('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('CART-003 remove a product from inventory', async ({ inventoryPage }) => {
    await inventoryPage.addProductByName('Sauce Labs Backpack');
    await inventoryPage.removeProductByName('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('CART-004 cart page shows added product', async ({ inventoryPage, page }) => {
    await inventoryPage.addProductByName('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
  });

  test('CART-005 remove a product from cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductByName('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.removeProductByName('Sauce Labs Backpack');
    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test('CART-006 continue shopping returns to products', async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.openCart();
    await cartPage.continueShoppingClick();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('CART-007 cart badge reflects three products', async ({ inventoryPage }) => {
    await inventoryPage.addProductByName('Sauce Labs Backpack');
    await inventoryPage.addProductByName('Sauce Labs Bike Light');
    await inventoryPage.addProductByName('Sauce Labs Bolt T-Shirt');
    await expect(inventoryPage.cartBadge).toHaveText('3');
  });
});
