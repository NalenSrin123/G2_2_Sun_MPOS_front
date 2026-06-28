<template>
  <div class="min-h-full bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
    <main class="mx-auto max-w-6xl">
      <div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-medium uppercase tracking-wide text-emerald-600">
            Menu Management
          </p>
          <h2 class="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
            Create New Category
          </h2>
          <p class="mt-2 max-w-2xl text-sm text-slate-500">
            Add a menu category with its image, display order, and visibility.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section class="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 px-5 py-4 sm:px-6">
            <h3 class="text-base font-semibold text-slate-900">
              Category Details
            </h3>
          </div>

          <form @submit.prevent="submitForm" class="space-y-6 p-5 sm:p-6">
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <label class="mb-2 block text-sm font-medium text-slate-700">
                  Category Name
                </label>

                <input
                  v-model="categoryName"
                  type="text"
                  placeholder="e.g. Starters, Main Course"
                  class="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-slate-700">
                  Display Order
                </label>

                <input
                  v-model="displayOrder"
                  type="number"
                  min="1"
                  class="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <h4 class="text-sm font-semibold text-slate-800">
                      Customer Menu
                    </h4>
                    <p class="mt-1 text-xs text-slate-500">
                      Show this category to customers.
                    </p>
                  </div>

                  <label class="relative inline-flex cursor-pointer items-center">
                    <input
                      v-model="isVisible"
                      type="checkbox"
                      class="peer sr-only"
                    />
                    <span
                      class="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-emerald-600"
                    />
                    <span
                      class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                v-model="description"
                rows="4"
                placeholder="Describe this category..."
                class="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Category Banner Image
              </label>

              <button
                type="button"
                @click="openFile"
                class="group relative flex h-56 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-center transition hover:border-emerald-500 hover:bg-emerald-50"
              >
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Category preview"
                  class="absolute inset-0 h-full w-full object-cover"
                />

                <span
                  v-if="imagePreview"
                  class="absolute inset-0 bg-slate-950/30"
                />

                <span
                  class="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-sm"
                >
                  +
                </span>
                <span class="relative mt-3 text-sm font-semibold text-slate-800">
                  {{ imagePreview ? "Change Image" : "Upload Image" }}
                </span>
                <span class="relative mt-1 text-xs text-slate-500">
                  PNG, JPG, or JPEG. Recommended 1200 x 400px.
                </span>
              </button>

              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="onImageChange"
              />
            </div>

            <div class="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                @click="resetForm"
                class="h-11 rounded-lg border border-slate-300 px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="h-11 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Create Category
              </button>
            </div>
          </form>
        </section>

        <aside class="lg:sticky lg:top-6 lg:self-start">
          <section class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div class="border-b border-slate-100 px-5 py-4">
              <h3 class="text-base font-semibold text-slate-900">
                Quick Preview
              </h3>
            </div>

            <div class="p-5">
              <div class="overflow-hidden rounded-lg border border-slate-200">
                <div class="flex h-36 items-center justify-center overflow-hidden bg-slate-100">
                  <img
                    v-if="imagePreview"
                    :src="imagePreview"
                    alt="Category preview"
                    class="h-full w-full object-cover"
                  />

                  <span v-else class="text-sm text-slate-400">
                    Preview Image
                  </span>
                </div>

                <div class="space-y-3 border-l-4 border-emerald-500 p-4">
                  <div class="flex items-start justify-between gap-3">
                    <h4 class="min-w-0 break-words text-base font-semibold text-slate-900">
                      {{ categoryName || "New Category Name" }}
                    </h4>

                    <span class="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                      #{{ displayOrder }}
                    </span>
                  </div>

                  <p class="break-words text-sm leading-6 text-slate-500">
                    {{ description || "Description placeholder..." }}
                  </p>

                  <span
                    class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                    :class="
                      isVisible
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    "
                  >
                    {{ isVisible ? "ACTIVE" : "HIDDEN" }}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </aside>
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
const fileInput = ref(null);
const imageFile = ref(null);
const imagePreview = ref("");

const openFile = () => {
  fileInput.value?.click();
};

const onImageChange = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  imageFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

const resetForm = () => {
  categoryName.value = "";
  description.value = "";
  displayOrder.value = 1;
  isVisible.value = true;
  imageFile.value = null;
  imagePreview.value = "";

  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const submitForm = () => {
  alert("Category created successfully!");
  resetForm();
};
</script>
