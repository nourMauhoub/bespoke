<template>
  <div class="space-y-4 capitalize">
    <div>
      <label class="block text-sm font-medium text-gray-700" for="category">
        category
      </label>

      <select
        v-model="selectedCategory"
        id="category"
        @change="applyFilters"
        class="capitalize mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
      >
        <option value="">all categories</option>
        <option value="electronics">electronics</option>
        <option value="jewelery">jewelery</option>
        <option value="men's clothing">men's clothing</option>
        <option value="women's clothing">women's clothing</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700" for="minPrice">
        price range
      </label>
      <input
        v-model="minPrice"
        id="minPrice"
        type="number"
        placeholder="min price"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
      />

      <input
        v-model="maxPrice"
        id="maxPrice"
        type="number"
        placeholder="max price"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
      />

      <button
        @click="applyFilters"
        class="mt-2 w-full p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
      >
        apply filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedCategory = ref("");
const minPrice = ref("");
const maxPrice = ref("");

const emit = defineEmits(["filter-change"]);

const applyFilters = () => {
  emit("filter-change", {
    category: selectedCategory.value,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
  });
};
</script>
