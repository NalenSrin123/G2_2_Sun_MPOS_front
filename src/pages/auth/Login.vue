<template>
  <div class="w-full min-h-screen flex bg-[#f5f6f4]">

    <!-- LEFT SIDE -->
    <div class="hidden lg:block lg:w-[60%] relative overflow-hidden">
      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" alt="Restaurant"
        class="w-full h-full object-cover" />

      <div class="absolute inset-0 bg-black/40"></div>

      <!-- Quote -->
      <div class="absolute bottom-10 left-10 w-[600px] bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg">

        <h2 class="text-2xl lg:text-4xl italic font-semibold leading-relaxed mb-4 text-[#216946] tracking-wide">
          Precision in every service, luxury in every detail.
        </h2>

        <p class="text-gray-700 text-base lg:text-lg leading-7">
          Elevate your establishment's operational flow with our integrated
          management ecosystem.
        </p>

      </div>
    </div>

    <!-- RIGHT SIDE -->
    <div class="w-full lg:w-[40%] flex justify-center items-center px-6 lg:px-10 py-10">
      <div class="w-full max-w-[430px]">

        <!-- LOGO -->
        <div class="text-center mb-12">
          <div
            class="w-[75px] h-[75px] bg-[#54be8c] rounded-2xl flex justify-center items-center mx-auto mb-5 shadow-md">
            <i class="bi bi-fork-knife text-white text-3xl"></i>
          </div>

          <h1 class="text-4xl lg:text-5xl font-extrabold text-[#215c3e] mb-2 tracking-wide">
            LuxeDine Pro
          </h1>

          <p class="tracking-[4px] text-gray-500 text-xs lg:text-sm">
            MANAGEMENT SUITE
          </p>
        </div>

        <!-- WELCOME -->
        <div class="mb-6">
          <h2 class="text-3xl text-center lg:text-4xl font-bold text-gray-900 mb-3">
            Welcome back
          </h2>

          <p class="text-gray-500 leading-7 text-base text-center lg:text-lg">
            Enter your credentials to access the management suite
          </p>
        </div>

        <!-- FORM -->
        <form @submit.prevent="handleLogin" class="space-y-6">

          <!-- EMAIL -->
          <div>
            <label class="block mb-2 font-semibold text-gray-700 text-sm lg:text-base">
              Email Address
            </label>

            <div
              class="h-14 border border-gray-300 rounded-2xl flex items-center px-4 bg-white focus-within:border-[#2d724c] transition">
              <i class="bi bi-envelope text-gray-400 text-lg"></i>

              <input v-model="form.email" type="email" placeholder="manager@luxedine.com"
                class="w-full h-full outline-none px-4 bg-transparent text-sm lg:text-base" />
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

            <a href="/forgot-password" class="text-[#216946] font-semibold hover:underline">
              Forgot password?
            </a>
          </div>

          <!-- BUTTON -->
          <button type="submit" onclick="window.location.href='/confirm-otp'"
            class="w-full h-14 bg-[#2d724c] hover:bg-[#1f5d3b] rounded-2xl text-white text-base lg:text-lg font-semibold flex justify-center items-center gap-3 shadow-md transition">
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