<template>
  <div
    class=" rounded-xl px-4 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
  >
    <div class="flex flex-wrap items-center gap-3">
      <span class="text-sm text-gray-600 font-medium">
        Filter Status:
      </span>

      <div class="flex flex-wrap items-center gap-1">
        <button
          v-for="status in statuses"
          :key="status"
          @click="$emit('change-filter', status)"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition',
            activeFilter === status
              ? 'bg-white text-green-700 shadow-sm'
              : 'text-gray-600 hover:bg-white'
          ]"
        >
          {{ status }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { activeFilter } = defineProps({
  activeFilter: {
    type: String,
    default: 'All Orders'
  }
})

const emit = defineEmits(['change-filter'])

const statuses = [
  'All Orders',
  'Cooking',
  'Ready',
  'Pending'
]

const changeFilter = (status) => {
  emit('change-filter', status)
}
</script>