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
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
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
      <div class="flex items-center gap-2">
        <select
          v-model="selectedStatus"
          class="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none text-gray-600"
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <RouterLink
          to="create-table"
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

    <!-- Table Rows -->
    <div class="flex flex-col gap-2">
      <div
        v-for="table in filtered"
        :key="table.id"
        class="bg-white rounded-xl flex items-center overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <!-- Accent bar -->
        <div
          class="w-1.5 self-stretch flex-shrink-0"
          :class="statusAccent[table.status]"
        ></div>

        <!-- Table number -->
        <div class="px-5 py-4 min-w-25">
          <p class="text-[10px] text-gray-400 uppercase tracking-wide">Table</p>
          <p class="text-2xl font-mono font-medium leading-tight">
            {{ table.number }}
          </p>
          <a
            v-if="table.qr_code"
            :href="qrCodeUrl(table.qr_code)"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-1 inline-block text-xs font-medium text-emerald-700 hover:underline"
          >
            View QR code
          </a>
        </div>

        <!-- Badge -->
        <div class="min-w-[120px]">
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
            type="button"
            :disabled="deletingId === table.id"
            class="w-9 h-9 border border-red-200 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-50 disabled:opacity-50"
            :title="`Delete table ${table.number}`"
            @click="deleteTable(table)"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 6h18" />
              <path d="M8 6V4h8v2" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v5M14 11v5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../../services/api";
const search = ref("");
const selectedStatus = ref("");
const errorMessage = ref("");
const deletingId = ref(null);

const stats = computed(() => {
  return [
    {
      label: "Total Tables",
      value: tables.value.length,
      valueClass: "text-gray-900",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-700",
      icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    },
    {
      label: "Open",
      value: tables.value.filter((t) => t.status === "open").length,
      valueClass: "text-green-600",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      icon: '<circle cx="12" cy="12" r="10"/>',
    },
    {
      label: "Closed",
      value: tables.value.filter((t) => t.status === "closed").length,
      valueClass: "text-red-600",
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      icon: '<circle cx="12" cy="12" r="10"/>',
    },
  ];
});

const statusAccent = {
  open: "bg-green-500",
  closed: "bg-red-500",
};

const statusBadge = {
  open: "bg-green-100 text-green-700",
  closed: "bg-red-100 text-red-700",
};

const statusLabel = {
  open: "Open",
  closed: "Closed",
};

const actionLabel = {
  open: "Open",
  closed: "Closed",
};

const actionBtn = {
  open: "bg-green-600 text-white",
  closed: "bg-red-600 text-white",
};

const tables = ref([]);

const qrCodeUrl = (path) => {
  if (/^https?:\/\//i.test(path)) return path;

  const serverUrl = api.defaults.baseURL.replace(/\/api\/v1\/?$/, "");
  return `${serverUrl}/${String(path).replace(/^\/+/, "")}`;
};

const setTables = (data) => {
  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : [];

  tables.value = list.map((item) => ({
    id: item.id,
    number: item.table_number,
    status: (item.status || "closed").toLowerCase(),
    qr_code: item.qr_code,
  }));
};

const fetchTables = async () => {
  try {
    const res = await api.get("/tables");
    setTables(res.data);
    errorMessage.value = "";
  } catch (err) {
    console.error("Fetch tables error:", err);
    tables.value = [];
    errorMessage.value =
      err.response?.data?.message || "Unable to load tables. Please try again.";
  }
};

const deleteTable = async (table) => {
  if (!window.confirm(`Delete table ${table.number}?`)) return;

  deletingId.value = table.id;
  errorMessage.value = "";

  try {
    await api.delete(`/tables/${table.id}`);
    await fetchTables();
  } catch (err) {
    console.error(err);

    errorMessage.value =
      err.response?.data?.message || "Unable to delete table.";
  } finally {
    deletingId.value = null;
  }
};

onMounted(() => {
  fetchTables();
});

const filtered = computed(() => {
  return tables.value.filter((t) => {
    const matchStatus =
      !selectedStatus.value || t.status === selectedStatus.value;

    const matchSearch =
      !search.value ||
      String(t.number).toLowerCase().includes(search.value.toLowerCase());

    return matchStatus && matchSearch;
  });
});
</script>
