<template>
  <div class="mx-4 md:mx-8 lg:mx-16">
    <HeaderComponent />
    <div class="top-0 bg-white z-10 py-4 space-y-4 shadow-sm">
      <div
        class="m-4 flex flex-col md:flex-row gap-4 items-start md:items-center"
      >
        <SearchProductsComponent
          @search-change="handleSearchChange"
          class="flex-grow w-full md:w-auto"
        />
        <div class="flex flex-wrap gap-4 w-full md:w-auto">
          <FilterProductsComponent @filter-change="handleFilterChange" />
          <SortProductsComponent @sort-change="handleSortChange" />
        </div>
      </div>

      <div class="text-sm text-gray-500">
        Showing {{ paginatedProducts.length }} of
        {{ sortedAndFilteredProducts.length }} results
      </div>
    </div>

    <div
      v-if="!isLoading"
      ref="productsGrid"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4"
    >
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-out overflow-hidden"
      >
        <div class="relative aspect-square overflow-hidden">
          <img
            :src="product.image"
            :alt="product.title"
            class="w-full h-full object-contain p-4 transform group-hover:scale-105 transition-transform duration-300"
            @click="openModal(product)"
          />
          <div
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4"
          >
            <span class="text-xl font-bold text-white"
              >${{ product.price }}</span
            >
          </div>
        </div>
        <div class="p-4 space-y-2">
          <h2 class="font-semibold text-gray-800 line-clamp-2">
            {{ product.title }}
          </h2>
          <span
            class="inline-block px-2 py-1 text-xs font-medium text-yellow-500 bg-blue-50 rounded-full"
          >
            {{ product.category }}
          </span>
        </div>
      </div>
    </div>

    <div v-else class="min-h-[400px] flex items-center justify-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"
      ></div>
    </div>

    <div
      class="flex flex-col sm:flex-row justify-between items-center gap-4 p-4"
    >
      <div class="text-sm text-gray-500">
        Page {{ currentPage }} of {{ totalPages }}
      </div>
      <div class="flex gap-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
    <ModalComponent
      v-if="selectedProduct"
      :product="selectedProduct"
      :isOpen="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import FilterProductsComponent from "./FilterProductsComponent.vue";
import SortProductsComponent from "./SortProductsComponent.vue";
import SearchProductsComponent from "./SearchProductsComponent.vue";
import HeaderComponent from "../homepage/HeaderComponent.vue";
import ModalComponent from "./ModalComponent.vue";

const store = useStore();
const isLoading = ref(true);
const filters = ref({
  category: "",
  minPrice: "",
  maxPrice: "",
  searchTerm: "",
});
const selectedProduct = ref(null);
const isModalOpen = ref(false);

onMounted(() => {
  store.dispatch("fetchProducts");
  isLoading.value = false;
});

const handleSearchChange = (newSearchTerm) => {
  filters.value.searchTerm = newSearchTerm;
  currentPage.value = 1;
};

const sortOptions = ref({
  sortBy: "title",
  sortOrder: "asc",
});

const handleFilterChange = (newFilters) => {
  filters.value = newFilters;
  currentPage.value = 1;
};

const handleSortChange = (newSortOptions) => {
  sortOptions.value = newSortOptions;
  currentPage.value = 1;
};

const filteredProducts = computed(() => {
  const products = store.getters.products;

  return products.filter((product) => {
    const matchesCategory =
      !filters.value.category || product.category === filters.value.category;
    const matchesMinPrice =
      !filters.value.minPrice ||
      product.price >= parseFloat(filters.value.minPrice);
    const matchesMaxPrice =
      !filters.value.maxPrice ||
      product.price <= parseFloat(filters.value.maxPrice);
    const matchesSearchTerm =
      !filters.value.searchTerm ||
      product.title
        .toLowerCase()
        .includes(filters.value.searchTerm.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(filters.value.searchTerm.toLowerCase());

    return (
      matchesCategory && matchesMinPrice && matchesMaxPrice && matchesSearchTerm
    );
  });
});

const sortedAndFilteredProducts = computed(() => {
  const sortedProducts = [...filteredProducts.value].sort((a, b) => {
    if (sortOptions.value.sortOrder === "asc") {
      return a[sortOptions.value.sortBy] > b[sortOptions.value.sortBy] ? 1 : -1;
    } else {
      return a[sortOptions.value.sortBy] < b[sortOptions.value.sortBy] ? 1 : -1;
    }
  });

  return sortedProducts;
});

const itemsPerPage = 6;
const currentPage = ref(1);
const productsGrid = ref(null);
const totalPages = computed(() =>
  Math.ceil(sortedAndFilteredProducts.value.length / itemsPerPage)
);

const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return sortedAndFilteredProducts.value.slice(startIndex, endIndex);
});

const scrollToTop = () => {
  if (productsGrid.value) {
    productsGrid.value.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    scrollToTop();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    scrollToTop();
  }
};

const openModal = (product) => {
  selectedProduct.value = product;
  isModalOpen.value = true;
};

const closeModal = () => {
  selectedProduct.value = null;
  isModalOpen.value = false;
};
</script>
