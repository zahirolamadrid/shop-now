<template>
    <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
            </li>
            <li class="page-item" v-for="page in pages" :key="page" :class="{ active: page === currentPage }">
                <a class="page-link" href="#" @click="setPage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
            </li>
        </ul> 
    </nav>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    computed: {
        pages() {
            const pageCount = this.totalPages;
            const pageRange = [];
            for (let i = 1; i <= pageCount; i++) {
                pageRange.push(i);
            }
            if (this.currentPage < 4) {
                return pageRange.slice(0, 5);
            } else {
                return pageRange.slice(this.currentPage - 3, this.currentPage + 2);
            }
            
        }
    },
    methods: {
        prevPage() {
            this.$emit('update:currentPage', this.currentPage - 1);
        },
        nextPage() {
            this.$emit('update:currentPage', this.currentPage + 1);
        },
        setPage(page) {
            this.$emit('update:currentPage', page);
        }
    }
};
</script>