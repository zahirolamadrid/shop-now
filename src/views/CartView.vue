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
                <div>
                  <input type="number" v-model="item.quantity" min="1" class="form-control" style="width: 60px;">
                  <button class="btn btn-danger btn-sm" @click="removeItem(item.product.id)">Remove</button>
                </div>
              </div>
              <p class="card-text">Price: ${{ item.product.price * item.quantity }}</p>
              <router-link :to="{ name: 'product-details', params: { id: item.product.id } }" class="btn btn-primary btn-sm">View Product</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Cart Summary</h5>
              <ul class="list-group">
                <li class="list-group-item">Subtotal: ${{ calculateSubtotal() }}</li>
                <li class="list-group-item">Total: ${{ calculateSubtotal() }}</li>
              </ul>
              <button class="btn btn-success btn-block">Checkout</button>
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