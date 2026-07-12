<template>
  <main class="min-h-screen bg-[#f4f6f2] text-slate-800">
    <form @submit.prevent="createProduct">
      <section class="px-6 py-6">

        <!-- Header -->
        <div
          class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
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
              type="reset"
              class="rounded-full border border-gray-300 px-5 py-2 hover:bg-gray-100"
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
                    v-model=product.name
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
                      v-model=product.category_id
                      class="w-full rounded-lg border px-4 py-3"
                    >
                      <option disabled selected value="">
                        Select Category
                      </option>

                      <option
                        :value=cate.id
                        v-for="cate in categories">{{ cate.name }}
                      </option>
                      <option value="">bay cha</option>
                      <option value="">bay sgor</option>
                      <option value="">bay m</option>
                    </select>
                  

                </div>

                <!-- Description -->
                <div>
                  <label class="mb-2 block text-sm">
                    Description
                  </label>

                  <textarea
                    v-model=product.description
                    rows="5"
                    class="w-full rounded-lg border px-4 py-3"
                  ></textarea>
                </div>

              </div>

            </section>

            <!-- Pricing -->
            <div class="rounded-xl border bg-white p-5">

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
                  v-model=product.price
                  class="w-full rounded-lg border px-4 py-3"
                >
                <h2 class="mb-5 text-lg font-semibold">
                Stork
              </h2>

              <div>

                <label class="mb-2 block text-sm">
                  Quantity
                </label>
                 <input
                  type="number"
                  step="0.01"
                  v-model=product.stock
                  class="w-full rounded-lg border px-4 py-3"
                >
              </div>
              </div>
            </div>
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
               v-model=product.image
               type="text"
                class="w-full rounded-lg border px-4 py-3"
                placeholder=""
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
import { computed, reactive } from "vue";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "../../services/api";

const router = useRouter();
let isEdit=false;
let categories = ref([]);
const isEditing = computed(() => false);
const goBack = () => {
router.push("/dashboard/products");
};
const route = useRoute();
const id=route.query.id;
if(id){
isEdit=true
}else{
isEdit=false
}
const product=ref({
name:"",
category_id:"",
description:"",
price:0,
stock:0,
image: "",
is_active: true
})
const getCategory=async()=>{
try{
const res= await api.get("/categories");
categories.value=res.data.data;
}catch(error){
console.error(error);
}
}
onMounted(()=>{
getCategory();
})
const createProduct=async()=>{
let res;
try{
const payload={ ... product.value}
if(!isEdit){
res= await api.post('/products',payload);
}else{
res= await api.put(`/products/${id}`,payload);
}
if(res.data.success){
router.push('/dashboard/products')
}
}catch(error){
console.log(error);
}
}
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