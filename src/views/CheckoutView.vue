<template>
    <div class="container">
        <div class="py-5 text-center">
            <h2>Checkout</h2>
        </div>

        <div class="row g-5">
            <div class="col-md-5 col-lg-4 order-md-last">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-primary">Your cart</span>
                    <span class="badge bg-primary rounded-pill">{{ cartItemCount }}</span>
                </h4>
                <ul class="list-group mb-3">
                    <li v-for="item in cartItems" :key="item.product.id"
                        class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                            <h6 class="my-0">{{ item.quantity }} x {{ item.product.title }}</h6>
                        </div>
                        <span class="text-body-secondary">${{ calculateItemPrice(item.product.price,
                            item.quantity).toFixed(2)
                            }}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <strong>Total (USD)</strong>
                        <strong>${{ calculateTotal.toFixed(2) }}</strong>
                    </li>
                </ul>
            </div>
            <div class="col-md-7 col-lg-8">
                <h4 class="mb-3">Billing address</h4>
                <form class="needs-validation" novalidate>
                    <div class="row g-3">
                        <div class="col-sm-6">
                            <label for="firstName" class="form-label">First name</label>
                            <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
                            <div class="invalid-feedback">
                                Valid first name is required.
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <label for="lastName" class="form-label">Last name</label>
                            <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
                            <div class="invalid-feedback">
                                Valid last name is required.
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" v-model="email"
                                placeholder="you@example.com" required>
                            <div class="invalid-feedback">
                                Please enter a valid email address.
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="address" class="form-label">Address</label>
                            <input type="text" class="form-control" id="address" placeholder="1234 Main St" required>
                            <div class="invalid-feedback">
                                Please enter your shipping address.
                            </div>
                        </div>

                        <div class="col-md-5">
                            <label for="country" class="form-label">Country</label>
                            <select class="form-select" id="country" required>
                                <option value="">Choose...</option>
                                <option>United States</option>
                            </select>
                            <div class="invalid-feedback">
                                Please select a valid country.
                            </div>
                        </div>

                        <div class="col-md-4">
                            <label for="state" class="form-label">State</label>
                            <select class="form-select" id="state" required>
                                <option value="">Choose...</option>
                                <option>Florida</option>
                            </select>
                            <div class="invalid-feedback">
                                Please provide a valid state.
                            </div>
                        </div>

                        <div class="col-md-3">
                            <label for="zip" class="form-label">Zip</label>
                            <input type="text" class="form-control" id="zip" placeholder="12345" v-model="zipCode" required>
                            <div class="invalid-feedback">
                                Please enter a valid zip code.
                            </div>
                        </div>
                    </div>

                    <hr class="my-4">

                    <h4 class="mb-3">Payment</h4>

                    <div class="row gy-3">
                        <div class="col-md-6">
                            <label for="cc-name" class="form-label">Name on card</label>
                            <input type="text" class="form-control" id="cc-name" placeholder="" required>
                            <small class="text-body-secondary">Full name as displayed on card</small>
                            <div class="invalid-feedback">
                                Name on card is required
                            </div>
                        </div>

                        <div class="col-md-6">
                            <label for="cc-number" class="form-label">Credit card number</label>
                            <input type="text" class="form-control" id="cc-number" placeholder=""
                                v-model="creditCardNumber" required>
                            <div class="invalid-feedback">
                                Please enter a valid credit card number.
                            </div>
                        </div>

                        <div class="col-md-3">
                            <label for="cc-expiration" class="form-label">Expiration</label>
                            <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
                            <div class="invalid-feedback">
                                Expiration date required
                            </div>
                        </div>

                        <div class="col-md-3">
                            <label for="cc-cvv" class="form-label">CVV</label>
                            <input type="password" class="form-control" id="cc-cvv" placeholder="" v-model="cvv" required>
                            <div class="invalid-feedback">
                                Please enter a valid CVV.
                            </div>
                        </div>
                    </div>

                    <hr class="my-4">

                    <button class="w-100 btn btn-primary btn-lg mb-4" type="submit" @click="onSubmit">Checkout</button>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import { useCartStore } from './../stores/cart';
import { computed, ref, watch } from 'vue';

export default {
    data() {
        const cartStore = useCartStore();

        const cartItems = computed(() => cartStore.cartItems);
        const cartItemCount = computed(() => cartStore.cartItemCount);

        return {
            email: ref(''),
            creditCardNumber: ref(''),
            zipCode: ref(''),
            cvv: ref(''),
            cartItems,
            cartItemCount
        };
    },
    computed: {
        calculateTotal() {
            return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        }
    },
    methods: {
        calculateItemPrice(price, quantity) {
            return price * quantity;
        },
        validateEmail() {
            const emailInput = document.getElementById('email');
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            if (emailRegex.test(this.email)) {
                emailInput.setCustomValidity('');
            } else {
                emailInput.setCustomValidity('Please enter a valid email address');
                event.preventDefault();
                event.stopPropagation();
            }
        },
        validateZipCode() {
            const zipCodeInput = document.getElementById('zip');
            const zipCodeRegex = /^\d{5}(?:[-]\d{4})?$/;

            if (zipCodeRegex.test(this.zipCode)) {
                zipCodeInput.setCustomValidity('');
            } else {
                zipCodeInput.setCustomValidity('Please enter a valid zip code. Formats: 12345, 12345-6789 or 12345 1234');
                event.preventDefault();
                event.stopPropagation();
            }
        },
        validateCVV() {
            const cvvInput = document.getElementById('cc-cvv');
            const cvvRegex = /^\d{3}$/;

            if (cvvRegex.test(this.cvv)) {
                cvvInput.setCustomValidity('');
            } else {
                cvvInput.setCustomValidity('Please enter a valid CVV code.');
                event.preventDefault();
                event.stopPropagation();
            }
        },
        validateCreditCardNumber() {
            const creditCardNumberInput = document.getElementById('cc-number');
            const creditCardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

            if (creditCardRegex.test(this.creditCardNumber)) {
                creditCardNumberInput.setCustomValidity('');
            } else {
                creditCardNumberInput.setCustomValidity('Please enter a valid credit card number');
                event.preventDefault();
                event.stopPropagation();
            }
        },
        onSubmit() {
            const form = document.querySelector('.needs-validation');
            this.validateEmail();
            this.validateCreditCardNumber();
            this.validateZipCode();
            this.validateCVV();
            if (form.checkValidity()) {
                form.classList.add('was-validated');
                this.$router.push('/thanks');
            } else {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
            }
        }
    },
    watch: {
        email(newValue, oldValue) {
            this.validateEmail();
        },
        creditCardNumber(newValue, oldValue) {
            this.validateCreditCardNumber();
        },
        zipCode(newValue, oldValue) {
            this.validateZipCode();
        },
        cvv(newValue, oldValue) {
            this.validateCVV();
        },
    },
}
</script>

<style></style>