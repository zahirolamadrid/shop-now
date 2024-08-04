<template>
  <div class="container">
    <h1 class="text-center">Shopping Cart</h1>
    <div class="row">
      <div class="col-md-8">
        <div class="card mb-3" v-for="item in cartItems" :key="item.product.id">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div>
                <h6>{{ item.product.title }}</h6>
                <p class="card-text">{{ item.product.description }}</p>
              </div>
            </div>
            <p class="card-text">Price: ${{ calculateItemPrice(item.product.price, item.quantity).toFixed(2) }}</p>
            <div class="d-flex justify-content-between">
              <router-link :to="{ name: 'product-details', params: { id: item.product.id } }"
                class="btn btn-primary">View Product</router-link>
              <input type="number" v-model="item.quantity" min="1" class="form-control" style="width: 60px;">
              <button class="btn btn-danger" @click="removeItem(item.product.id)">Remove</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Cart Summary</h5>
            <ul class="list-group">
              <li class="list-group-item">Total: ${{ calculateTotal().toFixed(2) }}</li>
            </ul>
            <button class="mt-2 btn btn-success btn-block">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    calculateTotal() {
      return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    },
    removeItem(productId) {
      const cartStore = useCartStore();
      cartStore.removeItem(productId);
      this.cartItems = cartStore.cartItems
    },
    calculateItemPrice(price, quantity) {
      return price * quantity;
    }
  }
};
</script>