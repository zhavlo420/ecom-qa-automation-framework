class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async addProductByName(name) {
    const item = this.inventoryItems.filter({ hasText: name });
    await item.locator('button').click();
  }

  async removeProductByName(name) {
    const item = this.inventoryItems.filter({ hasText: name });
    await item.locator('button').click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sort(value) {
    await this.sortSelect.selectOption(value);
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async productNames() {
    return this.inventoryItems.locator('.inventory_item_name').allTextContents();
  }

  async productPrices() {
    const values = await this.inventoryItems.locator('.inventory_item_price').allTextContents();
    return values.map(value => Number(value.replace('$', '')));
  }
}

module.exports = { InventoryPage };
