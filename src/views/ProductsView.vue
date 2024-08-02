<template>
  <div>
    <h1>Products</h1>

    <div class="container">
    <div class="row">
      <div class="col-md-4 my-3" v-for="product in products" :key="product.id">
        <div class="card">
          <img :src="product.thumbnail" class="card-img-top" :alt="product.title">
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text">Price: ${{ product.price }}</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button class="btn btn-secondary me-md-2" type="button">Add to Cart</button>
              <RouteLink to="/details" class="btn btn-primary" type="button">Details</RouteLink>
            </div>
          </div>
        </div>
      </div>
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
