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
            <RouterLink class="nav-link" aria-current="page" to="/products">Products</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/search">Search</RouterLink>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">Cart <span class="badge rounded-pill bg-danger">{{ cartItemCount
                }}</span></router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useCartStore } from './../stores/cart';
import { computed } from 'vue';

export default {

  data() {
    const cartStore = useCartStore();

    const cartItems = computed(() => cartStore.cartItems);
    const cartItemCount = computed(() => cartItems.value.length);

    return {
      cartItemCount
    };
  }
};
</script>

<style lang="scss" scoped></style>