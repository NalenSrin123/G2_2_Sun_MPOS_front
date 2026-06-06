<template>
  <div class="w-full min-h-screen flex bg-[#f5f6f4]">

    <!-- LEFT SIDE -->
    <div class="hidden lg:block lg:w-[60%] relative overflow-hidden">

      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" alt="Restaurant"
        class="w-full h-full object-cover" />

      <div class="absolute inset-0 bg-black/40"></div>

      <!-- Quote -->
      <div class="absolute bottom-10 left-10 w-[600px] bg-white/80 backdrop-blur-md p-7 rounded-3xl">
        <h2 class="text-[#216946] text-4xl italic font-semibold leading-[1.4] mb-4">
          Precision in every service, luxury in every detail.
        </h2>

        <p class="text-gray-700 leading-8">
          Elevate your establishment's operational flow with our integrated
          management ecosystem.
        </p>
      </div>
    </div>

    <!-- RIGHT SIDE -->
    <div class="w-full lg:w-[40%] flex justify-center items-center px-8 py-10">
      <div class="w-full max-w-[430px]">

        <!-- LOGO -->
        <div class="text-center mb-14">

          <div class="w-[75px] h-[75px] bg-[#54be8c] rounded-2xl flex justify-center items-center mx-auto mb-5">
            <i class="bi bi-fork-knife text-white text-3xl"></i>
          </div>

          <h1 class="text-5xl font-bold text-[#215c3e] mb-2">
            LuxeDine Pro
          </h1>

          <p class="tracking-[5px] text-gray-500 text-sm">
            MANAGEMENT SUITE
          </p>
        </div>

        <!-- WELCOME -->
        <div class="mb-10">
          <h2 class="text-4xl font-bold text-gray-900 mb-3">
            Welcome back
          </h2>

          <p class="text-gray-500 leading-8 text-lg">
            Enter your credentials to access the management suite
          </p>
        </div>

        <!-- FORM -->
        <form class="space-y-5">

          <!-- EMAIL -->
          <div>
            <label class="block mb-2 font-medium text-gray-700">
              Email Address
            </label>

            <div class="h-14 border border-gray-300 rounded-2xl flex items-center px-4 bg-white">
              <i class="bi bi-envelope text-gray-500 text-lg"></i>

              <input v-model="form.email" type="email" placeholder="manager@luxedine.com"
                class="w-full h-full outline-none px-4 bg-transparent" />
            </div>
          </div>

          <!-- PASSWORD -->
          <div>
            <label class="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <div class="h-14 border border-gray-300 rounded-2xl flex items-center px-4 bg-white">
              <i class="bi bi-lock text-gray-500 text-lg"></i>

              <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                class="w-full h-full outline-none px-4 bg-transparent" />

              <!-- SHOW / HIDE -->
              <i @click="showPassword = !showPassword" :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
                class="text-gray-500 cursor-pointer text-lg"></i>
            </div>
          </div>

          <!-- OPTIONS -->
          <div class="flex justify-between items-center">

            <div class="flex items-center gap-2">
              <input type="checkbox" class="w-4 h-4" />
              <span class="text-gray-700">Remember me</span>
            </div>

            <a href="#" class="text-[#216946] font-semibold hover:underline">
              Forgot password?
            </a>
          </div>

          <!-- BUTTON -->
          <button
            class="w-full h-14 bg-[#2d724c] hover:bg-[#1f5d3b] transition rounded-2xl text-white text-lg font-medium flex justify-center items-center gap-3">
            Sign In
            <i class="bi bi-box-arrow-in-right"></i>
          </button>

        </form>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from "vue"

const showPassword = ref(false)

const form = reactive({
  email: "",
  password: ""
})
</script>