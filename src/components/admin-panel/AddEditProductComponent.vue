<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mb-8">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">
      {{ editing ? "Edit Product" : "Add New Product" }}
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1"
          >Title</label
        >
        <input
          id="title"
          v-model="formData.title"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            for="price"
            class="block text-sm font-meduim text-gray-700 mb-1 capitalize"
            >price</label
          >
          <input
            id="price"
            type="number"
            v-model="formData.price"
            step="0.01"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label
            for="category"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Category</label
          >
          <select
            id="category"
            v-model="formData.category"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>
      </div>

      <div>
        <label
          for="description"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Description</label
        >
        <textarea
          id="description"
          v-model="formData.description"
          rows="4"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        ></textarea>
      </div>

      <div>
        <label for="image" class="block text-sm font-medium text-gray-700 mb-1"
          >Image URL</label
        >
        <input
          id="image"
          v-model="formData.image"
          type="url"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <div class="flex justify-end space-x-4">
        <button
          v-if="editing"
          @click="cancelEdit"
          type="button"
          class="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-6 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition-colors"
        >
          {{ editing ? "Update Product" : "Add Product" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  product: Object,
});

const emit = defineEmits(["submit", "cancel"]);

const formData = ref({
  title: "",
  price: "",
  description: "",
  category: "electronics",
  image: "",
});

const editing = ref(false);

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      editing.value = true;
      formData.value = { ...newProduct };
    } else {
      editing.value = false;
      resetForm();
    }
  }
);

const handleSubmit = () => {
  emit("submit", formData.value);
  if (!editing.value) resetForm();
};
const cancelEdit = () => {
  emit("cancel");
  resetForm();
};

const resetForm = () => {
  formData.value = {
    title: "",
    price: "",
    description: "",
    category: "electronics",
    image: "",
  };
};
</script>
