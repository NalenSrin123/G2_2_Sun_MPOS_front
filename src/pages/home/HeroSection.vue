<template>
  <div class="min-h-screen bg-gray-50">
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
      <div class="relative mb-5">
        <input
          v-model="searchQuery"
          @input="debounceSearch"
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

      <div class="flex gap-3 overflow-x-auto mb-7 no-scrollbar">
        <button
          @click="selectCategory(null)"
          :class="[
            'px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
            activeCategoryId === null
              ? 'bg-emerald-800 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
          ]"
        >All</button>

        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="selectCategory(cat.id)"
          :class="[
            'px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
            activeCategoryId === cat.id
              ? 'bg-emerald-800 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
          ]"
        >{{ cat.name }}</button>
      </div>

      <h2 class="text-3xl font-bold mb-5">Popular Choices</h2>

      <div v-if="featuredItem" class="relative overflow-hidden rounded-3xl h-72 mb-5 shadow-lg cursor-pointer" @click="goToDetail(featuredItem)">
        <img
          :src="featuredItem.image || 'https://images.unsplash.com/photo-1544025162-d76694265947'"
          :alt="featuredItem.name"
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

          <h3 class="text-3xl font-bold">{{ featuredItem.name }}</h3>

          <p class="text-gray-200">{{ featuredItem.description }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="item in products"
          :key="item.id"
          @click="goToDetail(item)"
          class="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
        >
          <img
            :src="item.image || 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9'"
            class="h-40 w-full object-cover"
          />

          <div class="p-3">
            <h4 class="font-semibold text-gray-800">{{ item.name }}</h4>
            <p class="text-gray-500">${{ parseFloat(item.price).toFixed(2) }}</p>
          </div>
        </div>
      </div>  
    </section>

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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const API_BASE = 'https://g2-sun-11-mpos-back-gjyx.onrender.com/api/v1'

const categories = ref([])
const products = ref([])
const activeCategoryId = ref(null)
const searchQuery = ref('')
let searchTimeout = null

const featuredItem = computed(() => {
  return products.value.length > 0 ? products.value[0] : null
})

// ទាញយកប្រភេទមុខម្ហូប (Categories)
const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE}/categories?is_active=true`)
    categories.value = response.data.data || response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

// មុខងារទាញយកមុខម្ហូប (Products)
const fetchProducts = async () => {
  try {
    let url = `${API_BASE}/products?is_active=true`
    if (activeCategoryId.value) {
      url += `&category_id=${activeCategoryId.value}`
    }
    if (searchQuery.value) {
      url += `&search=${encodeURIComponent(searchQuery.value)}`
    }
    const response = await axios.get(url)
    products.value = response.data.data || response.data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const debounceSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchProducts()
  }, 350)
}

const selectCategory = (id) => {
  activeCategoryId.value = id
  fetchProducts()
}

onMounted(() => {
  fetchCategories()
  fetchProducts()
})

// ផ្នែកប្រព័ន្ធកាតទិញអីវ៉ាន់ (Shopping Cart Logic)
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
