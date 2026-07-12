<template>
  <div class="bg-emerald-50 flex flex-col pb-20">
    <div class="flex-1 px-5 pt-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Main Menu</h1>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-10 text-gray-600">
        Loading menu items...
      </div>

      <!-- Error State -->
      <div
        v-if="error"
        class="text-center py-4 mb-4 text-amber-700 bg-amber-50 rounded-lg"
      >
        ⚠️ {{ error }} — Showing sample menu instead
      </div>

      <!-- Menu List -->
      <div v-if="!loading && menuItems.length" class="space-y-5">
        <div v-for="item in menuItems" :key="item.id" class="flex gap-4">
          <img
            :src="item.image"
            :alt="item.name"
            class="w-24 h-24 rounded-2xl object-cover"
            loading="lazy"
          />

          <div class="flex-1 min-w-0">
            <h2 class="text-lg font-semibold text-gray-900">
              {{ item.name }}
            </h2>

            <p class="text-sm text-gray-500 mt-1 line-clamp-2">
              {{ item.description }}
            </p>

            <div class="flex items-center justify-between mt-2">
              <span class="text-emerald-800 font-bold text-lg">
                ${{ Number(item.price).toFixed(2) }}
              </span>

              <button
                @click="addToCart(item)"
                class="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-800 text-white hover:bg-emerald-900 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom order bar -->
    <div class="fixed bottom-0 left-0 right-0 px-4 pb-4">
      <div
        class="bg-emerald-800 rounded-2xl px-5 py-4 flex items-center justify-between text-white max-w-md mx-auto"
      >
        <div class="flex items-center gap-3">
          <div class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>

            <span
              class="absolute -top-2 -right-2 bg-orange-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cartCount }}
            </span>
          </div>

          <span class="font-medium">View your order</span>
        </div>

        <span class="font-bold text-lg"> ${{ cartTotal.toFixed(2) }} </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import api from "../../services/api";
// State
const menuItems = ref([]);
const loading = ref(false);
const error = ref(null);
const cart = ref([]);

const cartCount = computed(() => cart.value.length);

const cartTotal = computed(() => {
  return cart.value.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    return sum + price;
  }, 0);
});

// fallback menu
const sampleMenu = [
  {
    id: 1,
    name: "Truffle Fettuccine",
    price: 32,
    description: "Creamy truffle sauce, parmesan cheese, fresh pasta",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Midnight Orchid",
    price: 18,
    description: "Premium gin, dry vermouth, garnished with olives",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop",
  },
];

let isMounted = true;

// Fetch menu items
const fetchMenuItems = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await api.get("/products");
    menuItems.value = response.data.map((product) => ({
      id: product.id,
      name: product.title || "Untitled",
      description: product.description || "No description",
      price: Number(product.price) || 0,
      image: product.image || "",
    }));
  } catch (err) {
    console.error(err);
    error.value = err.message;
    menuItems.value = sampleMenu;
  } finally {
    if (isMounted) loading.value = false;
  }
};

// Cart
function addToCart(item) {
  cart.value.push({ ...item });
}

onMounted(() => {
  fetchMenuItems();
});

onBeforeUnmount(() => {
  isMounted = false;
});
</script>
