<template>
  <main class="min-h-screen bg-[#f4f6f2] text-slate-800">
    <form @submit.prevent="createproduct">
      <section class="px-6 py-6">

        <!-- Header -->
        <div
          class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h1 class="text-2xl font-semibold">
              Create New Menu Item
            </h1>

            <p class="mt-1 text-sm text-slate-500">
              Configure details, pricing, and availability for your menu.
            </p>
          </div>

          <div class="flex gap-3">
            <button
              type="reset"
              class="rounded-full border border-gray-300 px-5 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              class="rounded-full bg-[#0d7a4c] px-5 py-2 text-white hover:bg-[#0b6c43]"
            >
              Save Item
            </button>
          </div>
        </div>

        <!-- Main Layout -->
        <div class="grid gap-6 lg:grid-cols-3">

          <!-- LEFT -->
          <div class="space-y-6 lg:col-span-2">

            <!-- Basic Information -->
            <section class="rounded-xl border bg-white p-5">

              <h2 class="mb-5 text-lg font-semibold">
                Basic Information
              </h2>

              <div class="space-y-5">

                <!-- Name -->
                <div>
                  <label class="mb-2 block text-sm">
                    Item Name
                  </label>

                  <input
                    v-model="Modal.product.name"
                    type="text"
                    placeholder="Item name"
                    class="w-full rounded-lg border px-4 py-3"
                  >
                </div>

                <!-- Category -->
                <div>
                  <label class="mb-2 block text-sm">
                    Category
                  </label>

                  <select
                    v-model="Modal.product.category_id"
                    class="w-full rounded-lg border px-4 py-3"
                  >
                    <option disabled value="">
                      Select Category
                    </option>

                    <option value="1">Coffee</option>
                    <option value="2">Tea</option>
                    <option value="3">Dessert</option>
                  </select>
                </div>

                <!-- Description -->
                <div>
                  <label class="mb-2 block text-sm">
                    Description
                  </label>

                  <textarea
                    v-model="Modal.product.description"
                    rows="5"
                    class="w-full rounded-lg border px-4 py-3"
                  ></textarea>
                </div>

              </div>

            </section>

            <!-- Pricing -->
            <section class="rounded-xl border bg-white p-5">

              <h2 class="mb-5 text-lg font-semibold">
                Pricing
              </h2>

              <div>

                <label class="mb-2 block text-sm">
                  Price ($)
                </label>

                <input
                  type="number"
                  step="0.01"
                  v-model="Modal.product.price"
                  class="w-full rounded-lg border px-4 py-3"
                >

              </div>

            </section>

          </div>

          <!-- RIGHT -->
          <aside class="space-y-6">

            <!-- Image -->
            <section class="rounded-xl border bg-white p-5">

              <h2 class="mb-4 text-lg font-semibold">
                Product Image
              </h2>

              <label
                class="flex h-64 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed"
              >
                <input
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="handleImage"
                >

                <div class="text-center">

                  <img
                    v-if="previewImage"
                    :src="previewImage"
                    class="mx-auto h-40 rounded-lg object-cover"
                  >

                  <div v-else>

                    <i class="fa-solid fa-image text-4xl text-gray-400"></i>

                    <p class="mt-3">
                      Click to Upload
                    </p>

                  </div>

                </div>

              </label>

            </section>

            <!-- Status -->
            <section class="rounded-xl border bg-white p-5">

              <h2 class="mb-4 text-lg font-semibold">
                Status
              </h2>

              <div class="space-y-4">

                <label class="flex items-center justify-between">
                  <span>Available</span>
                  <input type="checkbox">
                </label>

                <label class="flex items-center justify-between">
                  <span>Featured</span>
                  <input type="checkbox">
                </label>

              </div>

            </section>

          </aside>

        </div>

      </section>
    </form>
  </main>
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";
import api from "../../services/api";
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

    const response = await api.post(
      "/products",
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
	.error {
		color: red;
	}
</style>
