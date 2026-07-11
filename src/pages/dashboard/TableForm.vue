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

          <div class="grid gap-2 w-full">
            <div class="grid gap-2">
              <label class="text-md font-medium text-gray-700">
                Table Number
              </label>
              <div
                class="w-full h-14 rounded-xl border border-gray-300 bg-[#F4FBF4] flex items-center px-4"
              >
                <input
                  v-model.number="tableNumber"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="e.g. 1"
                  required
                  class="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Button footer -->
        <div class="w-full flex mt-6">
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
import { useRouter } from "vue-router";
import { createTable } from "@/services/api";

const router = useRouter();
const tableNumber = ref("");
const loading = ref(false);
const message = ref("");
const error = ref("");

async function onCreateTable() {
  message.value = "";
  error.value = "";

  const number = Number(tableNumber.value);
  if (!Number.isInteger(number) || number < 1) {
    error.value = "Please enter a valid table number.";
    return;
  }

  loading.value = true;

  try {
    const payload = {
      table_number: number,
    };
    const data = await createTable(payload);
    message.value = `Table created successfully (ID: ${data.id}).`;
    tableNumber.value = "";
    await router.push("/dashboard/tables");
  } catch (err) {
    error.value = err.response?.data?.message || err.message || "Unable to create table.";
  } finally {
    loading.value = false;
  }
}
</script>
