<template>
    <div class="container mt-5">
      <div class="row mb-3">
        <div class="col-md-12">
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search products"
              aria-label="Search"
              v-model="searchQuery"
            />
            <button class="btn btn-outline-success" type="submit" @click.prevent="searchProducts">
              Search
            </button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 my-3" v-for="product in filteredProducts" :key="product.id">
          <div class="card">
            <img :src="product.thumbnail" class="card-img-top" :alt="product.title">
            <div class="card-body">
              <h5 class="card-title">{{ product.title  }}</h5>
              <p class="card-text">{{ product.description }}</p>
              <p class="card-text">Price: ${{ product.price }}</p>
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-secondary me-md-2" type="button">Add to Cart</button>
                <RouterLink :to="{ name: 'product-details', params: { id: product.id } }" class="btn btn-primary"
                  type="button">View Product</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="totalPages > 1">
        <Pagination :current-page="currentPage" :total-pages="totalPages" @update:currentPage="currentPage = $event"></Pagination>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Pagination from './../components/Pagination.vue';
  
  export default {
    components: { Pagination },
    data() {
      return {
        searchQuery: '',
        products: [],
        filteredProducts: [],
        limit: 12,
        currentPage: 1,
        totalPages: 0,
        skip: 0
      };
    },
    methods: {
      searchProducts() {
        this.skip = (this.currentPage - 1) * this.limit;
        const url = `https://dummyjson.com/products/search?q=${this.searchQuery}&limit=${this.limit}&skip=${this.skip}`;
        axios.get(url)
          .then(response => {
            this.filteredProducts = response.data.products;
            this.totalPages = response.data.total / this.limit;
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>