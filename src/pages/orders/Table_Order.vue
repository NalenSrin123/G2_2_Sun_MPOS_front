<template>
  <div
    class="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
  >
    <!-- Desktop -->
    <div class="hidden lg:block max-h-[430px] overflow-y-auto hide-scrollbar">
      <div
        class="sticky top-0 z-10 grid grid-cols-7 gap-4 bg-green-500 px-6 py-4 text-sm font-medium text-white"
      >
        <div>Order ID</div>
        <div>Table</div>
        <div class="col-span-2">Items</div>
        <div>Status</div>
        <div>Amount</div>
        <div>Time</div>
      </div>

      <div
        v-for="order in orders"
        :key="order.id"
        class="grid grid-cols-7 gap-4 px-6 py-5 border-t border-gray-100 hover:bg-gray-50 transition"
      >
        <div class="font-medium text-gray-800">
          #ORD-{{ order.id }}
        </div>

        <div>
          <span
            class="rounded-[15px] bg-indigo-100 px-2.5 py-1.5 text-xs font-semibold text-indigo-700"
          >
            {{ order.table }}
          </span>
        </div>

        <div class="col-span-2 truncate text-gray-700">
          {{ order.items }}
        </div>

        <div>
          <span
            :class="statusClass(order.status)"
            class="px-3 py-1 rounded-full text-xs font-semibold"
          >
            {{ order.status }}
          </span>
        </div>

        <div class="font-bold text-gray-900">
          ${{ order.amount }}
        </div>

        <div class="text-gray-600">
          {{ order.time }}
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="lg:hidden p-4 space-y-4 overflow-y-auto hide-scrollbar bg-gray-50">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-gray-800">
              #ORD-{{ order.id }}
            </h3>

            <p class="text-sm text-gray-500 mt-1">
              {{ order.table }}
            </p>
          </div>

          <span
            :class="statusClass(order.status)"
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

    <!-- Empty State -->
    <div
      v-if="orders.length === 0"
      class="py-12 text-center text-gray-500"
    >
      No orders found.
    </div>
  </div>
</template>

<script setup>
const { orders } = defineProps({
  orders: {
    type: Array,
    default: () => []
  }
})

const statusClass = (status) => {
  const classes = {
    Ready: 'bg-green-100 text-green-700',
    Cooking: 'bg-yellow-100 text-yellow-700',
    Pending: 'bg-red-100 text-red-700'
  }

  return classes[status] || 'bg-gray-100 text-gray-700'
}
</script>
<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>