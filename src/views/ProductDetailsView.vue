<template>
  <div class="card">
    <img :src="product.images" class="card-img-top" :alt="product.title">
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text">{{ product.description }} {{ $route.params.username }}</p>
      <p class="card-text">Price: ${{ product.price }}</p>
      <button class="btn btn-primary">Add to Cart</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: {}
    };
  },
  created() {
      axios.get('https://dummyjson.com/products/' + this.$route.params.id)
        .then(response => {
          this.product = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
};
</script>

