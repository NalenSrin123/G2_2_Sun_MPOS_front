<template>
  <div class="min-h-screen bg-emerald-50 p-3 sm:p-4 md:p-6">
    <div class="max-w-7xl mx-auto bg-white rounded-3xl shadow-sm p-4 sm:p-6">

      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6"
      >
        <div>
          <p class="text-sm text-gray-400 uppercase">
            Menu Management / Categories
          </p>

          <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">
            Categories List
          </h1>
        </div>

        <RouterLink
          to="/categories/new"
          class="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center hover:bg-emerald-800 transition"
        >
          <PlusIcon class="w-6 h-6" />
        </RouterLink>
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

        <div class="bg-white shadow rounded-2xl p-5">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-gray-500 text-sm">
                Total Categories
              </p>

              <h2 class="text-3xl font-bold text-cyan-600">
                {{ categories.length }}
              </h2>
            </div>

            <TagIcon class="w-10 h-10 text-cyan-500" />
          </div>
        </div>

        <div class="bg-white shadow rounded-2xl p-5">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-gray-500 text-sm">
                Active Categories
              </p>

              <h2 class="text-3xl font-bold text-green-600">
                {{ activeCount }}
              </h2>
            </div>

            <CheckCircleIcon class="w-10 h-10 text-green-500" />
          </div>
        </div>

      </div>

      <!-- Mobile Cards -->
      <div class="md:hidden space-y-4">

        <div
          v-for="category in categories"
          :key="category.id"
          class="bg-white border rounded-2xl p-4 shadow-sm"
        >
          <div class="flex items-center gap-3 mb-3">

            <img
              :src="category.image"
              :alt="category.name"
              class="w-16 h-16 rounded-xl object-cover"
            />

            <div>
              <h3 class="font-semibold text-lg text-gray-800">
                {{ category.name }}
              </h3>

              <p class="text-sm text-gray-500">
                Category #{{ category.id }}
              </p>
            </div>

          </div>

          <p class="text-gray-600 mb-3">
            {{ category.description }}
          </p>

          <div class="flex justify-between items-center mb-3">

            <div>
              <span class="text-gray-500 text-sm">
                Items:
              </span>

              <span class="font-semibold ml-1">
                {{ category.items }}
              </span>
            </div>

            <span
              class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
              :class="
                category.active
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              "
            >
              <CheckCircleIcon
                v-if="category.active"
                class="w-4 h-4"
              />

              <XCircleIcon
                v-else
                class="w-4 h-4"
              />

              {{ category.active ? "Active" : "Inactive" }}
            </span>

          </div>

          <div class="flex justify-end gap-4">

            <button
              class="text-emerald-600 hover:text-emerald-800 transition"
            >
              <PencilSquareIcon class="w-5 h-5" />
            </button>

            <button
              class="text-red-500 hover:text-red-700 transition"
              @click="deleteCategory(category.id)"
            >
              <TrashIcon class="w-5 h-5" />
            </button>

          </div>
        </div>

      </div>

      <!-- Desktop Table -->
      <div
        class="hidden md:block overflow-x-auto border rounded-2xl"
      >
        <table class="w-full min-w-[900px]">

          <thead class="bg-emerald-50 border-b border-gray-300">
            <tr>

              <th class="px-6 py-4 text-left uppercase text-xs font-semibold">
                Category
              </th>

              <th class="px-6 py-4 text-left uppercase text-xs font-semibold">
                Description
              </th>

              <th class="px-6 py-4 text-left uppercase text-xs font-semibold">
                Items
              </th>

              <th class="px-6 py-4 text-left uppercase text-xs font-semibold">
                Status
              </th>

              <th class="px-6 py-4 text-center uppercase text-xs font-semibold">
                Actions
              </th>

            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100">

            <tr
              v-for="category in categories"
              :key="category.id"
              class="hover:bg-emerald-50 transition"
            >

              <!-- Category -->
              <td class="px-6 py-4">

                <div class="flex items-center gap-4">

                  <img
                    :src="category.image"
                    :alt="category.name"
                    class="w-14 h-14 rounded-xl object-cover"
                  />

                  <div>

                    <div class="flex items-center gap-2">
                      <TagIcon class="w-5 h-5 text-emerald-600" />

                      <h3 class="font-semibold text-gray-800">
                        {{ category.name }}
                      </h3>
                    </div>

                    <p class="text-sm text-gray-500">
                      Category #{{ category.id }}
                    </p>

                  </div>

                </div>

              </td>

              <!-- Description -->
              <td class="px-6 py-4 text-gray-600">
                {{ category.description }}
              </td>

              <!-- Items -->
              <td class="px-6 py-4">
                <span class="font-semibold">
                  {{ category.items }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-6 py-4">

                <span
                  class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                  :class="
                    category.active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  "
                >
                  <CheckCircleIcon
                    v-if="category.active"
                    class="w-4 h-4"
                  />

                  <XCircleIcon
                    v-else
                    class="w-4 h-4"
                  />

                  {{ category.active ? "Active" : "Inactive" }}
                </span>

              </td>

              <!-- Actions -->
              <td class="px-6 py-4">

                <div class="flex justify-center gap-4">

                  <button
                    class="text-emerald-600 hover:text-emerald-800 transition"
                  >
                    <PencilSquareIcon class="w-5 h-5" />
                  </button>

                  <button
                    class="text-red-500 hover:text-red-700 transition"
                    @click="deleteCategory(category.id)"
                  >
                    <TrashIcon class="w-5 h-5" />
                  </button>

                </div>

              </td>

            </tr>

          </tbody>

        </table>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../../services/api";
import {
  PlusIcon,
  TagIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";

const categories = ref([]);

const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    console.log(response.data);
    categories.value= response.data.data;
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
    getCategories();
})

const activeCount = computed(
  () => categories.value.filter((item) => item.active).length
);

/*import baseUrl*/ 
import api from "../../services/api";
/*
  fetch api method delete category
*/ 
const deleteCategory = async (id) => {
    // confirm delete check
    const isConfirmed = confirm("Are you sure you want to delete this Category?");
    if (!isConfirmed) {
      return;
    }

    try {
        await api.delete(`/categories/${id}`);

        console.log("Category deleted successfully");
        
    } catch (error) {
      console.error("Delete failed", error);
      
    }
}
</script>