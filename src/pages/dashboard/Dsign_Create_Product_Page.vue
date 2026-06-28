<template>
  <main class="min-h-screen bg-[#f4f6f2] text-slate-800">

    <!-- Content -->
    <section class="px-6 py-6">
      <!-- Title -->
      <div
        class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
      >
        <div>
          <h1 class="text-xl font-semibold text-slate-800">
            Create New Menu Item
          </h1>

          <p class="mt-1 text-sm text-slate-500">
            Configure details, pricing, and availability for your menu.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button
            class="rounded-full border border-[#cfd5cc] bg-white px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
          type="button"  @click="createproduct"   class="flex items-center gap-2 rounded-full bg-[#0d7a4c] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#0b6c43]"
          >
            <i class="fa-regular fa-floppy-disk"></i>
            Save Item
          </button>
        </div>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <!-- Left -->
        <div class="space-y-5">
          <!-- Basic Information -->
          <section
            class="rounded-xl border border-[#dde2da] bg-white p-5"
          >
            <div class="mb-5 flex items-center gap-3">
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e7f3ec] text-[#0d7a4c]"
              >
                <i class="fa-solid fa-circle-exclamation"></i>
              </div>

              <h2 class="text-sm font-semibold text-slate-700">
                Basic Information
              </h2>
            </div>

            <div class="space-y-5">
              <!-- Item Name -->
              <div>
                <label class="mb-2 block text-sm text-slate-600">
                  Item Name
                </label>

                <input
                  type="text" v-model="Modal.product.name"
                  placeholder="e.g., Truffle Tagliatelle"
                  class="h-11 w-full rounded-lg border border-[#d7ddd4] bg-[#f8faf7] px-4 text-sm outline-none transition focus:border-[#0d7a4c]"
                />
              </div>

              <!-- Category -->
              <div>
                <label class="mb-2 block text-sm text-slate-600">
                  Category
                </label>

                <div class="relative">
                  <select
                  v-model="Modal.product.description"   class="h-11 w-full appearance-none rounded-lg border border-[#d7ddd4] bg-[#f8faf7] px-4 text-sm outline-none focus:border-[#0d7a4c]"
                  >
                    <option>Select a category</option>
                  </select>

                  <i
                    class="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400"
                  ></i>
                </div>
              </div>

              <!-- Description -->
              <div>
                <label class="mb-2 block text-sm text-slate-600">
                  Description
                </label>

                <textarea
                  rows="4"
                  placeholder="Describe the ingredients, preparation, and flavor profile..."
                  class="w-full rounded-lg border border-[#d7ddd4] bg-[#f8faf7] px-4 py-3 text-sm outline-none transition focus:border-[#0d7a4c]"
                ></textarea>
              </div>
            </div>
          </section>

          <!-- Pricing -->
          <section
            class="rounded-xl border border-[#dde2da] bg-white p-5"
          >
            <div class="mb-5 flex items-center gap-3">
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e7f3ec] text-[#0d7a4c]"
              >
                <i class="fa-solid fa-money-bill-wave"></i>
              </div>

              <h2 class="text-sm font-semibold text-slate-700">
                Pricing & Tax
              </h2>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <!-- Base Price -->
              <div>
                <label class="mb-2 block text-sm text-slate-600">
                  Base Price ($)
                </label>

                <div class="relative">
                  <span
                    class="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500"
                  >
                    $
                  </span>

                  <input
                    type="text" v-model="Modal.product.price"
                    placeholder="0.00"
                    class="h-11 w-full rounded-lg border border-[#d7ddd4] bg-[#f8faf7] pl-8 pr-4 text-sm outline-none focus:border-[#0d7a4c]"
                  />
                </div>
              </div>

              <!-- Tax -->
              <div>
                <label class="mb-2 block text-sm text-slate-600">
                  Tax Rate (%)
                </label>

                <div class="relative">
                  <input
                    type="text"
                    value="8.5"
                    class="h-11 w-full rounded-lg border border-[#d7ddd4] bg-[#f8faf7] px-4 pr-8 text-sm outline-none focus:border-[#0d7a4c]"
                  />

                  <span
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500"
                  >
                    %
                  </span>
                </div>
              </div>
            </div>

            <!-- Modifier -->
            <button
              class="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#cfd7cd] bg-[#f8faf7] text-sm font-medium text-[#0d7a4c] transition hover:bg-[#eef6f0]"
            >
              <i class="fa-solid fa-plus"></i>
              Add Price Modifiers (e.g., Gluten Free +$2.00)
            </button>
          </section>
        </div>

        <!-- Right -->
        <aside class="space-y-5">
          <!-- Product Media -->
          <section
            class="rounded-xl border border-[#dde2da] bg-white p-5"
          >
            <h2
              class="mb-5 text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Product Media
            </h2>

            <label
              class="flex h-55 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#ccd4c9] bg-[#f8faf7] text-center transition hover:border-[#0d7a4c]"
            >
              <input type="file"  @change="handleImage" class="hidden" />

              <div
                class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-[#ccd4c9] bg-white text-[#7b857b]"
              >
                <i class="fa-regular fa-image text-2xl"></i>
              </div>

              <p class="text-sm font-medium text-slate-600">
                Click to upload or drag & drop
              </p>

              <span class="mt-1 text-xs text-slate-400">
                Recommended: 1200×1200px
              </span>
            </label>
          </section>

          <!-- Visibility -->
          <section
            class="rounded-xl border border-[#dde2da] bg-white p-5"
          >
            <h2
              class="mb-5 text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Visibility & Status
            </h2>

            <div class="space-y-5">
              <!-- Order -->
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-slate-700">
                    Available for Order
                  </h3>

                  <p class="text-xs text-slate-400">
                    Display on digital menus
                  </p>
                </div>

                <label class="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" checked class="peer sr-only" />

                  <div
                    class="h-6 w-11 rounded-full bg-[#cfd7cd] transition peer-checked:bg-[#0d7a4c]"
                  ></div>

                  <div
                    class="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"
                  ></div>
                </label>
              </div>

              <!-- Featured -->
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-slate-700">
                    Featured Item
                  </h3>

                  <p class="text-xs text-slate-400">
                    Show in “Chef's Picks”
                  </p>
                </div>

                <label class="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" class="peer sr-only" />

                  <div
                    class="h-6 w-11 rounded-full bg-[#cfd7cd] transition peer-checked:bg-[#0d7a4c]"
                  ></div>

                  <div
                    class="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"
                  ></div>
                </label>
              </div>

              <!-- Labels -->
              <div>
                <h3 class="mb-3 text-sm font-medium text-slate-700">
                  Dietary Labels
                </h3>

                <div class="flex flex-wrap gap-2">
                  <span
                    class="rounded-full border border-[#bdd9c9] bg-[#eef7f1] px-3 py-1 text-xs text-[#0d7a4c]"
                  >
                    Vegan
                  </span>

                  <span
                    class="rounded-full border border-[#d7ddd4] bg-[#f7f8f6] px-3 py-1 text-xs text-slate-600"
                  >
                    Gluten-Free
                  </span>

                  <span
                    class="rounded-full border border-[#d7ddd4] bg-[#f7f8f6] px-3 py-1 text-xs text-slate-600"
                  >
                    Contains Nuts
                  </span>

                  <span
                    class="rounded-full border border-[#bdd9c9] bg-[#eef7f1] px-3 py-1 text-xs text-[#0d7a4c]"
                  >
                    Spicy
                  </span>

                  <button
                    class="rounded-full border border-dashed border-[#d7ddd4] px-3 py-1 text-xs text-slate-500"
                  >
                    + Add New
                  </button>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </section>
  </main>
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";

const Modal = reactive({
  product: {
    category_id: 1,
    name: "",
    description: "",
    price: "",
    image: null,
  },
});

const handleImage = (event) => {
  const file = event.target.files[0];

  if (file) {
    Modal.product.image = file;
  }
};

const createproduct = async () => {
  try {
    const formData = new FormData();

    formData.append("category_id", Modal.product.category_id);
    formData.append("name", Modal.product.name);
    formData.append("description", Modal.product.description);
    formData.append("price", Modal.product.price);

    if (Modal.product.image) {
      formData.append("image", Modal.product.image);
    }

    console.log("Sending Data:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await axios.post(
      "https://g2-sun-11-mpos-back-gjyx.onrender.com/api/v1/products",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);

    alert("Create Product Success");

    Modal.product.category_id = "";
    Modal.product.name = "";
    Modal.product.description = "";
    Modal.product.price = "";
    Modal.product.image = null;

  } catch (error) {
    console.error(error);

    if (error.response) {
      console.log(error.response.data);

      alert(
        error.response.data.message ||
        JSON.stringify(error.response.data.errors)
      );
    } else {
      alert("Network Error");
    }
  }
};
</script>

<style scoped>
input,
textarea,
select,
button {
  transition: all 0.2s ease;
}
</style>