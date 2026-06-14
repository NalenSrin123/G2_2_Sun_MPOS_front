<template>
  <div class="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
    <div class="max-w-5xl mx-auto">

      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 mb-4 lg:mb-6 flex-wrap">
        <button
          @click="$router.back()"
          class="flex items-center gap-2 text-xs sm:text-sm text-gray-500 hover:text-green-700 transition-colors group"
        >
          <span class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:border-green-300 group-hover:bg-green-50 transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </span>
          <span class="hidden sm:inline">Back to Products</span>
          <span class="sm:hidden">Back</span>
        </button>
        <span class="text-gray-300 text-xs">/</span>
        <span class="text-xs sm:text-sm text-gray-400">{{ product.category }}</span>
        <span class="text-gray-300 text-xs">/</span>
        <span class="text-xs sm:text-sm text-green-700 font-medium truncate max-w-[120px] sm:max-w-none">{{ product.name }}</span>
      </div>

      <!-- Main Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <!-- MOBILE & TABLET: stacked layout -->
        <!-- LAPTOP+: side by side -->
        <div class="flex flex-col lg:grid lg:grid-cols-5">

          <!-- Image -->
          <div class="lg:col-span-2 relative h-56 sm:h-72 lg:h-auto lg:min-h-[500px]">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

            <!-- Chef's Pick -->
            <div class="absolute top-3 left-3 sm:top-4 sm:left-4">
              <span class="inline-flex items-center gap-1.5 bg-green-700 text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg shadow">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Chef's Pick
              </span>
            </div>

            <!-- Available -->
            <div class="absolute top-3 right-3 sm:top-4 sm:right-4">
              <span class="inline-flex items-center gap-1.5 bg-white/90 text-green-700 text-[10px] sm:text-xs font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg">
                <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Available
              </span>
            </div>

            <!-- Bottom overlay — hidden on mobile (shown below), visible on lg -->
            <div class="hidden lg:block absolute bottom-0 left-0 right-0 p-5">
              <p class="text-white/60 text-[10px] uppercase tracking-widest mb-1">{{ product.category }}</p>
              <h1 class="text-white text-xl font-bold leading-tight">{{ product.name }}</h1>
              <p class="text-white/65 text-sm mt-1">{{ product.subtitle }}</p>
            </div>
          </div>

          <!-- Detail -->
          <div class="lg:col-span-3 flex flex-col p-4 sm:p-6 lg:p-7 gap-4 lg:gap-5">

            <!-- Title (mobile/tablet only) -->
            <div class="lg:hidden">
              <h1 class="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{{ product.name }}</h1>
              <p class="text-xs sm:text-sm text-gray-400 mt-1">{{ product.subtitle }}</p>
            </div>

            <!-- Price + action icons -->
            <div class="flex items-start justify-between">
              <div>
                <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Unit Price</p>
                <div class="flex items-baseline gap-1">
                  <span class="text-3xl sm:text-4xl font-bold text-green-700">${{ product.price }}</span>
                  <span class="text-sm text-gray-400">.00</span>
                </div>
              </div>
              <div class="flex gap-2">
                <button class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <button class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50 transition-all">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                </button>
              </div>
            </div>

            <!-- Nutrition Stats -->
            <div class="grid grid-cols-3 gap-2 sm:gap-3">
              <div v-for="n in nutrition" :key="n.label"
                class="bg-gray-50 rounded-xl p-2.5 sm:p-3 text-center border border-gray-100">
                <div class="text-sm sm:text-base font-bold text-gray-900">{{ n.val }}</div>
                <div class="text-[10px] text-gray-400 uppercase tracking-wide mt-0.5">{{ n.label }}</div>
              </div>
            </div>

            <div class="h-px bg-gray-100" />

            <!-- Cook Level -->
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Cook Level</p>
              <div class="flex gap-2 flex-wrap">
                <button
                  v-for="opt in cookOptions"
                  :key="opt"
                  @click="selected = opt"
                  :class="[
                    'px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150',
                    selected === opt
                      ? 'bg-green-700 text-white shadow-md shadow-green-700/20'
                      : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-green-300 hover:bg-green-50 hover:text-green-700'
                  ]"
                >
                  {{ opt }}
                </button>
              </div>
            </div>

            <!-- Description -->
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Description</p>
              <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">{{ product.description }}</p>
            </div>

            <!-- Special Instructions -->
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Special Instructions</p>
              <textarea
                v-model="instructions"
                rows="3"
                placeholder="E.g. No salt, allergies, or sauce on the side..."
                class="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-gray-200 bg-gray-50 text-xs sm:text-sm text-gray-700 resize-none outline-none transition-colors focus:border-green-500 focus:bg-white placeholder-gray-300"
              />
            </div>

            <div class="flex-1" />

            <!-- Bottom action row -->
            <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
              <!-- Qty -->
              <div class="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl p-1">
                <button @click="decreaseQty"
                  class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-white hover:text-green-700 transition-all text-base sm:text-lg font-light">
                  −
                </button>
                <span class="text-sm font-bold text-gray-900 w-6 sm:w-8 text-center">{{ qty }}</span>
                <button @click="qty++"
                  class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-white hover:text-green-700 transition-all text-base sm:text-lg font-light">
                  +
                </button>
              </div>

              <!-- Total -->
              <div class="flex-1">
                <p class="text-[10px] text-gray-400">Total</p>
                <p class="text-base sm:text-xl font-bold text-gray-900">${{ totalPrice }}</p>
              </div>

              <!-- Add to Cart -->
              <button class="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 sm:px-6 lg:px-7 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-colors shadow-md shadow-green-700/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <span class="hidden sm:inline">Add to Cart</span>
                <span class="sm:hidden">Add</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 sm:mt-5">
        <div v-for="info in infoCards" :key="info.title"
          class="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 flex items-center gap-3">
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            :class="info.bg">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" :class="info.color" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="info.icon" />
          </div>
          <div>
            <p class="text-[10px] text-gray-400">{{ info.label }}</p>
            <p class="text-xs sm:text-sm font-semibold text-gray-800">{{ info.value }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const productId = route.params.id

const cookOptions = ['Medium Rare', 'Medium', 'Medium Well']
const selected = ref('Medium Rare')
const qty = ref(1)
const instructions = ref('')

const nutrition = [
  { label: 'Calories', val: '680 kcal' },
  { label: 'Protein', val: '52g' },
  { label: 'Fat', val: '48g' },
]

const infoCards = [
  {
    label: 'Preparation Time',
    value: '15–20 minutes',
    bg: 'bg-amber-50',
    color: 'text-amber-600',
    icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  },
  {
    label: 'Serving Size',
    value: '300g per portion',
    bg: 'bg-blue-50',
    color: 'text-blue-600',
    icon: '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>',
  },
  {
    label: 'Origin',
    value: 'Kagoshima, Japan',
    bg: 'bg-green-50',
    color: 'text-green-700',
    icon: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  },
]

const product = ref({
  name: '',
  subtitle: '',
  category: '',
  price: 0,
  description: '',
  image: '',
})

const totalPrice = computed(() => (product.value.price * qty.value).toFixed(2))

function decreaseQty() {
  if (qty.value > 1) qty.value--
}

onMounted(async () => {
  // Replace with your real API call
  product.value = {
    id: productId,
    name: 'Premium Wagyu Steak',
    subtitle: 'A5 grade Wagyu, seared with herb butter · 300g',
    category: 'Food',
    price: 25,
    description: 'Tender A5-grade Japanese Wagyu ribeye, slow-seared in clarified butter with fresh thyme and garlic. Finished with Himalayan salt flakes and served with a side of house-made demi-glace.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',
  }
})
</script>