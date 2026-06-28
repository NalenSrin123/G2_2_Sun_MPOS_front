<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold">Table Management</h1>
      <div class="flex items-center gap-3">
        <div
          class="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2"
        >
          <svg
            class="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Search tables..."
            class="text-sm outline-none bg-transparent w-44 placeholder-gray-400"
          />
        </div>
        <button
          class="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50"
          @click="fetchTables"
          title="Refresh"
        >
          <svg
            class="w-4 h-4"
            :class="{ 'animate-spin': isLoading }"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path
              d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
            />
          </svg>
        </button>
        <div
          class="w-9 h-9 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center"
        >
          SR
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm"
      >
        <div>
          <p class="text-xs text-gray-500 mb-1">{{ stat.label }}</p>
          <p class="text-3xl font-bold" :class="stat.valueClass">
            {{ stat.value }}
          </p>
        </div>
        <div
          class="w-11 h-11 rounded-xl flex items-center justify-center"
          :class="stat.iconBg"
        >
          <svg
            class="w-5 h-5"
            :class="stat.iconColor"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            v-html="stat.icon"
          ></svg>
        </div>
      </div>
    </div>

    <!-- Error banner -->
    <div
      v-if="errorMessage"
      class="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm flex items-center justify-between"
    >
      <span>{{ errorMessage }}</span>
      <button class="text-red-700 font-semibold" @click="errorMessage = ''">
        Dismiss
      </button>
    </div>

    <!-- Filters -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex gap-2">
        <button
          v-for="area in areas"
          :key="area"
          @click="selectedArea = area"
          :class="
            selectedArea === area
              ? 'bg-emerald-800 text-white border-emerald-800'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
          "
          class="px-4 py-2 rounded-full border text-sm font-medium transition-colors"
        >
          {{ area }}
        </button>
      </div>
      <div class="flex items-center gap-2">
        <select
          v-model="selectedStatus"
          class="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none text-gray-600"
        >
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
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Table
        </RouterLink>
      </div>
    </div>

    <!-- Loading state -->
    <div
      v-if="isLoading && tables.length === 0"
      class="bg-white rounded-xl p-10 text-center text-gray-400 text-sm shadow-sm"
    >
      Loading tables...
    </div>

    <!-- Table Rows -->
    <div v-else class="flex flex-col gap-2">
      <div
        v-for="table in filtered"
        :key="table.id"
        class="bg-white rounded-xl flex items-center overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <!-- Accent bar -->
        <div
          class="w-1.5 self-stretch shrink-0"
          :class="statusAccent[table.status]"
        ></div>

        <!-- Table number -->
        <div class="px-5 py-4 min-w-25">
          <p class="text-[10px] text-gray-400 uppercase tracking-wide">Table</p>
          <p class="text-2xl font-mono font-medium leading-tight">
            {{ table.number }}
          </p>
          <p class="text-[10px] text-gray-400 uppercase tracking-wide">
            {{ table.area }}
          </p>
        </div>

        <!-- Badge -->
        <div class="min-w-30">
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            :class="statusBadge[table.status]"
          >
            <span
              v-if="table.status === 'occupied'"
              class="w-1.5 h-1.5 rounded-full bg-emerald-600"
            ></span>
            {{ statusLabel[table.status] }}
          </span>
        </div>

        <!-- Capacity -->
        <div
          class="flex items-center gap-1.5 text-sm text-gray-500 min-w-37.5"
        >
          <svg
            class="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
            />
          </svg>
          {{ table.capacity }}-seat capacity
        </div>

        <!-- Time -->
        <div
          class="flex items-center gap-1.5 text-sm text-gray-500 min-w-37.5"
        >
          <svg
            class="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {{ table.timeInfo }}
        </div>

        <!-- Booking / Priority -->
        <div
          class="flex items-center gap-1.5 text-sm text-gray-500 min-w-37.5"
        >
          <template v-if="table.booking">
            <svg
              class="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Booking: {{ table.booking }}
          </template>
          <template v-else-if="table.priority">
            <svg
              class="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
              />
            </svg>
            Status: Priority
          </template>
        </div>

        <div class="flex-1"></div>

        <!-- Actions -->
        <div class="flex items-center gap-2 pr-4">
          <button
            class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            :class="actionBtn[table.status]"
          >
            {{ actionLabel[table.status] }}
          </button>
          <button
            class="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="5" height="5" />
              <rect x="16" y="3" width="5" height="5" />
              <rect x="3" y="16" width="5" height="5" />
              <line x1="16" y1="16" x2="21" y2="16" />
              <line x1="16" y1="16" x2="16" y2="21" />
            </svg>
          </button>
          <button
            class="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="deletingId === table.id"
            @click="confirmDelete(table)"
            title="Delete table"
          >
            <svg
              v-if="deletingId !== table.id"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
            <svg
              v-else
              class="w-4 h-4 animate-spin"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 12a9 9 0 1 1-9-9" />
            </svg>
          </button>
        </div>
      </div>

      <div
        v-if="filtered.length === 0"
        class="bg-white rounded-xl p-10 text-center text-gray-400 text-sm shadow-sm"
      >
        No tables match your filters.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";

// Base URL for the table service
const API_BASE = "https://g2-sun-11-mpos-back-gjyx.onrender.com/api/v1";

const search = ref("");
const selectedArea = ref("All Areas");
const selectedStatus = ref("");
const deletingId = ref(null);
const errorMessage = ref("");
const isLoading = ref(false);

const areas = ["All Areas", "Main Dining", "Patio", "Bar"];

const stats = computed(() => {
  const total = tables.length;
  const occupied = tables.filter((t) => t.status === "occupied").length;
  const available = tables.filter((t) => t.status === "available").length;
  return [
    {
      label: "Total Tables",
      value: total,
      valueClass: "text-gray-900",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-700",
      icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    },
    {
      label: "Active/Occupied",
      value: occupied,
      valueClass: "text-emerald-700",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-700",
      icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    },
    {
      label: "Available",
      value: available,
      valueClass: "text-gray-900",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    },
  ];
});

const statusAccent = {
  occupied: "bg-emerald-600",
  available: "bg-sky-400",
  reserved: "bg-amber-500",
  cleaning: "bg-violet-500",
};
const statusBadge = {
  occupied: "bg-emerald-50 text-emerald-700",
  available: "bg-sky-50 text-sky-600",
  reserved: "bg-amber-50 text-amber-600",
  cleaning: "bg-violet-50 text-violet-600",
};
const statusLabel = {
  occupied: "Occupied",
  available: "Available",
  reserved: "Reserved",
  cleaning: "Cleaning",
};
const actionLabel = {
  occupied: "View Bill",
  available: "Seat Guests",
  reserved: "Check-in",
  cleaning: "Mark Ready",
};
const actionBtn = {
  occupied: "border border-gray-200 text-gray-700 hover:bg-gray-50",
  available: "bg-emerald-700 text-white hover:bg-emerald-800",
  reserved: "bg-amber-500 text-white hover:bg-amber-600",
  cleaning: "bg-gray-900 text-white hover:bg-gray-800",
};

const tables = reactive([]);

const filtered = computed(() =>
  tables.filter((t) => {
    const matchArea =
      selectedArea.value === "All Areas" ||
      (t.area || "").toLowerCase().includes(selectedArea.value.toLowerCase());
    const matchStatus =
      !selectedStatus.value || t.status === selectedStatus.value;
    const matchSearch =
      !search.value ||
      (t.number || "").includes(search.value) ||
      (t.area || "").toLowerCase().includes(search.value.toLowerCase());
    return matchArea && matchStatus && matchSearch;
  }),
);

/**
 * Loads tables from the backend.
 * GET {API_BASE}/tables
 * Adjust the field mapping in normalizeTable() if your API's response shape differs.
 */
async function fetchTables() {
  isLoading.value = true;
  errorMessage.value = "";
  try {
    const response = await fetch(`${API_BASE}/tables`);
    if (!response.ok)
      throw new Error(`Failed to load tables (status ${response.status})`);

    const data = await response.json();
    const list = Array.isArray(data) ? data : data.tables || data.data || [];

    tables.splice(0, tables.length, ...list.map(normalizeTable));
  } catch (err) {
    errorMessage.value = err.message || "Could not load tables.";
  } finally {
    isLoading.value = false;
  }
}

/** Normalizes a raw API record into the shape this component expects. */
function normalizeTable(raw) {
  return {
    id: raw.id ?? raw._id,
    number: raw.number ?? raw.tableNumber ?? "",
    area: raw.area ?? "MAIN DINING",
    status: raw.status ?? "available",
    capacity: raw.capacity ?? 2,
    timeInfo: raw.timeInfo ?? raw.time_info ?? "",
    booking: raw.booking ?? null,
    priority: !!raw.priority,
  };
}

/**
 * Calls the backend to delete a table.
 * DELETE {API_BASE}/tables/:id
 */
async function deleteTable(id) {
  const response = await fetch(`${API_BASE}/tables/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // Add an Authorization header here if your API requires one, e.g.:
      // 'Authorization': `Bearer ${authToken.value}`,
    },
  });

  // Some APIs return 204 No Content on successful delete — don't try to parse JSON in that case.
  if (!response.ok) {
    let detail = "";
    try {
      const body = await response.json();
      detail = body?.message || body?.error || "";
    } catch {
      // response had no JSON body
    }
    throw new Error(
      detail || `Failed to delete table (status ${response.status})`,
    );
  }

  return true;
}

async function confirmDelete(table) {
  const ok = window.confirm(
    `Delete Table ${table.number}? This cannot be undone.`,
  );
  if (!ok) return;

  errorMessage.value = "";
  deletingId.value = table.id;

  try {
    await deleteTable(table.id);
    const index = tables.findIndex((t) => t.id === table.id);
    if (index !== -1) tables.splice(index, 1);
  } catch (err) {
    errorMessage.value =
      err.message || "Something went wrong while deleting the table.";
  } finally {
    deletingId.value = null;
  }
}

onMounted(fetchTables);
</script>
