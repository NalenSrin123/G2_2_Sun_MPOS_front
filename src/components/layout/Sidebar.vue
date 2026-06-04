<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Mobile Overlay -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black/50 z-40 md:hidden"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed md:static top-0 left-0 z-50 h-screen bg-green-50 border-r border-green-200 shadow-xl transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
      class="w-72 flex flex-col justify-between p-4"
    >
      <!-- Logo -->
      <div>
        <div class="flex items-center gap-3 mb-8">
          <div
            class="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center text-white"
          >
            🍴
          </div>

          <div>
            <h1 class="font-bold text-xl text-emerald-700">
              LuxeDine Pro
            </h1>
            <p class="text-xs text-gray-500">
              Admin Terminal
            </p>
          </div>
        </div>

        <nav class="space-y-2">
          <a
            href="#"
            class="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-500 text-white"
          >
            📊 Dashboard
          </a>

          <a
            href="#"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            📄 Orders
          </a>

          <a
            href="#"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            🍽️ Menu
          </a>

          <a
            href="#"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            📦 Inventory
          </a>

          <a
            href="#"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            👥 Staff
          </a>

          <a
            href="#"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            📈 Analytics
          </a>
        </nav>
      </div>

      <div class="space-y-2">
        <a
          href="#"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          ⚙️ Settings
        </a>

        <button
          class="w-full bg-emerald-700 text-white py-3 rounded-lg"
        >
          Support
        </button>
      </div>
    </aside>

    <!-- Content -->
    <div class="flex-1 flex flex-col " >

      <!-- Navbar -->
      <header
        class="flex items-center justify-between  border-b border-green-300 shadow-sm bg-green-50 px-4 md:px-6 py-4"
      >
        <!-- Left -->
        <div class="flex items-center gap-4">

          <!-- Mobile Menu -->
          <button
            @click="sidebarOpen = true"
            class="md:hidden text-2xl"
          >
            ☰
          </button>

          <!-- Search -->
          <div class="relative ml-5 ">
            <input
              type="text"
              placeholder="Search..."
              class="w-60 md:w-96 pl-10 pr-4 py-2 border rounded-full border-green-300"
            />

            <svg
              class="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
              />
            </svg>
          </div>
        </div>

        <!-- Right -->
        <div class="flex items-center gap-4 ">
          <button class="relative">
            🔔
            <span
              class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"
            ></span>
          </button>

          <div class="hidden sm:flex items-center gap-3">
            <div class="text-right">
              <h3 class="font-semibold lg:text-sm text-xs">
                Julian Rossi
              </h3>
              <p class="text-xs text-gray-400">
                General Manager
              </p>
            </div>

            <img
              src="https://i.pinimg.com/736x/9e/a3/e2/9ea3e2d70cbe842d9ebd65a18a50c065.jpg"
              class="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </header>


    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const sidebarOpen = ref(false);
</script>