<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top bar -->
    <div class="flex items-center justify-between px-5 pt-6 pb-2">
      <h1 class="text-2xl font-bold text-emerald-900">LuxeDine</h1>
      <div class="flex items-center gap-3">
        <button class="text-gray-500 hover:text-emerald-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
        <button class="text-gray-500 hover:text-emerald-800 relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
          </svg>
        </button>
      </div>
    </div>

    <section class="p-4 pb-28">
      <!-- Search -->
      <div class="relative mb-5">
        <input
          type="text"
          placeholder="Search for delicacies..."
          class="w-full py-3 pl-12 pr-4 rounded-xl bg-white shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
      <div class="flex gap-3 overflow-x-auto mb-7 no-scrollbar">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          :class="[
            'px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
            activeCategory === cat
              ? 'bg-emerald-800 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
          ]"
        >{{ cat }}</button>
      </div>

      <!-- Popular Choices -->
      <h2 class="text-3xl font-bold mb-5">Popular Choices</h2>

      <!-- Featured Card -->
      <div class="relative overflow-hidden rounded-3xl h-72 mb-5 shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947"
          alt="Steak"
          class="w-full h-full object-cover"
        />

        <div
          class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"
        ></div>

        <div class="absolute bottom-6 left-6 text-white">
          <span
            class="inline-block px-4 py-1 bg-green-400 text-black rounded-full text-sm mb-3 font-medium"
          >
            Bestseller
          </span>

          <h3 class="text-3xl font-bold">Wagyu Ribeye Steak</h3>

          <p class="text-gray-200">Melt-in-your-mouth precision.</p>
        </div>
      </div>

      <!-- Product Cards -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Card 1 -->
        <div
          class="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
        >
          <img
            src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9"
            class="h-40 w-full object-cover"
          />

          <div class="p-3">
            <h4 class="font-semibold">Truffle Fettuccine</h4>

            <p class="text-gray-500">$32.00</p>
          </div>
        </div>
      </div>

        <!-- Card 2 -->
        <div
          class="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
        >
          <img
            src="https://images.unsplash.com/photo-1575023782549-62ca0d244b39"
            class="h-40 w-full object-cover"
          />

          <div class="p-3">
            <h4 class="font-semibold">Midnight Orchid</h4>

            <p class="text-gray-500">$18.00</p>
          </div>
        </div>
    </section>

    <!-- Bottom order bar -->
    <div class="fixed bottom-0 left-0 right-0 px-4 pb-4 z-50">
      <div
        class="bg-emerald-800 rounded-2xl px-5 py-4 flex items-center justify-between text-white max-w-lg mx-auto cursor-pointer hover:bg-emerald-900 transition"
        @click="goToCart"
      >
        <div class="flex items-center gap-3">
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
            </svg>
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-orange-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
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
import { useRouter } from 'vue-router'

const router = useRouter()

const categories = ['All', 'Starters', 'Main Course', 'Drinks']
const activeCategory = ref('All')

const featured = {
  id: 10,
  name: 'Wagyu Ribeye Steak',
  subtitle: 'Melt-in-your-mouth precision.',
  price: 128,
  image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
  description: 'Tender A5-grade Japanese Wagyu ribeye, slow-seared in clarified butter with fresh thyme and garlic.',
  category: 'Main Course',
}

const gridItems = ref([
  { id: 11, name: 'Truffle Fettuccine', price: 32, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400', description: 'Fresh pasta, black truffle shavings, parmesan.', category: 'Main Course' },
  { id: 12, name: 'Midnight Orchid', price: 18, image: 'https://images.unsplash.com/photo-1575023782549-62ca0d244b39?w=400', description: 'Signature cocktail with violet liqueur and elderflower.', category: 'Drinks' },
])

const menuItems = ref([
  { id: 1, name: 'Seared Atlantic Salmon', description: 'Crispy skin salmon, citrus quinoa, asparagus, and a light saffron velouté.', price: 28.00, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop', category: 'Main Course' },
  { id: 2, name: 'Garden Zenith Bowl', description: 'Avocado, heirloom tomatoes, roasted seeds, and an herb-tahini dressing.', price: 22.00, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop', category: 'Starters' },
  { id: 3, name: 'The Luxe Burger', description: 'Wagyu beef, 24-month aged cheddar, gold leaf fries, and truffle aioli.', price: 35.00, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop', category: 'Main Course' },
])

const cart = ref([])
const cartCount = computed(() => cart.value.reduce((s, i) => s + i.qty, 0))
const cartTotal = computed(() => cart.value.reduce((s, i) => s + i.price * i.qty, 0))

function addToCart(item) {
  const existing = cart.value.find(c => c.id === item.id)
  if (existing) existing.qty++
  else cart.value.push({ ...item, qty: 1 })
}

function goToDetail(item) {
  router.push(`/products/detail/${item.id}`)
}

function goToCart() {
  router.push('/shopping-cart')
}
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
