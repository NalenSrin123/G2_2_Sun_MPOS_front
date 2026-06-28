<template>
  <div class="min-h-screen bg-[#F6FFF8] p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-[#2D944E]">Users Management</h1>
        <p class="text-gray-500">
          Manage restaurant users, chefs and administrators
        </p>
      </div>

      <router-link
        to="/dashboard/user-form"
        class="bg-[#38CB66] hover:bg-[#2D944E] text-white px-5 py-3 rounded-xl font-medium transition inline-block text-center"
      >
        + Add User
      </router-link>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-2xl p-5 shadow">
        <p class="text-gray-500">Total Users</p>
        <h2 class="text-2xl font-bold text-[#2D944E]">120</h2>
      </div>

      <div class="bg-white rounded-2xl p-5 shadow">
        <p class="text-gray-500">Customers</p>
        <h2 class="text-2xl font-bold text-blue-500">90</h2>
      </div>
      <div class="bg-white rounded-2xl p-5 shadow">
        <p class="text-gray-500">Chefs</p>
        <h2 class="text-2xl font-bold text-orange-500">20</h2>
      </div>
      <div class="bg-white rounded-2xl p-5 shadow">
        <p class="text-gray-500">Admins</p>
        <h2 class="text-2xl font-bold text-red-500">10</h2>
      </div>
    </div>

    <div class="bg-white p-4 rounded-2xl shadow mb-6">
      <div class="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search user..."
          class="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#38CB66]"
        />

        <select
          class="border rounded-xl px-4 py-2 focus:outline-none"
        >
          <option>All Roles</option>
          <option>User</option>
          <option>Chef</option>
          <option>Admin</option>
        </select>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-[#D9FFE5]">
          <tr>
            <th class="text-left p-4">User</th>
            <th class="text-left p-4">Role</th>
            <th class="text-left p-4">Status</th>
            <th class="text-left p-4">Joined Date</th>
            <th class="text-center p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-b hover:bg-[#F6FFF8]"
          >
            <td class="p-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-12 h-12 bg-[#D9FFE5] rounded-full flex items-center justify-center text-xl"
                >
                  {{ user.avatar }}
                </div>

                <div>
                  <h3 class="font-semibold">
                    {{ user.name }}
                  </h3>
                  <p class="text-sm text-gray-500">
                    {{ user.email }}
                  </p>
                </div>
              </div>
            </td>

            <td class="p-4">
              <span
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="roleClass(user.role)"
              >
                {{ user.role }}
              </span>
            </td>

            <td class="p-4">
              <span
                class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
              >
                Active
              </span>
            </td>

            <td class="p-4">
              {{ user.joined }}
            </td>

            <td class="p-4">
              <div class="flex justify-center gap-2">
                <button
                  class="px-3 py-1 border border-[#2D944E] text-[#2D944E] rounded-lg hover:bg-[#D9FFE5]"
                >
                  View
                </button>

                <button
                  class="px-3 py-1 bg-[#38CB66] text-white rounded-lg hover:bg-[#2D944E]"
                >
                  Edit
                </button>

                <button
                  class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    role: "User",
    avatar: "👤",
    joined: "01 Jun 2026",
  },
  {
    id: 2,
    name: "Sarah Lee",
    email: "sarah@example.com",
    role: "Chef",
    avatar: "👨‍🍳",
    joined: "15 May 2026",
  },
  {
    id: 3,
    name: "Michael Admin",
    email: "admin@example.com",
    role: "Admin",
    avatar: "🛡️",
    joined: "20 Apr 2026",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    role: "User",
    avatar: "👨",
    joined: "12 Mar 2026",
  },
]

const roleClass = (role) => {
  switch (role) {
    case "Admin":
      return "bg-red-100 text-red-700"
    case "Chef":
      return "bg-orange-100 text-orange-700"
    default:
      return "bg-blue-100 text-blue-700"
  }
}
</script>