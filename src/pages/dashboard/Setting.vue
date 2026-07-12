<template>
  <div class="min-h-screen bg-[#f7f8f6] px-4 py-8 sm:px-8">
    <div class="mx-auto max-w-4xl">

      <!-- ═══════════════════════════════════════
           Profile Information
      ════════════════════════════════════════ -->
      <div class="rounded-2xl border border-[#e2e6e2] bg-white p-6 shadow-sm sm:p-8">

        <div class="mb-6 flex items-center gap-3">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edf7f1]">
            <svg class="h-5 w-5 text-[#1a6640]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 class="font-semibold text-[#111]">Profile Information</h2>
        </div>

        <!-- Avatar Row -->
        <div class="mb-6 flex items-center gap-4">
          <div class="relative shrink-0">
            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-[#1a6640] text-2xl font-bold text-white overflow-hidden sm:h-24 sm:w-24 sm:text-3xl">
              <img v-if="avatarUrl" :src="avatarUrl" class="h-full w-full object-cover" />
              <span v-else>{{ initials }}</span>
            </div>
            <label class="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#1a6640] text-white hover:bg-[#145233]">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input type="file" accept="image/*" class="hidden" @change="onAvatarChange" />
            </label>
          </div>
          <div>
            <p class="font-semibold text-[#111]">{{ form.name }}</p>
            <p class="text-sm text-[#888]">{{ form.email }}</p>
            <span class="mt-1 inline-block rounded-full bg-[#1a6640] px-3 py-0.5 text-xs font-medium text-white">
              {{ roleLabel }}
            </span>
          </div>
        </div>

        <!-- Form Fields -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div>
            <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#888]">Full Name</label>
            <input
              v-model="form.name"
              type="text"
              :disabled="!editing"
              class="w-full rounded-lg border border-[#d8ddd8] bg-[#fafbfa] px-4 py-2.5 text-sm text-[#111] outline-none transition focus:border-[#4caf82] disabled:bg-[#f4f4f4] disabled:text-[#aaa]"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#888]">Email Address</label>
            <input
              v-model="form.email"
              type="email"
              :disabled="!editing"
              class="w-full rounded-lg border border-[#d8ddd8] bg-[#fafbfa] px-4 py-2.5 text-sm text-[#111] outline-none transition focus:border-[#4caf82] disabled:bg-[#f4f4f4] disabled:text-[#aaa]"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#888]">Member Since</label>
            <div class="rounded-lg border border-[#e2e6e2] bg-[#f4f4f4] px-4 py-2.5 text-sm text-[#888]">
              {{ form.memberSince }}
            </div>
          </div>

          <div>
            <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#888]">User ID</label>
            <div class="rounded-lg border border-[#e2e6e2] bg-[#f4f4f4] px-4 py-2.5 font-mono text-sm text-[#888]">
              #USR-{{ String(authState.user?.users_id ?? '0001').padStart(4, '0') }}
            </div>
          </div>

        </div>

        <div v-if="profileSaved" class="mt-4 rounded-lg border border-[#4caf82] bg-[#edf7f1] px-4 py-3 text-sm text-[#1a6640]">
          ✓ Profile updated successfully.
        </div>

        <div class="mt-6 flex flex-wrap gap-3">
          <button
            v-if="!editing"
            @click="editing = true"
            class="flex items-center gap-2 rounded-lg bg-[#1a6640] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#145233]"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </button>
          <template v-else>
            <button
              @click="saveProfile"
              :disabled="loadingProfile"
              class="rounded-lg bg-[#1a6640] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#145233] disabled:opacity-60"
            >
              {{ loadingProfile ? 'Saving...' : 'Save Changes' }}
            </button>
            <button
              @click="editing = false"
              class="rounded-lg border border-[#d8ddd8] px-6 py-2.5 text-sm font-medium text-[#555] transition hover:bg-[#f4f4f4]"
            >
              Cancel
            </button>
          </template>
        </div>

      </div>

      <!-- ═══════════════════════════════════════
           Security
      ════════════════════════════════════════ -->
      <div class="mt-5 rounded-2xl border border-[#e2e6e2] bg-white p-6 shadow-sm">

        <div class="mb-5 flex items-center gap-3">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edf7f1]">
            <svg class="h-5 w-5 text-[#1a6640]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h2 class="font-semibold text-[#111]">Security</h2>
            <p class="text-xs text-[#888]">Manage your password and account security</p>
          </div>
        </div>

        <button
          @click="showPasswordForm = !showPasswordForm"
          class="flex w-full items-center justify-between rounded-lg border border-[#e2e6e2] p-4 text-left transition hover:bg-[#f7f8f6]"
        >
          <div class="flex items-center gap-3">
            <svg class="h-5 w-5 text-[#4caf82]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <div>
              <p class="text-sm font-medium text-[#333]">Change Password</p>
              <p class="text-xs text-[#aaa]">Update your password regularly for security</p>
            </div>
          </div>
          <svg class="h-4 w-4 text-[#aaa] transition-transform" :class="showPasswordForm ? 'rotate-90' : ''"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div v-if="showPasswordForm" class="mt-4 rounded-xl border border-[#e8ede8] bg-[#f7f8f6] p-5">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#888]">Current Password</label>
              <input v-model="passwordForm.current" type="password" placeholder="••••••••"
                class="w-full rounded-lg border border-[#d8ddd8] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#4caf82]" />
            </div>
            <div>
              <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#888]">New Password</label>
              <input v-model="passwordForm.newPass" type="password" placeholder="••••••••"
                class="w-full rounded-lg border border-[#d8ddd8] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#4caf82]" />
            </div>
            <div>
              <label class="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#888]">Confirm Password</label>
              <input v-model="passwordForm.confirm" type="password" placeholder="••••••••"
                :class="['w-full rounded-lg border px-4 py-2.5 text-sm outline-none bg-white',
                  passwordMismatch ? 'border-red-400 bg-red-50' : 'border-[#d8ddd8] focus:border-[#4caf82]']" />
              <p v-if="passwordMismatch" class="mt-1 text-xs text-red-500">Passwords do not match.</p>
            </div>
          </div>

          <div v-if="passwordError" class="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {{ passwordError }}
          </div>
          <div v-if="passwordSaved" class="mt-3 rounded-lg border border-[#4caf82] bg-[#edf7f1] px-4 py-3 text-sm text-[#1a6640]">
            ✓ Password changed successfully.
          </div>

          <div class="mt-4 flex gap-3">
            <button
              @click="changePassword"
              :disabled="!canChangePassword || loadingPassword"
              class="rounded-lg bg-[#1a6640] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#145233] disabled:opacity-50"
            >
              {{ loadingPassword ? 'Updating...' : 'Update Password' }}
            </button>
            <button
              @click="resetPasswordForm"
              class="rounded-lg border border-[#d8ddd8] px-5 py-2.5 text-sm font-medium text-[#555] transition hover:bg-[#f4f4f4]"
            >
              Cancel
            </button>
          </div>
        </div>

      </div>

      <!-- ═══════════════════════════════════════
           Account / Logout
      ════════════════════════════════════════ -->
      <div class="mt-5 rounded-2xl border border-[#e2e6e2] bg-white p-6 shadow-sm">

        <div class="mb-4 flex items-center gap-3">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4f4f4]">
            <svg class="h-5 w-5 text-[#555]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h2 class="font-semibold text-[#111]">Account</h2>
            <p class="text-xs text-[#888]">Manage your account actions</p>
          </div>
        </div>

        <button
          @click="onLogout"
          class="flex w-full items-center justify-between rounded-lg border border-[#e2e6e2] p-4 transition hover:border-red-200 hover:bg-red-50"
        >
          <div class="flex items-center gap-3">
            <svg class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <div class="text-left">
              <p class="text-sm font-medium text-red-500">Logout</p>
              <p class="text-xs text-[#aaa]">Sign out from your account</p>
            </div>
          </div>
          <svg class="h-4 w-4 text-[#aaa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>

      <p class="mt-8 text-center text-xs text-[#aaa]">© 2025 LuxeDine Pro. All rights reserved.</p>

    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuthStore from '@/stores/auth.store'

const router = useRouter()
const { state: authState, logout } = useAuthStore()
const currentAdmin = authState.admin ?? {}

const editing   = ref(false)
const avatarUrl = ref(null)

const form = reactive({
  name:        currentAdmin.name    ?? 'John Doe',
  email:       currentAdmin.email   ?? 'john@luxedine.com',
  role_id:     currentAdmin.role_id ?? 1,
  memberSince: currentAdmin.created_at
    ? new Date(currentAdmin.created_at).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
      })
    : '01 Jan 2024',
})

const roleLabel = computed(() => {
  const map = { 1: 'Admin', 2: 'Chef', 3: 'Customer' }
  return map[currentAdmin.role_id] ?? currentAdmin.role ?? 'User'
})

const initials = computed(() =>
  form.name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')
)

const onAvatarChange = (e) => {
  const file = e.target.files[0]
  if (file) avatarUrl.value = URL.createObjectURL(file)
}

const loadingProfile = ref(false)
const profileSaved   = ref(false)

const saveProfile = async () => {
  loadingProfile.value = true
  await api.put('/users/' + (currentAdmin.id ?? currentAdmin.users_id), {
    name:    form.name,
    email:   form.email,
    role_id: form.role_id,
  })
  loadingProfile.value = false
  profileSaved.value   = true
  editing.value        = false
  setTimeout(() => { profileSaved.value = false }, 3000)
}

const showPasswordForm = ref(false)
const passwordForm     = reactive({ current: '', newPass: '', confirm: '' })
const loadingPassword  = ref(false)
const passwordSaved    = ref(false)
const passwordError    = ref('')

const passwordMismatch = computed(() =>
  passwordForm.confirm.length > 0 && passwordForm.newPass !== passwordForm.confirm
)
const canChangePassword = computed(() =>
  passwordForm.current && passwordForm.newPass && passwordForm.confirm && !passwordMismatch.value
)

const changePassword = async () => {
  passwordError.value = ''
  if (!canChangePassword.value) return
  loadingPassword.value = true
  await api.put('/users/' + (currentAdmin.id ?? currentAdmin.users_id) + '/password', {
    current_password: passwordForm.current,
    new_password:     passwordForm.newPass,
  })
  loadingPassword.value = false
  passwordSaved.value   = true
  resetPasswordForm()
  setTimeout(() => { passwordSaved.value = false }, 3000)
}

const resetPasswordForm = () => {
  passwordForm.current   = ''
  passwordForm.newPass   = ''
  passwordForm.confirm   = ''
  passwordError.value    = ''
  showPasswordForm.value = false
}

const onLogout = () => {
  logout()
  router.push('/auth/login')
}
</script>
