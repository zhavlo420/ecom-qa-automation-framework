const { test, expect } = require('../../fixtures/testFixtures');
const { loginAsStandardUser } = require('../../utils/testHelpers');

async function startCheckout(inventoryPage, cartPage, checkoutPage) {
  await inventoryPage.addProductByName('Sauce Labs Backpack');
  await inventoryPage.openCart();
  await cartPage.checkout();
}

test.describe('Checkout flow', () => {
  test.beforeEach(async ({ loginPage, users }) => {
    await loginAsStandardUser(loginPage, users);
  });

  test('CHECK-001 checkout requires first name', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await startCheckout(inventoryPage, cartPage, checkoutPage);
    await checkoutPage.fillCustomerDetails('', 'Dange', '462001');
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('CHECK-002 checkout requires last name', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await startCheckout(inventoryPage, cartPage, checkoutPage);
    await checkoutPage.fillCustomerDetails('Soham', '', '462001');
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
  });

  test('CHECK-003 checkout requires postal code', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await startCheckout(inventoryPage, cartPage, checkoutPage);
    await checkoutPage.fillCustomerDetails('Soham', 'Dange', '');
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
  });

  test('CHECK-004 valid details open order overview', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    await startCheckout(inventoryPage, cartPage, checkoutPage);
    await checkoutPage.fillCustomerDetails('Soham', 'Dange', '462001');
    await checkoutPage.continue();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');
  });

  test('CHECK-005 order overview shows item subtotal', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await startCheckout(inventoryPage, cartPage, checkoutPage);
    await checkoutPage.fillCustomerDetails('Soham', 'Dange', '462001');
    await checkoutPage.continue();
    await expect(checkoutPage.summarySubtotal).toContainText('Item total');
  });

  test('CHECK-006 order overview shows tax and total', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await startCheckout(inventoryPage, cartPage, checkoutPage);
    await checkoutPage.fillCustomerDetails('Soham', 'Dange', '462001');
    await checkoutPage.continue();
    await expect(checkoutPage.summaryTax).toContainText('Tax');
    await expect(checkoutPage.summaryTotal).toContainText('Total');
  });

  test('CHECK-007 cancel from checkout overview returns to inventory', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    await startCheckout(inventoryPage, cartPage, checkoutPage);
    await checkoutPage.fillCustomerDetails('Soham', 'Dange', '462001');
    await checkoutPage.continue();
    await checkoutPage.cancelButton.click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('CHECK-008 complete purchase successfully', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    await startCheckout(inventoryPage, cartPage, checkoutPage);
    await checkoutPage.fillCustomerDetails('Soham', 'Dange', '462001');
    await checkoutPage.continue();
    await checkoutPage.finish();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});
