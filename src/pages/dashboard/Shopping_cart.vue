<template>
  <div class="bg-emerald-50 min-h-screen p-3 md:p-6 pb-32">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <button @click="$router.push('/')" class="flex items-center gap-2 text-emerald-900 hover:opacity-70 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
        </svg>
      </button>
      <h1 class="text-2xl md:text-3xl font-bold text-emerald-900">LuxeDine</h1>
      <button class="text-emerald-900 hover:opacity-70 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
        </svg>
      </button>
    </div>

    <h2 class="text-xl md:text-2xl font-bold mb-4 text-gray-900">Your Selection</h2>

    <!-- Cart Items -->
    <div class="space-y-4">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="bg-white rounded-2xl shadow p-3 md:p-4 flex items-center gap-3 md:gap-4 border-l-4 border-emerald-900"
      >
        <img :src="item.image" :alt="item.name" class="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover"/>
        <div class="flex-1 min-w-0">
          <h3 class="font-bold text-base md:text-xl text-gray-900">{{ item.name }}</h3>
          <p class="text-gray-500 text-xs md:text-base mt-0.5">{{ item.description }}</p>
          <p class="text-emerald-900 font-bold text-sm md:text-lg mt-1">${{ (item.price * item.qty).toFixed(2) }}</p>
        </div>
        <div class="ml-auto flex flex-col items-center gap-3">
          <button @click="deleteItem(item.id)" class="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
          <div class="bg-gray-200 h-8 md:h-10 px-3 md:px-4 rounded-full flex items-center gap-3">
            <button @click="decreaseQty(item)" class="font-bold text-sm md:text-lg text-gray-700 hover:text-emerald-800">−</button>
            <span class="font-medium text-sm md:text-base w-5 text-center">{{ item.qty }}</span>
            <button @click="increaseQty(item)" class="font-bold text-sm md:text-lg text-gray-700 hover:text-emerald-800">+</button>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="cartItems.length === 0" class="text-center py-16 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
        </svg>
        <p class="font-medium">Your cart is empty</p>
        <button @click="$router.push('/')" class="mt-4 text-emerald-700 font-semibold hover:underline">Browse the menu →</button>
      </div>
    </div>

    <!-- Order Summary -->
    <div v-if="cartItems.length > 0" class="bg-white rounded-2xl shadow p-4 md:p-6 mt-6">
      <h2 class="text-lg md:text-2xl font-bold mb-4 text-gray-900">Order Summary</h2>
      <div class="flex justify-between mb-2 text-sm md:text-base text-gray-600">
        <span>Subtotal</span><span>${{ subtotal.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between mb-2 text-sm md:text-base text-gray-600">
        <span>Service Fee (10%)</span><span>${{ serviceFee.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between mb-4 text-sm md:text-base text-gray-600">
        <span>Tax (8%)</span><span>${{ tax.toFixed(2) }}</span>
      </div>
      <hr class="mb-4"/>
      <div class="flex justify-between text-xl md:text-3xl font-bold text-emerald-800">
        <span>i Total</span><span>${{ total.toFixed(2) }}</span>
      </div>
    </div>

    <!-- Place Order button -->
    <div v-if="cartItems.length > 0" class="fixed bottom-0 left-0 right-0 px-4 pb-4 bg-transparent">
      <button
        @click="$router.push('/payment')"
        class="w-full max-w-2xl mx-auto flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-white py-4 rounded-2xl font-semibold text-base md:text-lg transition shadow-lg"
      >
        Place Order
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const cartItems = ref([
  { id: 1, name: 'Wagyu Ribeye Steak', description: 'Medium Rare • Truffle Butter', price: 128, qty: 1, image: 'https://i.pinimg.com/1200x/15/c9/fa/15c9fa79aa679c64554a2769ddc29d76.jpg' },
  { id: 2, name: 'Truffle Fettuccine', description: 'Fresh Pasta • Parmesan', price: 42, qty: 1, image: 'https://i.pinimg.com/1200x/e4/4e/51/e44e51d2b35aa90f31f9e5f9df8a836e.jpg' },
])

const increaseQty = (item) => item.qty++
const decreaseQty = (item) => { if (item.qty > 1) item.qty-- }
const deleteItem = (id) => { cartItems.value = cartItems.value.filter(i => i.id !== id) }

const subtotal = computed(() => cartItems.value.reduce((sum, i) => sum + i.price * i.qty, 0))
const serviceFee = computed(() => subtotal.value * 0.1)
const tax = computed(() => subtotal.value * 0.08)
const total = computed(() => subtotal.value + serviceFee.value + tax.value)
</script>