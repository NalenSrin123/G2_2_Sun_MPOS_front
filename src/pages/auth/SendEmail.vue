<template>
  <div
    class="min-h-screen bg-white flex flex-col items-center justify-center px-4"
  >
    <!-- Logo -->
    <div class="flex flex-col items-center gap-1 mb-8">
      <div
        class="w-14 h-14 bg-green-200 flex items-center justify-center rounded-2xl text-green-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
          <path
            d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"
          />
        </svg>
      </div>

      <h1 class="text-2xl font-bold text-green-800">
        LuxeDine Pro
      </h1>

      <p class="text-sm text-gray-500">
        Restaurant Management Suite
      </p>
    </div>

    <!-- Card -->
    <div
      class="w-full max-w-md bg-white rounded-2xl shadow-lg border border-green-100 p-8"
    >
      <h2 class="text-2xl font-bold text-gray-900">
        Forgot Password?
      </h2>

      <p class="text-sm text-gray-500 mt-2 leading-relaxed">
        Enter your email address and we'll send you a verification code
        to reset your password.
      </p>

      <form @submit.prevent="sendResetCode" class="mt-6">
        <!-- Email -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>

          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="manager@luxedine.com"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full mt-6 bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
        >
          <span>Send Reset Code</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 8L22 12L18 16" />
            <path d="M2 12H22" />
          </svg>
        </button>
      </form>

      <!-- Divider -->
      <div class="my-6 border-t border-gray-100"></div>

      <!-- Back -->
      <div class="text-center">
        <RouterLink
          to="/login"
          class="text-sm text-green-700 hover:text-green-800 hover:underline"
        >
          ← Back to Login
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");

const sendResetCode = () => {
  console.log("Sending reset code to:", email.value);
};
</script>