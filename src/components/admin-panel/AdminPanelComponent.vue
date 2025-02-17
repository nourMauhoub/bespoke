<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <router-link
          to="/"
          class="px-4 py-2 text-sm text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-50"
        >
          Back to Store
        </router-link>
      </div>

      <AddEditProductComponent
        :product="selectedProduct"
        @submit="handleFormSubmit"
        @cancel="selectedProduct = null"
      />

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="border-b border-gray-200">
          <h2 class="px-6 py-4 text-xl font-semibold text-gray-900">
            Manage Products
          </h2>
        </div>

        <div
          ref="productsGrid"
          v-if="!isLoading"
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
              <div class="flex justify-between">
                <span
                  class="inline-block px-2 py-1 text-xs font-medium text-yellow-500 bg-blue-50 rounded-full"
                >
                  {{ product.category }}
                </span>
                <div class="space-x-4">
                  <a href="#top">
                    <font-awesome-icon
                      :icon="['fas', 'pen-to-square']"
                      @click="selectedProduct = product"
                      class="p-2 py-2 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
                    />
                  </a>
                  <a>
                    <font-awesome-icon
                      :icon="['fas', 'trash']"
                      @click="deleteProduct(product.id)"
                      class="p-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    />
                  </a>
                </div>
              </div>
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
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import AddEditProductComponent from "./AddEditProductComponent.vue";
import ModalComponent from "../homepage/ModalComponent.vue";

const store = useStore();
const selectedProduct = ref(null);
const isLoading = ref(true);
const itemsPerPage = 6;
const currentPage = ref(1);
const products = computed(() => store.getters.products);
const isModalOpen = ref(false);
const productsGrid = ref(null);

onMounted(() => {
  store.dispatch("fetchProducts");
  isLoading.value = false;
});

const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return products.value.slice(startIndex, endIndex);
});

const totalPages = computed(() =>
  Math.ceil(products.value.length / itemsPerPage)
);

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
const handleFormSubmit = async (productData) => {
  try {
    if (selectedProduct.value) {
      await store.dispatch("updateProduct", productData);
    } else {
      await store.dispatch("addProduct", productData);
    }
    selectedProduct.value = null;
  } catch (error) {
    console.error("Error saving product:", error);
  }
};

const deleteProduct = async (id) => {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      await store.dispatch("deleteProduct", id);
      currentPage.value = 1;
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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
