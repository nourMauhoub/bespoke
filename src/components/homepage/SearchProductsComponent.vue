<template>
  <div class="mb-6">
    <label for="search" class="block text-sm font-medium text-gray-700"
      >Search</label
    >
    <input
      v-model="searchTerm"
      id="search"
      type="text"
      placeholder="Search products..."
      class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
      @input="applySearch"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchTerm = ref("");

const emit = defineEmits(["search-change"]);

const applySearch = () => {
  emit("search-change", searchTerm.value);
};
</script>
