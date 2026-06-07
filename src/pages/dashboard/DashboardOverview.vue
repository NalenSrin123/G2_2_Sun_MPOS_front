<template>
  <main class="flex-1 bg-emerald-50 h-[calc(100vh-84px)] overflow-hidden p-4">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-3"
    >
      <div>
        <h1 class="text-2xl font-semibold">Executive Overview</h1>
        <p class="text-gray-500">Real-time performance metrics</p>
      </div>

      <button
        class="bg-emerald-700 hover:bg-emerald-800 transition cursor-pointer text-white px-4 py-3 rounded-xl flex items-center gap-2 w-fit"
      >
        <Download class="w-5 h-5" />
        Export PDF
      </button>
    </div>

    <!-- Metric Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
      <div
        v-for="card in cards"
        :key="card.title"
        class="bg-white rounded-2xl p-4 shadow-sm"
      >
        <div class="flex justify-between items-start">
          <div class="p-2 rounded-xl" :class="card.iconBg">
            <component
              :is="card.icon"
              class="w-4 h-4"
              :class="card.iconColor"
            />
          </div>

          <span class="font-semibold" :class="card.trendColor">
            {{ card.trend }}
          </span>
        </div>

        <p class="uppercase text-sm text-gray-500 mt-3">
          {{ card.title }}
        </p>

        <h2 class="text-2xl font-bold mt-1">
          {{ card.value }}
        </h2>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="bg-white rounded-2xl p-4 shadow-sm mt-3 h-105">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-2xl font-semibold">Sales & Revenue</h2>
          <p class="text-gray-500">Weekly trend analysis</p>
        </div>

        <div class="flex gap-2 bg-emerald-100 rounded-lg p-1.5">
          <button
            @click="selectedPeriod = 'week'"
            class="cursor-pointer px-3 py-1 rounded-lg font-semibold transition"
            :class="
              selectedPeriod === 'week'
                ? 'bg-white text-emerald-700'
                : 'text-gray-400'
            "
          >
            Week
          </button>

          <button
            @click="selectedPeriod = 'month'"
            class="cursor-pointer px-3 py-1 rounded-lg font-semibold transition"
            :class="
              selectedPeriod === 'month'
                ? 'bg-white text-emerald-700'
                : 'text-gray-400'
            "
          >
            Month
          </button>
        </div>
      </div>

      <!-- Chart -->
      <div class="h-78">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";

import {
  Download,
  Wallet,
  ClipboardList,
  Armchair,
  BarChart3,
} from "lucide-vue-next";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// toggle state
const selectedPeriod = ref("week");

// weekly data
const weekData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  values: [120, 190, 170, 220, 260, 240, 300],
};

// monthly data
const monthData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  values: [1200, 1500, 1800, 2100, 2600, 3000],
};

const chartData = computed(() => {
  const data = selectedPeriod.value === "week" ? weekData : monthData;

  return {
    labels: data.labels,
    datasets: [
      {
        label:
          selectedPeriod.value === "week"
            ? "Weekly Revenue"
            : "Monthly Revenue",

        data: data.values,
        borderColor: "#10b981",
        backgroundColor: "#10b981",
        tension: 0.4,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const cards = [
  {
    title: "Today's Sales",
    value: "$1,240.50",
    trend: "+12.5%",
    icon: Wallet,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    trendColor: "text-green-600",
  },
  {
    title: "Total Orders",
    value: "42",
    trend: "-2.4%",
    icon: ClipboardList,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
    trendColor: "text-red-500",
  },
  {
    title: "Active Tables",
    value: "12 / 20",
    trend: "60%",
    icon: Armchair,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-700",
    trendColor: "text-gray-500",
  },
  {
    title: "Avg Order Value",
    value: "$29.50",
    trend: "+5.1%",
    icon: BarChart3,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    trendColor: "text-green-600",
  },
];
</script>
