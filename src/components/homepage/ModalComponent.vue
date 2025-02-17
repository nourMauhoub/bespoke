<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <font-awesome-icon :icon="['fas', 'times']" class="h-6 w-6" />
      </button>

      <img
        :src="product.image"
        :alt="product.title"
        class="w-full h-64 object-contain mb-4"
      />

      <h2 class="text-xl font-bold mb-2">{{ product.title }}</h2>
      <p class="text-gray-600 mb-4">{{ product.description }}</p>
      <p class="text-lg font-semibold text-blue-600">${{ product.price }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>
