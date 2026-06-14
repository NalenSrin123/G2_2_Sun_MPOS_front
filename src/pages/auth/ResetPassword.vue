<template>
  <div class="min-h-screen relative flex flex-col items-center justify-between bg-[radial-gradient(circle_at_top_left,#e6f4f1,#f4faf8_60%)] px-4 py-8 font-sans antialiased text-slate-800">
    
    <div class="hidden md:block"></div>

    <div class="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-10 z-10 my-auto">
      
      <div class="flex justify-center mb-5">
        <div class="w-12 h-12 bg-[#026945] rounded-xl flex items-center justify-center text-white shadow-sm">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v10m0 0a4 4 0 100 8 4 4 0 000-8M12 2a4 4 0 014 4v4M12 2a4 4 0 00-4 4v4"></path>
          </svg>
        </div>
      </div>

      <h1 class="text-2xl font-bold text-center text-[#025c3d] tracking-tight mb-2">
        Set New Password
      </h1>
      <p class="text-center text-xs text-gray-500 leading-relaxed px-4 mb-8">
        Create a secure password to protect your account
      </p>

      <form @submit.prevent="handleReset" class="space-y-5">
        
        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1.5">
            New Password
          </label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="New password"
              class="w-full border border-gray-200 rounded-lg pl-3 pr-10 py-2.5 text-sm tracking-wide focus:outline-none focus:border-[#026945] focus:ring-1 focus:ring-[#026945]"
            />
            <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </button>
          </div>
          <div class="flex justify-between items-center mt-1 px-0.5">
            <span class="text-[10px] font-medium text-gray-500">Weak</span>
            <span class="text-[10px] text-gray-400">8+ characters</span>
          </div>
        </div>

        <div class="!mt-4">
          <label class="block text-xs font-medium text-slate-600 mb-1.5">
            Confirm New Password
          </label>
          <div class="relative">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm New Password"
              class="w-full border border-gray-200 rounded-lg pl-3 pr-10 py-2.5 text-sm tracking-wide focus:outline-none focus:border-[#026945] focus:ring-1 focus:ring-[#026945]"
            />
            <i @click="showPassword = !showPassword" :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
                class="text-gray-500 cursor-pointer text-lg"></i>
          </div>
        </div>

        <p v-if="errorMessage" class="text-red-500 text-xs mt-2">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="w-full bg-[#016a45] hover:bg-[#015437] text-white py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-1.5 mt-6 shadow-sm"
        >
          <span>Reset Password</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </form>

      <div class="text-center mt-6">
        <a href="/Login" class="inline-flex items-center space-x-1 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </a>
      </div>
    </div>

    <footer class="text-[10px] text-gray-400 mt-8">
      © 2024 LuxeDine Pro. Precision Hospitality Management.
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";

const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");

// Reactive state parameters for view toggles
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const handleReset = () => {
  errorMessage.value = "";

  if (!password.value || !confirmPassword.value) {
    errorMessage.value = "Please fill all fields";
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match";
    return;
  }

  alert("Password reset successfully");
};
</script>