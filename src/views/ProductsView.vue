<template>
  <div>
    <h1>Products</h1>

    <div>
    <div v-for="product in products" :key="product.id">
      <h3>{{ product.title }}</h3>
      <p>{{ product.price }}</p>
      </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: []
    }
  },
  created() {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        this.products = response.data.products;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>

<style>
</style>
