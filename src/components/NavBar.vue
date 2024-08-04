<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" href="/" to="/">Shop Now!</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" href="/" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" href="/products" to="/products">Products</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" href="/search" to="/search">Search</RouterLink>
          </li>
        </ul>
        <div class="position-relative">
          <div>
            <router-link class="nav-link" to="/cart">Cart <span
                class="badge rounded-pill bg-danger">{{ cartItems.length }}</span></router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useCartStore } from './../stores/cart';

export default {

  data() {
    const cartStore = useCartStore();

    return {
      cartItems: cartStore.cartItems
    };
  },
  methods: {
    removeItem(productId) {
      // Remove the item from the cartItems array
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    },
    calculateSubtotal() {
      // Calculate the total price based on cart items
      return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }
  }
};
</script>

<style lang="scss" scoped></style>