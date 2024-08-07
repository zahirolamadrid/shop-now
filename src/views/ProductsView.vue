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
                <div class="toast-container position-fixed top-0 end-0 p-3">
                  <div id="productAddedToast" class="toast text-bg-success" data-bs-delay="2000" role="alert"
                    aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                      <div class="toast-body">
                        The product has been added!
                      </div>
                      <button type="button" class="btn-close me-2 m-auto btn-close-white" data-bs-dismiss="toast"
                        aria-label="Close"></button>
                    </div>
                  </div>
                </div>
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
    <Pagination :current-page="currentPage" :total-pages="totalPages" @update:currentPage="currentPage = $event">
    </Pagination>
  </div>

</template>

<script>
import axios from 'axios';
import Pagination from './../components/Pagination.vue';
import { useCartStore } from './../stores/cart';
import bootstrap from 'bootstrap/dist/js/bootstrap.min';

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

      const productAddedToast = document.getElementById('productAddedToast')
      const toast = bootstrap.Toast.getOrCreateInstance(productAddedToast)
      toast.show();
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
