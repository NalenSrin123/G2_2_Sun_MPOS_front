<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-3 sm:px-4 lg:px-6 py-6">

      <!-- Main Card -->
      <div class="w-full bg-white rounded-3xl shadow-sm p-4 md:p-6 lg:p-8">

        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <p class="text-xs md:text-sm text-gray-400 uppercase">
              Menu Management / Categories List
            </p>

            <h1
              class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800"
            >
              Categories List
            </h1>
          </div>

          <RouterLink
            to="/categories/new"
            class="w-12 h-12 md:w-14 md:h-14
                   rounded-full bg-emerald-700
                   text-white text-2xl md:text-3xl
                   shadow-lg hover:bg-emerald-800
                   flex items-center justify-center"
          >
            +
          </RouterLink>
        </div>

        <!-- Statistics -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

          <div class="bg-gray-50 rounded-2xl p-4 border">
            <p class="text-sm text-gray-500">
              Total Categories
            </p>

            <h2 class="text-3xl font-bold text-cyan-600">
              {{ categories.length }}
            </h2>
          </div>

          <div class="bg-gray-50 rounded-2xl p-4 border">
            <p class="text-sm text-gray-500">
              Active Categories
            </p>

            <h2 class="text-3xl font-bold text-green-600">
              {{ activeCount }}
            </h2>
          </div>

        </div>

        <!-- Category List -->
        <div
          class="grid grid-cols-1
                 md:grid-cols-2
                 xl:grid-cols-3
                 gap-5"
        >

          <div
            v-for="category in categories"
            :key="category.id"
            class="bg-white border rounded-2xl p-4
                   shadow-sm hover:shadow-lg
                   transition duration-300"
          >

            <div class="flex items-center gap-4">

              <img
                :src="category.image"
                :alt="category.name"
                class="w-16 h-16 md:w-20 md:h-20
                       rounded-xl object-cover"
              />

              <div class="flex-1">
                <h3
                  class="font-semibold text-gray-800
                         text-base md:text-lg"
                >
                  {{ category.name }}
                </h3>

                <p class="text-sm text-gray-500">
                  {{ category.items }} Items
                </p>

                <p class="text-xs text-gray-400">
                  {{ category.description }}
                </p>
              </div>

              <span
                class="w-3 h-3 rounded-full"
                :class="
                  category.active
                    ? 'bg-green-500'
                    : 'bg-gray-400'
                "
              ></span>

            </div>

          </div>

        </div>

      </div>

      <!-- Floating Button -->
      <RouterLink
        to="/categories/new"
        class="fixed bottom-4 right-4
               md:bottom-8 md:right-8
               w-14 h-14 md:w-16 md:h-16
               rounded-full bg-emerald-700
               text-white text-3xl
               shadow-xl hover:bg-emerald-800
               flex items-center justify-center"
      >
        +
      </RouterLink>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const categories = ref([
  {
    id: 1,
    name: "Appetizers",
    items: 14,
    description: "Starters & Snacks",
    active: true,
    image:
      "https://img.freepik.com/free-photo/close-up-view-delicious-food-arrangement_23-2148510885.jpg",
  },
  {
    id: 2,
    name: "Main Course",
    items: 22,
    description: "Signature Dishes",
    active: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb0p9DwR9EHm8b4EDwxq9ncxB4JDzFi2ZSNI7loWtIoUNlQ1sa0Dp57LE&s",
  },
  {
    id: 3,
    name: "Desserts",
    items: 8,
    description: "Sweet Treats",
    active: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHKNljXf15f9PNMcPIbVbhvwwWTK-wrgq7U9Kf81WOOOhLingyne8zFEY&s",
  },
  {
    id: 4,
    name: "Beverages",
    items: 12,
    description: "Hot & Cold",
    active: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-fOQqU6NAUnOO2p_RxRLLvXZ_zFXbzL8kECvsM3-T9fi4DLpAJ1esnA&s",
  },
  {
    id: 5,
    name: "Seasonal Special",
    items: 0,
    description: "Hidden from Menu",
    active: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSntBBf2Pz1BSUxdDuYc-udoXkyYNWG4R1lZNnH61W4D6g09KWLQgV7zrM&s",
  },
  {
  id: 6,
  name: "Asian Food",
  items: 18,
  description: "Authentic Asian Flavors",
  active: true,
  image: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
  },
]);

const activeCount = computed(() =>
  categories.value.filter(item => item.active).length
);
</script>
