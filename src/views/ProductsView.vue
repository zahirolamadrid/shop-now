<template>
  <div>
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
                <button class="btn btn-secondary me-md-2" type="button" @click="addToCart(product)">Add to Cart</button>
                <RouterLink :to="{ name: 'product-details', params: { id: product.id } }" class="btn btn-primary"
                  type="button">View Product</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="totalPages > 1">
    <Pagination :current-page="currentPage" :total-pages="totalPages" @update:currentPage="currentPage = $event"></Pagination>
  </div>

</template>

<script>
import axios from 'axios';
import Pagination from './../components/Pagination.vue';
import { useCartStore } from './../stores/cart';

export default {
  components: { Pagination },
  data() {
    return {
      products: [],
      limit: 12,
      currentPage: 1,
      totalPages: 0,
      skip: 0
    }
  },
  methods: {
    fetchProducts() {
      this.skip = (this.currentPage - 1) * this.limit;
      axios.get('https://dummyjson.com/products?limit=' + this.limit + '&skip=' + this.skip)
        .then(response => {
          this.products = response.data.products;
          this.totalPages = response.data.total / this.limit;
        })
        .catch(error => {
          console.error(error);
        });
    },
    addToCart(product) {
      const cartStore = useCartStore();
      cartStore.addProductToCart(product);
    }
  },
  mounted() {
    this.fetchProducts();
  },
  watch: {
    currentPage() {
      this.fetchProducts();
    }
  }
};
</script>

<style></style>
