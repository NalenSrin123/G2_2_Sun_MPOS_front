<template>
  <div class="min-h-screen bg-emerald-50 flex flex-col">
    <div class="flex-1 px-5 pt-8 pb-32 max-w-md mx-auto w-full">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Main Menu</h1>
      <p class="text-gray-500 mb-6">Choose your favorite dishes and create your order.</p>

      <div class="space-y-5">
        <div
          v-for="item in menuItems"
          :key="item.id"
          class="bg-white rounded-2xl shadow-sm p-3 flex gap-4"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-24 h-24 rounded-2xl object-cover"
            loading="lazy"
          />

          <div class="flex-1 min-w-0">
            <h2 class="text-lg font-semibold text-gray-900">{{ item.name }}</h2>
            <p class="text-sm text-gray-500 mt-1 line-clamp-2">
              {{ item.description }}
            </p>

            <div class="flex items-center justify-between mt-3">
              <span class="text-emerald-800 font-bold text-lg">
                ${{ item.price.toFixed(2) }}
              </span>

              <button
                @click="addToCart(item)"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-800 text-white hover:bg-emerald-900 transition"
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

    <!-- Bottom Order Bar -->
    <div class="fixed bottom-0 left-0 right-0 px-4 pb-4">
      <div class="bg-emerald-800 rounded-2xl px-5 py-4 flex items-center justify-between text-white max-w-md mx-auto shadow-lg">
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

          <div>
            <p class="font-medium">View your order</p>
            <p class="text-xs text-emerald-100" v-if="orderId">
              Order #{{ orderId }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span class="font-bold text-lg">${{ cartTotal.toFixed(2) }}</span>

          <button
            @click="createOrder"
            :disabled="loading || cartCount === 0"
            class="bg-white text-emerald-800 px-4 py-2 rounded-xl font-semibold hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Creating...' : 'Order Now' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Success / Error Message -->
    <div v-if="message" class="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        class="px-4 py-3 rounded-xl shadow-lg text-white"
        :class="messageType === 'success' ? 'bg-emerald-600' : 'bg-red-500'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import api from '../../../services/api' // adjust path if needed

// --------------------
// Demo menu data
// --------------------
const menuItems = ref([
  {
    id: 1,
    name: 'Seared Atlantic Salmon',
    description: 'Crispy skin salmon, citrus quinoa, asparagus, and a light saffron sauce.',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop'
  },
  {
    id: 2,
    name: "Midnight Orchid",
    price: 18,
    description: "Premium gin, dry vermouth, garnished with olives",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: 'The Luxe Burger',
    description: 'Wagyu beef, aged cheddar, fries, and truffle mayo.',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop'
  }
])

// --------------------
// Cart state
// --------------------
const cart = ref([])
const loading = ref(false)
const orderId = ref(null)
const message = ref('')
const messageType = ref('success')

// You can change these values later
const tableId = ref(2)
const adminId = ref(1)
const paymentMethod = ref('cash')

// --------------------
// Computed
// --------------------
const cartCount = computed(() => cart.value.length)
const cartTotal = computed(() =>
  cart.value.reduce((sum, item) => sum + Number(item.price), 0)
)

// --------------------
// Methods
// --------------------
function addToCart(item) {
  cart.value.push(item)
  showMessage(`${item.name} added to cart`, 'success')
}

function showMessage(text, type = 'success') {
  message.value = text
  messageType.value = type

  setTimeout(() => {
    message.value = ''
  }, 2500)
}

async function createOrder() {
  if (cart.value.length === 0) {
    showMessage('Please add at least one item first.', 'error')
    return
  }

  loading.value = true

  try {
    const payload = {
      table_id: tableId.value,
      admin_id: adminId.value,
      payment_method: paymentMethod.value
    }

    const res = await api.post('/orders', payload)

    // API example returns:
    // {
    //   id: 3,
    //   table_id: 2,
    //   admin_id: 1,
    //   status: "pending",
    //   total_amount: 0,
    //   payment_method: "cash"
    // }

    orderId.value = res.data.id
    showMessage(`Order created successfully. Order ID: ${orderId.value}`, 'success')

    console.log('Created order:', res.data)

    // next step later:
    // send cart items to /order-items or your order detail API
  } catch (error) {
    console.error('Create order error:', error)
    showMessage('Failed to create order.', 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMenuItems();
});

onBeforeUnmount(() => {
  isMounted = false;
});
</script>
