<template>
    <div>
        <div class="px-4 py-5 my-5 text-center">
            <img class="d-block mx-auto mb-4" src="../assets/online-shop.jpg" alt="" width="72" height="57">
            <h1 class="display-5 fw-bold text-body-emphasis">Successful purchase!</h1>
            <div class="col-lg-6 mx-auto">
                <p class="lead mb-4">The purchase was made successfully! Thank you for your purchase. Please continue
                    shopping.</p>
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <RouterLink to="/" class="btn btn-primary btn-lg px-4 gap-3">Home</RouterLink>
                    <RouterLink to="/search" class="btn btn-danger btn-lg px-4 gap-3">Search Products</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useCartStore } from '../stores/cart';

export default{
    mounted() {
        const cartStore = useCartStore()
        cartStore.emptyCart();
    },
};


</script>

<style lang="scss" scoped></style>