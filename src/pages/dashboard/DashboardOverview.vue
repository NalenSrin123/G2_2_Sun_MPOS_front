<template>
  <main class="flex-1 bg-emerald-50 min-h-screen p-6 overflow-auto">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6"
    >
      <div>
        <h1 class="text-3xl font-bold">Executive Overview</h1>

        <p class="text-gray-500">Real-time performance metrics</p>
      </div>

      <button
        class="bg-emerald-700 hover:bg-emerald-800 transition cursor-pointer text-white px-5 py-3 rounded-xl flex items-center gap-2 w-fit"
      >
        <Download class="w-5 h-5" />
        Export PDF
      </button>
    </div>

    <!-- Metric Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div
        v-for="card in cards"
        :key="card.title"
        class="bg-white rounded-2xl p-6 shadow-sm"
      >
        <div class="flex justify-between items-start">
          <div class="p-3 rounded-xl" :class="card.iconBg">
            <component
              :is="card.icon"
              class="w-5 h-5"
              :class="card.iconColor"
            />
          </div>

          <span class="font-semibold" :class="card.trendColor">
            {{ card.trend }}
          </span>
        </div>

        <p class="uppercase text-sm text-gray-500 mt-5">
          {{ card.title }}
        </p>

        <h2 class="text-3xl font-bold mt-2">
          {{ card.value }}
        </h2>
      </div>
    </div>

    <!-- Chart -->
    <div class="bg-white rounded-2xl p-6 shadow-sm mt-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-semibold">Sales & Revenue</h2>

          <p class="text-gray-500">Weekly trend analysis</p>
        </div>

        <div class="flex gap-2 bg-emerald-50 rounded-lg p-1.5">
          <button
            class="cursor-pointer px-3 py-1 rounded-lg bg-white text-emerald-700 font-semibold"
          >
            Week
          </button>

          <button
            class="cursor-pointer px-3 py-1 rounded-lg text-gray-400 font-semibold"
          >
            Month
          </button>
        </div>
      </div>
      <!-- chat section -->
      <div class="bg-white rounded-2xl p-6 shadow-sm mt-6">
        <div class="flex justify-between mb-6">
          <div>
            <h2 class="text-2xl font-semibold">Sales & Revenue</h2>

            <p class="text-gray-500">Weekly trend analysis</p>
          </div>
        </div>

        <div class="h-72">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>

    <!-- Orders -->
    <div class="bg-white rounded-2xl shadow-sm mt-6 overflow-hidden">
      <div class="p-6 flex justify-between items-start">
        <div>
          <h2 class="text-2xl font-semibold">Recent Orders</h2>

          <p class="text-gray-500">Live feed of floor activity</p>
        </div>

        <button class="p-2 rounded-lg hover:bg-slate-100 transition">
          <Filter class="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full min-w-175">
          <thead class="bg-emerald-50">
            <tr class="text-left text-gray-500">
              <th class="p-4">Order ID</th>
              <th>Table</th>
              <th>Items</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="order in orders" :key="order.id" class="p-4">
              <td class="p-4">
                {{ order.id }}
              </td>

              <td>{{ order.table }}</td>

              <td>{{ order.items }}</td>

              <td>
                <span
                  class="px-3 py-1 rounded-full text-sm"
                  :class="
                    order.status === 'Success'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  "
                >
                  {{ order.status }}
                </span>
              </td>

              <td class="font-semibold">
                {{ order.amount }}
              </td>

              <td>
                <Eye
                  class="w-5 h-5 text-gray-500 hover:text-emerald-600 cursor-pointer"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup>
import {
  Eye,
  Download,
  Wallet,
  ClipboardList,
  Armchair,
  BarChart3,
  Filter,
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

const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

  datasets: [
    {
      label: "Revenue",
      data: [120, 190, 170, 220, 260, 240, 300],
      borderColor: "#10b981",
      backgroundColor: "#10b981",
      tension: 0.4,
    },
  ],
};

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

const orders = [
  {
    id: "#LX-9241",
    table: "Table 08",
    items: "3 items",
    status: "Success",
    amount: "$142.00",
  },
  {
    id: "#LX-9242",
    table: "Table 04",
    items: "5 items",
    status: "Pending",
    amount: "$218.50",
  },
  {
    id: "#LX-9243",
    table: "Table 12",
    items: "1 item",
    status: "Success",
    amount: "$45.00",
  },
];
</script>
