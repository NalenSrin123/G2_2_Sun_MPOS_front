<template>
  <div
    class="w-full bg-[#f4f6f3] rounded-xl px-5 py-2"
  >
    <div
      class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <!-- Left -->
      <div>
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-800">
          Order Management
        </h2>

        <p class="mt-1 text-sm text-gray-500">
          Monitor and process real-time dining floor orders.
        </p>
      </div>

      <!-- Right -->
      <div
        class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto"
      >
        <input
          type="datetime-local"
          class="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition duration-200"
        >
          + New Manual Order
        </button>
      </div>
    </div>
  </div>

</template>

<script setup>
import '@/style.css'
</script>

