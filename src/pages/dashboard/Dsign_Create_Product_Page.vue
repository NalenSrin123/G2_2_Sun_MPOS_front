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
            class="flex items-center gap-2 rounded-full bg-[#0d7a4c] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#0b6c43]"
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
                  type="text"
                  placeholder="e.g., Truffle Tagliatelle"
                  class="h-11 w-full rounded-lg border border-[#d7ddd4] bg-[#f8faf7] px-4 text-sm outline-none transition focus:border-[#0d7a4c]"
                />
              </div>

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
                    type="text"
                    placeholder="0.00"
                    class="h-11 w-full rounded-lg border border-[#d7ddd4] bg-[#f8faf7] pl-8 pr-4 text-sm outline-none focus:border-[#0d7a4c]"
                  />
                </div>
              </div>

              <!-- Category -->
              <div>
                <label class="mb-2 block text-sm text-slate-600">
                  Category
                </label>

                <div class="relative">
                  <select
                    class="h-11 w-full appearance-none rounded-lg border border-[#d7ddd4] bg-[#f8faf7] px-4 text-sm outline-none focus:border-[#0d7a4c]"
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

            <!-- Modifier -->
            <button
              class="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#cfd7cd] bg-[#d7daf8] text-sm font-medium text-[#0d7a4c] transition hover:bg-[#eef6f0]"
            >
              <i class="fa-solid fa-plus"></i>
              Add
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
              <input type="file" class="hidden" />

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

          
        </aside>
      </div>
    </section>
  </main>
</template>

<script setup></script>

<style scoped>
input,
textarea,
select,
button {
  transition: all 0.2s ease;
}
</style>