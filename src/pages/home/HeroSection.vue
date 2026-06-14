<template>
  <div class="min-h-screen bg-gray-50">
    <section class="p-4 pb-24">
      <!-- Search -->
      <div class="relative mb-6">
        <input
          type="text"
          placeholder="Search for delicacies..."
          class="w-full py-3 pl-12 pr-4 rounded-xl bg-white shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <!-- Categories -->
      <div class="flex gap-3 overflow-x-auto mb-8 no-scrollbar">
        <button
          class="px-6 py-2 rounded-full bg-green-700 text-white whitespace-nowrap"
        >
          All
        </button>

        <button
          class="px-6 py-2 rounded-full bg-gray-200 text-gray-700 whitespace-nowrap"
        >
          Starters
        </button>

        <button
          class="px-6 py-2 rounded-full bg-gray-200 text-gray-700 whitespace-nowrap"
        >
          Main Course
        </button>

        <button
          class="px-6 py-2 rounded-full bg-gray-200 text-gray-700 whitespace-nowrap"
        >
          Drinks
        </button>
      </div>

      <!-- Popular Choices -->
      <h2 class="text-3xl font-bold mb-5">
        Popular Choices
      </h2>

      <!-- Featured Card -->
      <div class="relative overflow-hidden rounded-3xl h-72 mb-5 shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947"
          alt="Steak"
          class="w-full h-full object-cover"
        />

        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        ></div>

        <div class="absolute bottom-6 left-6 text-white">
          <span
            class="inline-block px-4 py-1 bg-green-400 text-black rounded-full text-sm mb-3 font-medium"
          >
            Bestseller
          </span>

          <h3 class="text-3xl font-bold">
            Wagyu Ribeye Steak
          </h3>

          <p class="text-gray-200">
            Melt-in-your-mouth precision.
          </p>
        </div>
      </div>

      <!-- Product Cards -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Card 1 -->
        <div class="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
          <img
            src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9"
            class="h-40 w-full object-cover"
          />

          <div class="p-3">
            <h4 class="font-semibold">
              Truffle Fettuccine
            </h4>

            <p class="text-gray-500">
              $32.00
            </p>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
          <img
            src="https://images.unsplash.com/photo-1575023782549-62ca0d244b39"
            class="h-40 w-full object-cover"
          />

          <div class="p-3">
            <h4 class="font-semibold">
              Midnight Orchid
            </h4>

            <p class="text-gray-500">
              $18.00
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom Menu -->
    <MainMenu />
  </div>
</template>

<script setup>
import MainMenu from "../preview/components/MainMenu.vue";
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>