<template>
  <div class="min-h-full bg-gray-50 px-4 py-6 text-on-background sm:px-6 lg:px-8">
    <!-- Main Content -->
    <main>
      <div class="mx-auto max-w-6xl">
        <!-- Header -->
        <div class="mb-8">
          <h2 class="text-3xl font-bold">Create New Category</h2>
          <p class="text-gray-500">
            Organize your menu by adding specific categories for your dishes.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Form -->
          <div class="lg:col-span-2">
            <section class="bg-white rounded-xl shadow-sm border p-6">
              <form @submit.prevent="submitForm" class="space-y-6">
                <!-- Category Name -->
                <div>
                  <label class="block mb-2 font-medium"> Category Name </label>

                  <input
                    v-model="categoryName"
                    type="text"
                    placeholder="e.g. Starters, Main Course"
                    class="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                <!-- Description -->
                <div>
                  <label class="block mb-2 font-medium"> Description </label>

                  <textarea
                    v-model="description"
                    rows="3"
                    placeholder="Describe this category..."
                    class="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                <!-- Upload -->
                <div>
                  <label class="block mb-2 font-medium">
                    Category Banner Image
                  </label>

                  <div
                    class="h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center"
                  >
                    <span class="text-5xl mb-2">🖼️</span>
                    <p>Drag and drop or click to upload</p>
                    <p class="text-sm text-gray-500">
                      Recommended: 1200 × 400px
                    </p>
                  </div>
                </div>

                <!-- Display Order -->
                <div>
                  <label class="block mb-2 font-medium"> Display Order </label>

                  <input
                    v-model="displayOrder"
                    type="number"
                    min="1"
                    class="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                <!-- Visibility -->
                <div
                  class="flex items-center justify-between border rounded-lg p-4"
                >
                  <div>
                    <h4 class="font-medium">Visible on Customer Menu</h4>
                    <p class="text-sm text-gray-500">
                      Show this category to diners
                    </p>
                  </div>

                  <input v-model="isVisible" type="checkbox" class="w-5 h-5" />
                </div>

                <!-- Buttons -->
                <div class="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    @click="resetForm"
                    class="px-6 py-3 border rounded-full"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    class="px-6 py-3 bg-emerald-600 text-white rounded-full"
                  >
                    Create Category
                  </button>
                </div>
              </form>
            </section>
          </div>

          <!-- Live Preview -->
          <div>
            <section class="bg-white rounded-xl border shadow-sm p-4">
              <h3 class="font-semibold text-emerald-600 mb-4">Quick Preview</h3>

              <div class="border rounded-lg overflow-hidden">
                <div class="h-24 bg-gray-200 flex items-center justify-center">
                  Preview Image
                </div>

                <div class="p-4 border-l-4 border-emerald-500">
                  <div class="flex justify-between">
                    <h4 class="font-semibold">
                      {{ categoryName || "New Category Name" }}
                    </h4>

                    <span class="text-sm text-gray-500">
                      Order: {{ displayOrder }}
                    </span>
                  </div>

                  <p class="text-sm text-gray-500 mt-2">
                    {{ description || "Description placeholder..." }}
                  </p>

                  <span
                    class="inline-block mt-3 px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-700"
                  >
                    {{ isVisible ? "ACTIVE" : "HIDDEN" }}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

const categoryName = ref("");
const description = ref("");
const displayOrder = ref(1);
const isVisible = ref(true);

const resetForm = () => {
  categoryName.value = "";
  description.value = "";
  displayOrder.value = 1;
  isVisible.value = true;
};

const submitForm = () => {
  alert("Category created successfully!");
  resetForm();
};
</script>
