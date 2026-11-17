class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.continueShopping = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async removeProductByName(name) {
    const item = this.cartItems.filter({ hasText: name });
    await item.locator('button').click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShoppingClick() {
    await this.continueShopping.click();
  }
}

module.exports = { CartPage };
