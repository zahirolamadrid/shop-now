import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: []
  }),
  actions: {
    addProductToCart(product) {
      const existingProduct = this.cartItems.find(item => item.product.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cartItems.push({ product, quantity: 1 });
      }
    },
    removeItem(productId) {
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    },
    isInCart(productId) {
      return this.cartItems.some(item => item.product.id === productId);
    },
    emptyCart() {
      this.cartItems = [];
    },
  }
});