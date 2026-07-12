
<template>
  <div class="flex h-screen overflow-hidden bg-gray-50">
    <!-- Mobile Overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-black/50 md:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed md:static top-0 left-0 z-50 h-screen bg-green-50 border-r border-green-200 shadow-xl transition-transform duration-300',
        sidebarOpen
          ? 'translate-x-0'
          : '-translate-x-full md:translate-x-0',
      ]"
      class="flex w-72 flex-col justify-between p-4"
    >
      <div>
        <!-- Logo -->
        <div class="mb-8 flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-700 text-white"
          >
            <i class="bi bi-cup-hot"></i>
          </div>

          <div>
            <h1 class="text-xl font-bold text-emerald-700">
              LuxeDine Pro
            </h1>

            <p class="text-xs text-gray-500">
              Admin Terminal
            </p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="space-y-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-emerald-100 hover:text-emerald-800"
            :class="[
              route.path === item.to
                ? 'bg-emerald-500 text-white hover:bg-emerald-500 hover:text-white'
                : ''
            ]"
            @click="sidebarOpen = false"
          >
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>
      </div>

      <!-- Bottom Menu -->
      <div class="space-y-2">
        <!-- Settings -->
        <RouterLink
          to="/dashboard/settings"
          class="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-emerald-100 hover:text-emerald-800"
          :class="[
            route.path === '/dashboard/settings'
              ? 'bg-emerald-500 text-white hover:bg-emerald-500 hover:text-white'
              : ''
          ]"
          @click="sidebarOpen = false"
        >
          <i class="bi bi-gear"></i>
          <span>Settings</span>
        </RouterLink>

        <!-- Logout -->
        <button
          class="flex items-center justify-center gap-2 rounded-lg bg-emerald-700 py-3 text-white transition hover:bg-emerald-800"
          @click="onLogout"
        >
          <i class="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex min-w-0 flex-1 flex-col">
      <!-- Header -->
      <header
        class="flex items-center justify-between border-b border-green-300 bg-green-50 px-4 py-4 shadow-sm md:px-6"
      >
        <div class="flex min-w-0 items-center gap-4">
          <!-- Mobile Toggle -->
          <button
            class="text-2xl md:hidden"
            @click="sidebarOpen = true"
          >
            <i class="bi bi-list"></i>
          </button>

          <!-- Search -->
          <div class="relative ml-0 md:ml-5">
            <input
              type="text"
              placeholder="Search..."
              class="w-52 rounded-full border border-green-300 py-2 pl-10 pr-4 outline-none sm:w-72 md:w-96"
            />

            <svg
              class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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

        <!-- User -->
        <div class="flex items-center gap-4">
          <button class="relative">
            <i class="bi bi-bell text-lg"></i>

            <span
              class="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"
            ></span>
          </button>

          <div class="hidden items-center gap-3 sm:flex">
            <div class="text-right">
              <h3 class="text-xs font-semibold lg:text-sm">
                Julian Rossi
              </h3>

              <p class="text-xs text-gray-400">
                General Manager
              </p>
            </div>

            <img
              src="https://i.pinimg.com/736x/9e/a3/e2/9ea3e2d70cbe842d9ebd65a18a50c065.jpg"
              class="h-10 w-10 rounded-full object-cover"
              alt="Profile"
            />
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import useAuthStore from "@/stores/auth.store";

const sidebarOpen = ref(false);
const route = useRoute();
const router = useRouter()
const { logout } = useAuthStore()

const navItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    label: "Orders",
    to: "/dashboard/orders",
    icon: "bi bi-receipt",
  },
  {
    label: "Tables",
    to: "/dashboard/tables",
    icon: "bi bi-grid-3x3-gap",
  },
  {
    label: "Products",
    to: "/dashboard/products",
    icon: "bi bi-menu-button-wide",
  },
  {
    label: "Categories",
    to: "/dashboard/categories",
    icon: "bi bi-tags",
  },
  {
    label: "Users",
    to: "/dashboard/users",
    icon: "bi bi-people",
  },
];

const onLogout = () => {
  sidebarOpen.value = false
  logout()
  router.push('/auth/login')
}
</script>
