<template>
  <section class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <p class="text-center font-bold text-sm">
        {{ new Date().getFullYear() }} {{ tradeMark }}
      </p>

      <a
        href="#top"
        id="back-to-top"
        class="absolute left-4 top-1/2 transform -translate-y-1/2"
        aria-label="Back to top"
      >
        <font-awesome-icon
          :icon="['fas', 'angle-up']"
          class="h-6 w-6 hover:text-yellow-400 cursor-pointer animate-pulse"
        />
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: "FooterComponent",
  data() {
    return {
      tradeMark: "© Bespoke. All rights reserved",
    };
  },
};
</script>
