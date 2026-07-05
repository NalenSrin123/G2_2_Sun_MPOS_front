<template>
  <main class="min-h-screen bg-[#f4f6f2] text-slate-800">
    <form class="px-6 py-6" @submit.prevent="createproduct">
      <div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 class="text-2xl font-semibold">
            {{ isEditing ? "Edit Product" : "Create New Menu Item" }}
          </h1>
          <p class="mt-1 text-sm text-slate-500">
            Configure details, pricing, and availability for your menu.
          </p>
        </div>

        <div class="flex gap-3">
          <button
            type="button"
            class="rounded-full border border-gray-300 px-5 py-2 hover:bg-gray-100"
            @click="goBack"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="rounded-full bg-[#0d7a4c] px-5 py-2 text-white hover:bg-[#0b6c43]"
          >
            {{ isEditing ? "Update Item" : "Save Item" }}
          </button>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <section class="space-y-6 lg:col-span-2">
          <div class="rounded-xl border bg-white p-5">
            <h2 class="mb-5 text-lg font-semibold">Basic Information</h2>

            <div class="space-y-5">
              <div>
                <label class="mb-2 block text-sm">Item Name</label>
                <input
                  v-model="Modal.product.name"
                  type="text"
                  placeholder="Item name"
                  class="w-full rounded-lg border px-4 py-3"
                >
              </div>

              <div>
                <label class="mb-2 block text-sm">Category</label>
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

              <div>
                <label class="mb-2 block text-sm">Description</label>
                <textarea
                  v-model="Modal.product.description"
                  rows="5"
                  placeholder="Describe the ingredients, preparation, and flavor profile..."
                  class="w-full rounded-lg border px-4 py-3"
                />
              </div>
            </div>
          </div>

          <div class="rounded-xl border bg-white p-5">
            <h2 class="mb-5 text-lg font-semibold">Pricing</h2>

            <label class="mb-2 block text-sm">Price ($)</label>
            <input
              v-model="Modal.product.price"
              type="number"
              step="0.01"
              min="0"
              class="w-full rounded-lg border px-4 py-3"
              placeholder="0.00"
            >
          </div>
        </section>

        <aside class="space-y-6">
          <section class="rounded-xl border bg-white p-5">
            <h2 class="mb-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Product Media
            </h2>

            <label
              class="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#ccd4c9] bg-[#f8faf7] text-center transition hover:border-[#0d7a4c]"
            >
              <input
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleImage"
              >

              <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-[#ccd4c9] bg-white text-[#7b857b]">
                <i class="fa-regular fa-image text-2xl"></i>
              </div>

              <p class="text-sm font-medium text-slate-600">
                Click to upload or drag & drop
              </p>

              <span class="mt-1 text-xs text-slate-400">
                Recommended: 1200×1200px
              </span>

              <span v-if="Modal.product.image" class="mt-3 text-xs text-emerald-700">
                {{ Modal.product.image.name }}
              </span>
            </label>
          </section>
        </aside>
      </div>
    </form>
  </main>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api";

const router = useRouter();

const Modal = reactive({
  product: {
    category_id: "",
    name: "",
    description: "",
    price: "",
    image: null,
  },
});

const isEditing = computed(() => false);

const goBack = () => {
  router.push("/dashboard/products");
};

const handleImage = (event) => {
  const file = event.target.files?.[0];

  if (file) {
    Modal.product.image = file;
  }
};

const resetForm = () => {
  Modal.product.category_id = "";
  Modal.product.name = "";
  Modal.product.description = "";
  Modal.product.price = "";
  Modal.product.image = null;
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

    await api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Create Product Success");
    resetForm();
    goBack();
  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(
        error.response.data.message ||
          JSON.stringify(error.response.data.errors)
      );
      return;
    }

    alert("Network Error");
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
