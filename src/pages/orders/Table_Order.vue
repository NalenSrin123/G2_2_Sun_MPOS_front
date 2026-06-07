```vue
<template>
  <div
    class="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
  >
    <!-- ================= desktop  -->
    <div class="hidden lg:block">
      <!-- heading -->
      <div
        class="grid grid-cols-7 gap-4 bg-[#EEF2ED] px-6 py-4 text-sm font-medium text-gray-600"
      >
        <div>Order ID</div>
        <div>Table</div>
        <div class="col-span-2">Items</div>
        <div>Status</div>
        <div>Amount</div>
        <div>Time</div>
      </div>

      <!-- rows -->
      <div
        v-for="order in orders"
        :key="order.id"
        class="grid grid-cols-7 gap-4 px-6 py-5 border-t border-gray-100 hover:bg-gray-50 transition relative"
      >
        <!-- Left bar -->
        <div
          class="absolute left-0 top-0 h-full w-1 rounded-r"
          
        ></div>

        <!-- Order ID -->
        <div class="font-medium text-gray-800">
          #ORD-{{ order.id }}
        </div>

        <!-- Table -->
        <div>
          <span
            class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-700"
          >
            {{ order.table }}
          </span>
        </div>

        <!-- Items -->
        <div class="col-span-2 truncate text-gray-700">
          {{ order.items }}
        </div>

        <!-- Status -->
        <div>
          <span
            class="px-3 py-1 rounded-full text-xs font-semibold"
          >
            {{ order.status }}
          </span>
        </div>

        <!-- Amount -->
        <div class="font-bold text-gray-900">
          ${{ order.amount }}
        </div>

        <!-- Time -->
        <div class="text-gray-600">
          {{ order.time }}
        </div>
      </div>
    </div>

    <!-- ================= mobile -->
    <div class="lg:hidden p-4 space-y-4 bg-gray-50">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative"
      >
        <div
          class="absolute left-0 top-0 h-full w-1 rounded-r"
        ></div>

        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-gray-800">
              #ORD-{{ order.id }}
            </h3>

            <p class="text-sm text-gray-500 mt-1">
              Table {{ order.table }}
            </p>
          </div>

          <span
            class="px-3 py-1 rounded-full text-xs font-semibold"
          >
            {{ order.status }}
          </span>
        </div>

        <div class="mt-3">
          <p class="text-sm text-gray-700">
            {{ order.items }}
          </p>
        </div>

        <!-- bottom -->
        <div class="mt-4 flex justify-between items-center">
          <div>
            <p class="text-xs text-gray-400">
              Amount
            </p>

            <p class="font-bold text-lg text-gray-900">
              ${{ order.amount }}
            </p>
          </div>

          <div class="text-right">
            <p class="text-xs text-gray-400">
              Time
            </p>

            <p class="font-medium text-gray-700">
              {{ order.time }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= footer ================= -->
    <div
      class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-4 md:px-6 py-4 bg-[#EEF2ED]"
    >
      <p class="text-sm text-gray-500 text-center md:text-left">
        Showing 1-10 of 48 orders
      </p>

      <div class="flex justify-center gap-2">
        <button
          class="w-9 h-9 rounded-lg border border-gray-200 bg-white hover:bg-gray-100"
        >
          ←
        </button>

        <button
          class="w-9 h-9 rounded-lg bg-green-700 text-white"
        >
          1
        </button>

        <button
          class="w-9 h-9 rounded-lg hover:bg-gray-100"
        >
          2
        </button>

        <button
          class="w-9 h-9 rounded-lg hover:bg-gray-100"
        >
          3
        </button>

        <button
          class="w-9 h-9 rounded-lg border border-gray-200 bg-white hover:bg-gray-100"
        >
          →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const orders = [
  {
    id: 1,
    table: 'Table 1',
    items: 'Pizza',
    status: 'Ready',
    amount: '14.50',
    time: '12:45 PM'
  },
  {
    id: 2,
    table: 'Table 3',
    items: 'Chickend',
    status: 'Cooking',
    amount: '8.00',
    time: '1:02 PM'
  },
  {
    id: 3,
    table: 'Table 8',
    items: 'Khmer Noodle',
    status: 'Success',
    amount: '1.00',
    time: '12:15 PM'
  }
  
]



</script>
```
