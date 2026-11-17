const { test, expect } = require('../../fixtures/testFixtures');

test.describe('Authentication', () => {
  test.beforeEach(async ({ loginPage }) => loginPage.goto());

  test('AUTH-001 valid user can log in', async ({ loginPage, users, page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('AUTH-002 invalid username is rejected', async ({ loginPage, users }) => {
    await loginPage.login(users.invalid.username, users.invalid.password);
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('AUTH-003 invalid password is rejected', async ({ loginPage, users }) => {
    await loginPage.login(users.standard.username, 'incorrect_password');
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });

  test('AUTH-004 empty credentials are rejected', async ({ loginPage }) => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('AUTH-005 empty password is rejected', async ({ loginPage, users }) => {
    await loginPage.login(users.standard.username, '');
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });

  test('AUTH-006 locked-out user is rejected', async ({ loginPage, users }) => {
    await loginPage.login(users.locked.username, users.locked.password);
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('AUTH-007 user can log out', async ({ loginPage, inventoryPage, users, page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('AUTH-008 inventory route redirects unauthenticated user', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
