<template>
  <div class="capitalize">
    <label
      for="sortBy"
      class="block text-sm font-medium text-gray-700 capitalize"
      >sort by</label
    >
    <select
      id="sortBy"
      v-model="sortBy"
      @change="applySort"
      class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
    >
      <option value="title">title</option>
      <option value="price">price</option>
    </select>

    <label
      for="sortOrder"
      class="block text-sm font-medium text-gray-700 capitalize"
      >sort order</label
    >

    <select
      id="sortOrder"
      v-model="sortOrder"
      @change="applySort"
      class="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
    >
      <option value="asc">ascending</option>
      <option value="desc">descending</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from "vue";

const sortBy = ref("title");
const sortOrder = ref("asc");

const emit = defineEmits(["sort-change"]);

const applySort = () => {
  emit("sort-change", {
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
  });
};
</script>
