<template>
  <div class="min-h-screen bg-neutral-50 flex justify-center items-start py-0 md:py-8">
    <div class="w-full max-w-md md:max-w-xl bg-[#F7FAF7] min-h-screen md:min-h-[850px] shadow-sm md:rounded-3xl overflow-hidden border border-gray-100 flex flex-col">

      <header class="flex justify-between items-center px-5 py-4 bg-[#F7FAF7] border-b border-gray-100/50">
        <button @click="$router.push('/')" class="text-[#0A5C36] hover:opacity-70 transition-opacity" aria-label="Go home">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
          </svg>
        </button>
        <h1 class="text-lg font-bold text-[#0A5C36] tracking-wide">LuxeDine</h1>
        <button class="text-[#0A5C36] relative hover:opacity-70 transition-opacity" aria-label="Notifications">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>
          </svg>
        </button>
      </header>

      <main class="flex-1 px-5 py-6 overflow-y-auto">
        <section class="mb-6">
          <h2 class="text-2xl font-extrabold text-neutral-800 tracking-tight">Order History</h2>
          <p class="text-neutral-500 text-sm mt-1 font-medium">Manage and track your gourmet experiences</p>
        </section>

        <!-- Active Order -->
        <section class="mb-8">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-xs font-bold tracking-wider text-[#0A5C36] uppercase">Active Order</h3>
            <span class="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
          </div>
          <div class="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
            <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-[#10B981]"></div>
            <div class="flex justify-between items-start pl-2">
              <div>
                <h4 class="font-bold text-neutral-800 text-lg">#ORD-1024</h4>
                <div class="flex items-center gap-1.5 text-[#0A5C36] mt-1 text-sm font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>
                  </svg>
                  Preparing your meal
                </div>
              </div>
              <span class="bg-[#E6F4EA] text-[#0A5C36] text-xs font-bold px-3 py-1 rounded-full border border-[#D1EEDC]">In Progress</span>
            </div>
            <div class="flex justify-between items-end pl-2 mt-4">
              <span class="text-2xl font-extrabold text-[#0A5C36]">$32.77</span>
              <button class="bg-[#0A5C36] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#074427] transition-colors shadow-sm">Track Order</button>
            </div>
          </div>
        </section>

        <!-- Past Orders -->
        <section>
          <h3 class="text-xs font-bold tracking-wider text-neutral-500 uppercase mb-4">Past Orders</h3>
          <div class="space-y-4">
            <div v-for="order in pastOrders" :key="order.id" class="bg-white rounded-2xl border border-neutral-100/80 shadow-sm p-5 flex flex-col justify-between min-h-[140px]">
              <div class="flex justify-between items-start">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <img :src="order.image" :alt="order.items" class="w-10 h-10 rounded-xl object-cover"/>
                    <div>
                      <h4 class="font-bold text-neutral-800 text-base">{{ order.id }}</h4>
                      <p class="text-xs text-neutral-400 font-medium">{{ order.date }}</p>
                    </div>
                  </div>
                </div>
                <span class="bg-[#EAEAEA] text-[#555555] text-xs font-bold px-3 py-1 rounded-full">{{ order.status }}</span>
              </div>
              <div class="flex justify-between items-end mt-3">
                <div>
                  <span class="text-sm font-semibold text-neutral-700 leading-snug whitespace-pre-line">{{ order.items }}</span>
                  <div class="text-xl font-bold text-neutral-600 mt-1">${{ order.price.toFixed(2) }}</div>
                </div>
                <button
                  @click="$router.push('/')"
                  class="flex items-center gap-1.5 border border-[#E6F4EA] bg-[#F4FAF6] text-[#0A5C36] font-bold text-sm px-4 py-2 rounded-xl hover:bg-[#E6F4EA] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                  </svg>
                  Reorder
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Bottom nav bar -->
      <nav class="flex justify-around items-center px-4 py-3 bg-white border-t border-gray-100">
        <button @click="$router.push('/')" class="flex flex-col items-center gap-1 text-gray-400 hover:text-[#0A5C36] transition text-xs font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>
          Home
        </button>
        <button class="flex flex-col items-center gap-1 text-[#0A5C36] transition text-xs font-bold">
          <div class="w-10 h-10 rounded-full bg-[#0A5C36] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          </div>
          Orders
        </button>
        <button @click="$router.push('/shopping-cart')" class="flex flex-col items-center gap-1 text-gray-400 hover:text-[#0A5C36] transition text-xs font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>
          Cart
        </button>
        <button class="flex flex-col items-center gap-1 text-gray-400 hover:text-[#0A5C36] transition text-xs font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
          Profile
        </button>
      </nav>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pastOrders = ref([
  { id: '#ORD-982', date: 'June 12, 2023', status: 'Completed', items: 'Wagyu Sando, Iced Tea', price: 45.00, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop' },
  { id: '#ORD-955', date: 'June 05, 2023', status: 'Completed', items: 'Ribeye Steak, Wine', price: 128.00, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=100&h=100&fit=crop' },
])
</script>