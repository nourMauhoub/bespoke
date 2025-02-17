<script setup>
import NavbarComponent from './components/NavbarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
  <NavbarComponent/>

  <router-view class="py-8" />

  <FooterComponent/>
</template>


