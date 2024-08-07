<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <img :src="product.images[0]" class="img-fluid" :alt="product.title">
      </div>
      <div class="col-md-6">
        <h1 class="h2">{{ product.title }}</h1>
        <p class="card-text">{{ product.description }}</p>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <p class="text-muted">
            <span class="mx-2" v-if="product.discountPercentage > 0">
              <s>${{ Math.round((100 * product.price) / (100 - product.discountPercentage) * 100) / 100 }}</s>
            </span>
            <span class="font-weight-bold">
              <strong>${{ product.price }}</strong>
            </span>
          </p>
        </div>
        <div v-if="product.availabilityStatus === 'Low Stock'" class="alert alert-warning" role="alert">
          Low Stock! Only {{ product.stock }} remaining.
        </div>
        <div class="d-flex">
          <button v-if="!isInCart(product.id)" class="btn btn-secondary me-md-2" type="button"
            @click="addToCart(product)">Add to Cart</button>
          <input v-if="isInCart(product.id)" type="number" min="1" class="form-control" v-model="quantity"
            style="width: 60px;" @input="updateQuantity(product.id, $event.target.value)">
          <button v-if="isInCart(product.id)" class="btn btn-danger me-md-2 mx-2" type="button"
            @click="removeItem(product.id)">Remove from Cart</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useCartStore } from './../stores/cart';

export default {
  data() {
    return {
      product: {},
      quantity: 0
    };
  },
  created() {
    axios.get('https://dummyjson.com/products/' + this.$route.params.id)
      .then(response => {
        const cartStore = useCartStore();
        this.product = response.data;
        this.quantity = cartStore.getQuantity(this.product.id);
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    addToCart(product) {
      const cartStore = useCartStore();
      cartStore.addProductToCart(product);
      this.quantity = 1;
    },
    removeItem(productId) {
      const cartStore = useCartStore();
      cartStore.removeItem(productId);
      this.quantity = 0;
    },
    isInCart(productId) {
      const cartStore = useCartStore();
      return cartStore.isInCart(productId);
    },
    updateQuantity(productId, quantity){
      const cartStore = useCartStore();
      cartStore.updateQuantity(productId, quantity);
    }
  },
};
</script>
