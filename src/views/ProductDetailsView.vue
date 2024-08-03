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
              <s>${{ Math.round((100 * product.price) / (100 - product.discountPercentage) *100) / 100 }}</s>
            </span>
            <span class="font-weight-bold">
              <strong>${{ product.price }}</strong>
            </span>
          </p>
        </div>
        <div v-if="product.availabilityStatus === 'Low Stock'" class="alert alert-warning" role="alert">
          Low Stock! Only {{ product.stock }} remaining.
        </div>
        <button class="btn btn-primary">Add to Cart</button>
      </div>
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

