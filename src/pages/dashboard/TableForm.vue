<template>
    <section class="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
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
                            <input type="text" placeholder="# e.g. Table 1 or Terrace-01"
                                class="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400">
                        </div>
                    </div>

                    

                </div>

                

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
                    <button @click="isActive = !isActive"
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
                <button type="button"
                    class="w-full h-14 border border-[#006C49] rounded-xl font-bold text-md text-[#006C49] hover:bg-green-50 transition flex items-center justify-center px-4 cursor-pointer">
                    Save and Add Another
                </button>

                <button type="button"
                    class="w-full h-14 bg-[#006C49] text-white font-bold text-md rounded-xl hover:bg-[#005439] transition flex items-center justify-center gap-2 px-4 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Create Table
                </button>
            </div>

        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
const isActive = ref(true)
</script>
