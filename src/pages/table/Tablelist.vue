<template>
  <div class="p-6 bg-gray-50 min-h-screen">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold">Table Management</h1>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input v-model="search" type="text" placeholder="Search tables..." class="text-sm outline-none bg-transparent w-44 placeholder-gray-400" />
        </div>
        <button class="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </button>
        <div class="w-9 h-9 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">SR</div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div>
          <p class="text-xs text-gray-500 mb-1">{{ stat.label }}</p>
          <p class="text-3xl font-bold" :class="stat.valueClass">{{ stat.value }}</p>
        </div>
        <div class="w-11 h-11 rounded-xl flex items-center justify-center" :class="stat.iconBg">
          <svg class="w-5 h-5" :class="stat.iconColor" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" v-html="stat.icon"></svg>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex gap-2">
        <button v-for="area in areas" :key="area" @click="selectedArea = area"
          :class="selectedArea === area ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'"
          class="px-4 py-2 rounded-full border text-sm font-medium transition-colors">
          {{ area }}
        </button>
      </div>
      <div class="flex items-center gap-2">
        <select v-model="selectedStatus" class="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none text-gray-600">
          <option value="">All Status</option>
          <option value="occupied">Occupied</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="cleaning">Cleaning</option>
        </select>
        <RouterLink
          to="/tables/new"
          class="flex items-center gap-2 bg-emerald-800 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-emerald-900 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Table
        </RouterLink>
      </div>
    </div>

    <!-- Table Rows -->
    <div class="flex flex-col gap-2">
      <div v-for="table in filtered" :key="table.id"
        class="bg-white rounded-xl flex items-center overflow-hidden shadow-sm hover:shadow-md transition-shadow">

        <!-- Accent bar -->
        <div class="w-1.5 self-stretch flex-shrink-0" :class="statusAccent[table.status]"></div>

        <!-- Table number -->
        <div class="px-5 py-4 min-w-[100px]">
          <p class="text-[10px] text-gray-400 uppercase tracking-wide">Table</p>
          <p class="text-2xl font-mono font-medium leading-tight">{{ table.number }}</p>
          <p class="text-[10px] text-gray-400 uppercase tracking-wide">{{ table.area }}</p>
        </div>

        <!-- Badge -->
        <div class="min-w-[120px]">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" :class="statusBadge[table.status]">
            <span v-if="table.status === 'occupied'" class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            {{ statusLabel[table.status] }}
          </span>
        </div>

        <!-- Capacity -->
        <div class="flex items-center gap-1.5 text-sm text-gray-500 min-w-[150px]">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>
          {{ table.capacity }}-seat capacity
        </div>

        <!-- Time -->
        <div class="flex items-center gap-1.5 text-sm text-gray-500 min-w-[150px]">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {{ table.timeInfo }}
        </div>

        <!-- Booking / Priority -->
        <div class="flex items-center gap-1.5 text-sm text-gray-500 min-w-[150px]">
          <template v-if="table.booking">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Booking: {{ table.booking }}
          </template>
          <template v-else-if="table.priority">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
            Status: Priority
          </template>
        </div>

        <div class="flex-1"></div>

        <!-- Actions -->
        <div class="flex items-center gap-2 pr-4">
          <button class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors" :class="actionBtn[table.status]">
            {{ actionLabel[table.status] }}
          </button>
          <button class="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/><rect x="3" y="16" width="5" height="5"/><line x1="16" y1="16" x2="21" y2="16"/><line x1="16" y1="16" x2="16" y2="21"/></svg>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const selectedArea = ref('All Areas')
const selectedStatus = ref('')

const areas = ['All Areas', 'Main Dining', 'Patio', 'Bar']

const stats = [
  { label: 'Total Tables',    value: 42, valueClass: 'text-gray-900', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-700', icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>' },
  { label: 'Active/Occupied', value: 28, valueClass: 'text-emerald-700', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-700', icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
  { label: 'Available',       value: 14, valueClass: 'text-gray-900', iconBg: 'bg-violet-50',  iconColor: 'text-violet-600',  icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
]

const statusAccent = { occupied: 'bg-emerald-600', available: 'bg-sky-400', reserved: 'bg-amber-500', cleaning: 'bg-violet-500' }
const statusBadge  = { occupied: 'bg-emerald-50 text-emerald-700', available: 'bg-sky-50 text-sky-600', reserved: 'bg-amber-50 text-amber-600', cleaning: 'bg-violet-50 text-violet-600' }
const statusLabel  = { occupied: 'Occupied', available: 'Available', reserved: 'Reserved', cleaning: 'Cleaning' }
const actionLabel  = { occupied: 'View Bill', available: 'Seat Guests', reserved: 'Check-in', cleaning: 'Mark Ready' }
const actionBtn    = {
  occupied:  'border border-gray-200 text-gray-700 hover:bg-gray-50',
  available: 'bg-emerald-700 text-white hover:bg-emerald-800',
  reserved:  'bg-amber-500 text-white hover:bg-amber-600',
  cleaning:  'bg-gray-900 text-white hover:bg-gray-800',
}

const tables = [
  { id: 1, number: '01', area: 'MAIN DINING', status: 'occupied',  capacity: 4, timeInfo: 'Seated: 45m ago', booking: null,    priority: false },
  { id: 2, number: '05', area: 'PATIO',       status: 'available', capacity: 2, timeInfo: 'Vacant: 12m',     booking: null,    priority: false },
  { id: 3, number: '12', area: 'MAIN DINING', status: 'reserved',  capacity: 6, timeInfo: 'Reserved: 10m',   booking: '19:30', priority: false },
  { id: 4, number: '08', area: 'BAR AREA',    status: 'cleaning',  capacity: 2, timeInfo: 'Cleaning: 5m',    booking: null,    priority: true  },
  { id: 5, number: '03', area: 'MAIN DINING', status: 'available', capacity: 4, timeInfo: 'Vacant: 30m',     booking: null,    priority: false },
  { id: 6, number: '07', area: 'BAR AREA',    status: 'occupied',  capacity: 2, timeInfo: 'Seated: 1h 10m',  booking: null,    priority: false },
  { id: 7, number: '11', area: 'PATIO',       status: 'reserved',  capacity: 4, timeInfo: 'Reserved: 25m',   booking: '20:00', priority: false },
]

const filtered = computed(() => tables.filter(t => {
  const matchArea   = selectedArea.value === 'All Areas' || t.area.toLowerCase().includes(selectedArea.value.toLowerCase())
  const matchStatus = !selectedStatus.value || t.status === selectedStatus.value
  const matchSearch = !search.value || t.number.includes(search.value) || t.area.toLowerCase().includes(search.value.toLowerCase())
  return matchArea && matchStatus && matchSearch
}))
</script>
  