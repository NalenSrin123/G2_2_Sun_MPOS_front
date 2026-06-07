<template>
    <section class="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div class="mx-auto flex max-w-6xl flex-col justify-center gap-6 lg:flex-row">
        <div class="w-full lg:w-[576px] flex-shrink-0">

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

                    <div class="grid gap-2">
                        <label class="text-md font-medium text-gray-700">
                            Seating Capacity
                        </label>
                        <div class="relative h-14 rounded-xl border border-gray-300 bg-[#F4FBF4]">
                            <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="1.8" class="w-5 h-5 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M7 11V7a2 2 0 114 0v4m6 0V7a2 2 0 10-4 0v4M5 11h14v4H5v-4zm2 4v2m10-2v2" />
                                </svg>
                            </div>
                            <input type="number" placeholder="Number of guests"
                                class="w-full h-full pl-12 pr-4 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 appearance-none">
                        </div>
                    </div>

                </div>

                <div class="grid gap-2">
                    <label class="text-md font-medium text-gray-700">
                        Floor Zone
                    </label>
                    <div class="relative">
                        <select
                            class="w-full h-14 rounded-xl border border-gray-300 bg-[#F4FBF4] px-4 pr-10 appearance-none focus:outline-none text-gray-700">
                            <option>Select a zone</option>
                            <option>Zone 1</option>
                            <option>Zone 2</option>
                        </select>
                        <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

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
                        class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300"
                        :class="isActive ? 'bg-[#006C49]' : 'bg-gray-300'">
                        <span
                            class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300"
                            :class="isActive ? 'translate-x-6' : 'translate-x-1'" />
                    </button>
                </div>

            </div>

            <div class="w-full flex flex-col sm:flex-row gap-4 mt-6">
                <button type="button" 
                    class="w-full sm:w-56 h-14 border border-[#006C49] rounded-xl font-bold text-md text-[#006C49] hover:bg-green-50 transition flex items-center justify-center px-4">
                    Save and Add Another
                </button>

                <button type="button" 
                    class="w-full sm:flex-1 h-14 bg-[#006C49] text-white font-bold text-md rounded-xl hover:bg-[#005439] transition flex items-center justify-center gap-2 px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Create Table
                </button>
            </div>

        </div>

        <div class="w-full lg:w-[335px] flex-shrink-0">
            <div class="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div class="text-center">
                    <h3 class="text-2xl font-semibold text-gray-800">
                        QR Code Identity
                    </h3>
                    <div class="mt-2 text-xs font-bold text-gray-500 leading-relaxed">
                        <p>A unique code for guests to browse and</p>
                        <p>order directly from this table</p>
                    </div>
                </div>

                <div class="w-full max-w-[285px] mx-auto p-2 mt-2">
                    <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                            alt="QR" class="w-full object-contain mix-blend-multiply">
                        <div class="text-center mt-3">
                            <h5 class="font-bold text-2xl text-gray-800">
                                T-NEW
                            </h5>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4 w-full mt-4">
                    <button class="flex items-center justify-center gap-2 px-4 py-2.5 w-full border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V3.75m0 12.75 4.5-4.5m-4.5 4.5-4.5-4.5M3.75 20.25h16.5" />
                        </svg>
                        Download
                    </button>

                    <button class="flex items-center justify-center gap-2 px-4 py-2.5 w-full border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 9V4.875A2.625 2.625 0 019.375 2.25h5.25A2.625 2.625 0 0117.25 4.875V9m-10.5 0h10.5m-10.5 0A2.25 2.25 0 004.5 11.25v4.5A2.25 2.25 0 006.75 18h10.5a2.25 2.25 0 002.25-2.25v-4.5A2.25 2.25 0 0017.25 9m-10.5 0h10.5M9 15.75h6" />
                        </svg>
                        Print
                    </button>
                </div>
            </div>

            <div class="p-6 bg-[#ECF4F7] rounded-xl mt-6 border border-sky-100">
                <h5 class="text-md font-bold text-gray-800">
                    Zone Capacity Context
                </h5>
                <div class="mt-4">
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">Current Table</span>
                        <span class="font-semibold text-gray-700">4 / 5</span>
                    </div>

                    <div class="mt-3">
                        <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-[#006C49] rounded-full transition-all duration-500" style="width: 80%"></div>
                        </div>
                        <div class="flex justify-between mt-1 text-[11px] text-gray-400 font-medium">
                            <span>0%</span>
                            <span>80%</span>
                            <span>100%</span>
                        </div>
                    </div>

                    <p class="mt-4 text-[11px] leading-relaxed text-gray-500">
                        Adding this table will bring the
                        <span class="font-semibold text-gray-700">"Main Dining Hall"</span> to
                        <span class="font-bold text-[#006C49]">80% capacity</span> based on fire marshal limits.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
const isActive = ref(true)
</script>
