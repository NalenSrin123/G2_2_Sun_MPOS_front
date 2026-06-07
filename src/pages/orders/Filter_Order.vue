<template>
  <div
    class="bg-[#f4f6f3] rounded-xl px-4 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
  >
    <!-- Left Section -->
    <div class="flex flex-wrap items-center gap-3">
      <span class="text-sm text-gray-600 font-medium">
        Filter Status:
      </span>

      <div class="flex flex-wrap items-center gap-1">
        <button
          class="px-4 py-2 rounded-lg bg-white text-green-700 text-sm font-medium shadow-sm"
        >
          All Orders
        </button>

        <button
          class="px-4 py-2 rounded-lg text-gray-600 hover:bg-white text-sm transition"
        >
          Cooking
        </button>

        <button
          class="px-4 py-2 rounded-lg text-gray-600 hover:bg-white text-sm transition"
        >
          Ready
        </button>

        <button
          class="px-4 py-2 rounded-lg text-gray-600 hover:bg-white text-sm transition"
        >
          Pending
        </button>
      </div>

      <!-- Divider -->
      <div class="hidden md:block w-px h-6 bg-gray-300"></div>

      <!-- Sort -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">
          Sort by:
        </span>

        <select
          class="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
        >
          <option>Latest First</option>
          <option>Oldest First</option>
          <option>Highest Price</option>
          <option>Lowest Price</option>
        </select>
      </div>
    </div>

    <!-- Right Section -->
    <button
      class="flex items-center gap-2 text-green-700 font-medium text-sm hover:text-green-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M7 12h10M10 18h4"
        />
      </svg>

      Advanced Filters
    </button>
  </div>
</template>

<script setup>

</script>

<style>

</style>