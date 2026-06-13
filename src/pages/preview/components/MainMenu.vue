<!-- src/components/MainMenu.vue -->
<template>
  <div class="min-h-screen bg-emerald-50 flex flex-col">
    <div class="flex-1 px-5 pt-8 pb-28">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Main Menu</h1>

      <div class="space-y-5">
        <div
          v-for="item in menuItems"
          :key="item.id"
          class="flex gap-4"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-24 h-24 rounded-2xl object-cover"
          />
          <div class="flex-1 min-w-0">
            <h2 class="text-lg font-semibold text-gray-900">{{ item.name }}</h2>
            <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ item.description }}</p>
            <div class="flex items-center justify-between mt-2">
              <span class="text-emerald-800 font-bold text-lg">${{ item.price.toFixed(2) }}</span>
              <button
                @click="addToCart(item)"
                class="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-800 text-white hover:bg-emerald-900 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom order bar -->
    <div class="fixed bottom-0 left-0 right-0 px-4 pb-4">
      <div class="bg-emerald-800 rounded-2xl px-5 py-4 flex items-center justify-between text-white max-w-md mx-auto">
        <div class="flex items-center gap-3">
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span class="absolute -top-2 -right-2 bg-orange-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {{ cartCount }}
            </span>
          </div>
          <span class="font-medium">View your order</span>
        </div>
        <span class="font-bold text-lg">${{ cartTotal.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const menuItems = ref([
  {
    id: 1,
    name: 'Seared Atlantic Salmon',
    description: 'Crispy skin salmon, citrus quinoa, asparagus, and a light saffron...',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop'
  },
  {
    id: 2,
    name: 'Garden Zenith Bowl',
    description: 'Avocado, heirloom tomatoes, roasted seeds, and an herb-tahini dressing.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop'
  },
  {
    id: 3,
    name: 'The Luxe Burger',
    description: 'Wagyu beef, 24-month aged cheddar, gold leaf fries, and truffle...',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop'
  },
])

const cart = ref([])
const cartCount = computed(() => cart.value.length)
const cartTotal = computed(() => cart.value.reduce((sum, i) => sum + i.price, 0))

function addToCart(item) {
  cart.value.push(item)
}
</script>