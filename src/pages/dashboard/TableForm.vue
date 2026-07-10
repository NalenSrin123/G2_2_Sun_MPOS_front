<template>
    <form class="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8" @submit.prevent="createTable(false)">
        <div class="w-full">

            <!-- Form Table -->
            <div class="p-6 bg-white grid gap-6 rounded-xl w-full border border-gray-100 shadow-sm">
                <h3 class="text-2xl font-semibold text-gray-800">
                    General Information
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">

                    <div class="grid gap-2">
                        <label class="text-md font-medium text-gray-700">
                            Table Number or Name
                        </label>
                        <div class="w-full h-14 rounded-xl border border-gray-300 bg-[#F4FBF4] flex items-center px-4">
                            <input v-model.trim="tableNumber" type="text" placeholder="# e.g. Table 1 or Terrace-01"
                                class="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400">
                        </div>
                    </div>

                </div>

                <p v-if="errorMessage" class="text-sm font-medium text-red-600">
                    {{ errorMessage }}
                </p>
                <p v-if="successMessage" class="text-sm font-medium text-[#006C49]">
                    {{ successMessage }}
                </p>
            
                <!-- Active -->
                <div class="p-4 flex items-center justify-between border border-gray-200 bg-[#F4FBF4] rounded-xl">
                    <div>
                        <h5 class="text-md font-bold text-gray-800">
                            Active Status
                        </h5>
                        <span class="text-xs text-gray-400">
                            Table will be visible in the floor plan immediately.
                        </span>
                    </div>
                    <button type="button" @click="isActive = !isActive"
                        class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 cursor-pointer"
                        :class="isActive ? 'bg-[#006C49]' : 'bg-gray-300'">
                        <span
                            class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300"
                            :class="isActive ? 'translate-x-6' : 'translate-x-1'" />
                    </button>
                </div>

            </div>

            <!-- Button footer -->
            <div class="w-full flex flex-col sm:flex-row gap-4 mt-6">
                <button type="button" @click="createTable(true)" :disabled="isSubmitting"
                    class="w-full h-14 border border-[#006C49] rounded-xl font-bold text-md text-[#006C49] hover:bg-green-50 transition flex items-center justify-center px-4 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                    {{ isSubmitting ? "Saving..." : "Save and Add Another" }}
                </button>

                <button type="submit" :disabled="isSubmitting"
                    class="w-full h-14 bg-[#006C49] text-white font-bold text-md rounded-xl hover:bg-[#005439] transition flex items-center justify-center gap-2 px-4 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    {{ isSubmitting ? "Creating..." : "Create Table" }}
                </button>
            </div>

        </div>
    </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api";

const router = useRouter();

const tableNumber = ref("");
const isActive = ref(true);
const isSubmitting = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const getErrorMessage = (error) => {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    "Could not create table. Please try again."
  );
};

const createTable = async (addAnother = false) => {
  if (!tableNumber.value) {
    errorMessage.value = "Please enter a table number.";
    return;
  }

  const normalizedTableNumber = /^\d+$/.test(tableNumber.value)
    ? Number(tableNumber.value)
    : tableNumber.value;

  isSubmitting.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    await api.post("/tables", {
      table_number: normalizedTableNumber,
    });

    if (addAnother) {
      tableNumber.value = "";
      successMessage.value = "Table created. You can add another one.";
      return;
    }

    router.push("/dashboard/tables");
  } catch (error) {
    console.error(error);
    errorMessage.value = getErrorMessage(error);
  } finally {
    isSubmitting.value = false;
  }
};
</script> 

