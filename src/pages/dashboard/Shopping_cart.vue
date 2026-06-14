<template>
  <div class="bg-green-50 min-h-screen p-3 md:p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl md:text-3xl font-bold text-green-900">
        LuxeDine
      </h1>
    </div>

    <!-- Title -->
    <h2 class="text-xl md:text-2xl font-bold mb-4">
      Your Selection
    </h2>

    <!-- Cart Items -->
     
    <div class="space-y-4 ">
       
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="bg-white rounded-2xl shadow p-3 md:p-4 flex items-center gap-3 md:gap-4 border-l-4 border-green-900"
      >
        <!-- Image -->
        <img
          :src="item.image"
          :alt="item.name"
          class="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover"
        />

        <!-- Product Info -->
        <div>
          <h3 class="font-bold text-base md:text-2xl">
            {{ item.name }}
          </h3>

          <p class="text-gray-500 text-xs md:text-lg">
            {{ item.description }}
          </p>

          <p
            class="text-green-900 font-bold text-sm md:text-xl mt-1 md:mt-2"
          >
            ${{ item.price }}
          </p>
        </div>

        <!-- Right Side -->
        <div class="ml-auto flex flex-col items-center gap-3">
          <!-- Delete -->
          <button
            @click="deleteItem(item.id)"
            class="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full hover:bg-gray-200 flex items-center justify-center"
          >
            <i class="bi bi-trash"></i>
          </button>

          <!-- Qty -->
          <div
            class="bg-gray-300 h-8 md:h-12 px-3 md:px-5 rounded-full flex items-center gap-3 md:gap-5"
          >
            <button
              @click="decreaseQty(item)"
              class="font-bold text-sm md:text-xl"
            >
              -
            </button>

            <span class="font-medium text-sm md:text-lg">
              {{ item.qty }}
            </span>

            <button
              @click="increaseQty(item)"
              class="font-bold text-sm md:text-xl"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary -->
    <div class="bg-white rounded-2xl shadow p-4 md:p-6 mt-6">
      <h2 class="text-lg md:text-2xl font-bold mb-4">
        Order Summary
      </h2>

      <div
        class="flex justify-between mb-2 text-sm md:text-lg"
      >
        <span>Subtotal</span>
        <span>${{ subtotal.toFixed(2) }}</span>
      </div>

      <div
        class="flex justify-between mb-2 text-sm md:text-lg"
      >
        <span>Service Fee (10%)</span>
        <span>${{ serviceFee.toFixed(2) }}</span>
      </div>

      <div
        class="flex justify-between mb-4 text-sm md:text-lg"
      >
        <span>Tax (8%)</span>
        <span>${{ tax.toFixed(2) }}</span>
      </div>

      <hr class="mb-4" />

      <div
        class="flex justify-between text-xl md:text-4xl font-bold text-green-800"
      >
        <span>Total</span>
        <span>${{ total.toFixed(2) }}</span>
      </div>
    </div>

    <!-- Button -->
    <button
      class="w-full mt-6 bg-green-900 hover:bg-green-800 text-white py-3 md:py-4 rounded-2xl font-semibold text-sm md:text-xl"
    >
      Place Order
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const cartItems = ref([
  {
    id: 1,
    name: "Wagyu Ribeye Steak",
    description: "Medium Rare • Truffle Butter",
    price: 128,
    qty: 1,
    image:
      "https://i.pinimg.com/1200x/15/c9/fa/15c9fa79aa679c64554a2769ddc29d76.jpg",
  },
  {
    id: 2,
    name: "Truffle Fettuccine",
    description: "Fresh Pasta • Parmesan",
    price: 42,
    qty: 1,
    image:
      "https://i.pinimg.com/1200x/e4/4e/51/e44e51d2b35aa90f31f9e5f9df8a836e.jpg",
  },
]);

const increaseQty = (item) => {
  item.qty++;
};

const decreaseQty = (item) => {
  if (item.qty > 1) item.qty--;
};

const deleteItem = (id) => {
  cartItems.value = cartItems.value.filter(
    (item) => item.id !== id
  );
};

const subtotal = computed(() =>
  cartItems.value.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )
);

const serviceFee = computed(() => subtotal.value * 0.1);
const tax = computed(() => subtotal.value * 0.08);

const total = computed(
  () => subtotal.value + serviceFee.value + tax.value
);
</script>