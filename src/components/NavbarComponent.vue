<template>
  <div class=" bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center h-16">
          <div class="flex-grow flex justify-center">
            <router-link
              to="/"
              class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              <img class="w-24" src="/src//assets/BespokeLogo.png" alt="">
            </router-link>
          </div>
          <div class="flex items-center">
            <router-link
              to="/admin"
              class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              <font-awesome-icon :icon="['fas', 'gears']" />
            </router-link>
          </div>
        </div>
      </div>
    </nav>

  </div>
</template>
