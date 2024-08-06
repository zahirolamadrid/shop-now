import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
    cartItemCount: 0
  }),
  actions: {
    addProductToCart(product) {
      const existingProduct = this.cartItems.find(item => item.product.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cartItems.push({ product, quantity: 1 });
      }
      this.calculateCartItemCounty();
    },
    removeItem(productId) {
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
      this.calculateCartItemCounty();
    },
    isInCart(productId) {
      return this.cartItems.some(item => item.product.id === productId);
    },
    emptyCart() {
      this.cartItems = [];
      this.totalQuantity = 0;
    },
    calculateCartItemCounty() {
      let cartItemCount = 0;
      this.cartItems.forEach(item => {
        cartItemCount += item.quantity;
      });
      this.cartItemCount = cartItemCount;
    },
    updateQuantity(productId, quantity) {
      const product = this.cartItems.find(item => item.product.id === productId);
      product.quantity = Number(quantity);
      this.calculateCartItemCounty();
    }
  }
});