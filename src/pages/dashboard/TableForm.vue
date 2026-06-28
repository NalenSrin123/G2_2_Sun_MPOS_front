<template>
  <section class="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="w-full">
      <!-- Form Table -->
      <form @submit.prevent="onCreateTable" class="space-y-6">
        <div
          class="p-6 bg-white grid gap-6 rounded-xl w-full border border-gray-100 shadow-sm"
        >
          <h3 class="text-2xl font-semibold text-gray-800">
            General Information
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div class="grid gap-2">
              <label class="text-md font-medium text-gray-700">
                Table Number or Name
              </label>
              <div
                class="w-full h-14 rounded-xl border border-gray-300 bg-[#F4FBF4] flex items-center px-4"
              >
                <input
                  type="text"
                  v-model="tableNumber"
                  placeholder="# e.g. Table 1 or Terrace-01"
                  class="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div class="grid gap-2">
              <label class="text-md font-medium text-gray-700">
                Seating Capacity
              </label>
              <div
                class="relative h-14 rounded-xl border border-gray-300 bg-[#F4FBF4]"
              >
                <div
                  class="absolute inset-y-0 left-4 flex items-center pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.8"
                    class="w-5 h-5 text-gray-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7 11V7a2 2 0 114 0v4m6 0V7a2 2 0 10-4 0v4M5 11h14v4H5v-4zm2 4v2m10-2v2"
                    />
                  </svg>
                </div>
                <input
                  type="number"
                  v-model.number="seatingCapacity"
                  placeholder="Number of guests"
                  class="w-full h-full pl-12 pr-4 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 appearance-none"
                />
              </div>
            </div>
          </div>

          <div class="grid gap-2">
            <label class="text-md font-medium text-gray-700">
              Floor Zone
            </label>
            <div class="relative">
              <select
                v-model="zone"
                class="w-full h-14 rounded-xl border border-gray-300 bg-[#F4FBF4] px-4 pr-10 appearance-none focus:outline-none text-gray-700"
              >
                <option value="Zone 1">Zone 1</option>
                <option value="Zone 2">Zone 2</option>
              </select>
              <div
                class="absolute inset-y-0 right-3 flex items-center pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Active -->
          <div
            class="p-4 flex items-center justify-between border border-gray-200 bg-[#F4FBF4] rounded-xl"
          >
            <div>
              <h5 class="text-md font-bold text-gray-800">Active Status</h5>
              <span class="text-xs text-gray-400">
                Table will be visible in the floor plan immediately.
              </span>
            </div>
            <button
              type="button"
              @click="isActive = !isActive"
              class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 cursor-pointer"
              :class="isActive ? 'bg-[#006C49]' : 'bg-gray-300'"
            >
              <span
                class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300"
                :class="isActive ? 'translate-x-6' : 'translate-x-1'"
              />
            </button>
          </div>
        </div>

        <!-- Button footer -->
        <div class="w-full flex flex-col sm:flex-row gap-4 mt-6">
          <button
            type="button"
            class="w-full h-14 border border-[#006C49] rounded-xl font-bold text-md text-[#006C49] hover:bg-green-50 transition flex items-center justify-center px-4 cursor-pointer"
          >
            Save and Add Another
          </button>

          <button
            type="submit"
            :disabled="loading"
            class="w-full h-14 bg-[#006C49] disabled:opacity-60 text-white font-bold text-md rounded-xl hover:bg-[#005439] transition flex items-center justify-center gap-2 px-4 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            {{ loading ? "Creating..." : "Create Table" }}
          </button>
        </div>

        <div class="space-y-2">
          <p v-if="message" class="text-sm text-emerald-700">{{ message }}</p>
          <p v-if="error" class="text-sm text-red-700">{{ error }}</p>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { createTable } from "@/services/api";

const tableNumber = ref("");
const seatingCapacity = ref(1);
const zone = ref("Zone 1");
const isActive = ref(true);
const loading = ref(false);
const message = ref("");
const error = ref("");

async function onCreateTable() {
  message.value = "";
  error.value = "";

  if (!tableNumber.value) {
    error.value = "Please enter a table number.";
    return;
  }

  loading.value = true;

  try {
    const payload = {
      table_number: Number(tableNumber.value),
    };
    const response = await createTable(payload);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      error.value =
        errorData?.message || `Request failed with status ${response.status}`;
      return;
    }

    const data = await response.json();
    message.value = `Table created successfully (ID: ${data.id}).`;
    tableNumber.value = "";
    seatingCapacity.value = 1;
    zone.value = "Zone 1";
    isActive.value = true;
  } catch (err) {
    error.value = err?.message || "Network error. Check your API URL.";
  } finally {
    loading.value = false;
  }
}
</script>
