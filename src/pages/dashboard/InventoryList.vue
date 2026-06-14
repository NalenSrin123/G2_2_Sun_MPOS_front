<template>
	<div class="min-h-screen bg-[#F7F5F0] font-sans">
		<div class="max-w-7xl mx-auto px-8 py-10 pb-20">
			<!-- ── Header ── -->
			<div class="flex items-start justify-between gap-6 mb-9">
				<div>
					<h1
						class="font-serif text-[2rem] font-normal text-slate-900 leading-tight tracking-tight"
						style="font-family: &quot;DM Serif Display&quot;, serif">
						Inventory Management
					</h1>
					<p class="mt-1 text-sm text-slate-500">
						Track and manage your kitchen and cellar stock levels.
					</p>
				</div>
				<button
					@click="openAddModal"
					class="inline-flex items-center gap-2 bg-[#0B3D2E] hover:bg-[#0f6746] text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-md shadow-[#0B3D2E]/20 transition-all duration-150 active:scale-[0.98] shrink-0">
					<i class="bi bi-plus-lg"></i>
					Add Stock Item
				</button>
			</div>

			<!-- ── Stat Cards ── -->
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
				<StatCard
					label="Total Items"
					:value="stats.total"
					status="info"
					icon="bi-box-seam" />
				<StatCard
					label="Low Stock"
					:value="stats.low"
					status="warning"
					icon="bi-exclamation-triangle" />
				<StatCard
					label="Out of Stock"
					:value="stats.out"
					status="danger"
					icon="bi-x-circle" />
				<StatCard
					label="Total Value"
					:value="formattedValue"
					status="neutral"
					icon="bi-layers" />
			</div>

			<!-- ── Toolbar ── -->
			<div class="flex flex-wrap items-center justify-between gap-3 mb-4">
				<!-- Search -->
				<div class="relative flex-1 min-w-[200px] max-w-sm">
					<i
						class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none"></i>
					<input
						v-model="search"
						type="text"
						placeholder="Search items, SKU, category…"
						class="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-300 outline-none focus:border-[#0f6746] focus:ring-2 focus:ring-[#0f6746]/10 transition-all" />
				</div>

				<!-- Right controls -->
				<div class="flex items-center gap-2">
					<!-- Filter tabs -->
					<div class="flex gap-1 bg-slate-100 p-1 rounded-lg">
						<button
							v-for="tab in tabs"
							:key="tab.key"
							@click="activeFilter = tab.key"
							:class="[
								'px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-150',
								activeFilter === tab.key
									? 'bg-white text-slate-900 shadow-sm'
									: 'text-slate-500 hover:text-slate-700',
							]">
							{{ tab.label }}
						</button>
					</div>

					<button
						class="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium px-3.5 py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
						<i class="bi bi-funnel text-slate-400"></i> Filter
					</button>
					<button
						class="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium px-3.5 py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
						<i class="bi bi-download text-slate-400"></i> Export
					</button>
				</div>
			</div>

			<!-- ── Table ── -->
			<div
				class="bg-white border border-black/[0.06] rounded-2xl overflow-hidden mb-5">
				<table class="w-full text-left border-collapse">
					<thead>
						<tr class="bg-slate-50 border-b border-black/[0.05]">
							<th
								class="py-3.5 px-5 text-[0.65rem] font-bold tracking-[0.08em] uppercase text-slate-500">
								Item Name
							</th>
							<th
								class="py-3.5 px-5 text-[0.65rem] font-bold tracking-[0.08em] uppercase text-slate-500">
								Category
							</th>
							<th
								class="py-3.5 px-5 text-[0.65rem] font-bold tracking-[0.08em] uppercase text-slate-500">
								Current Stock
							</th>
							<th
								class="py-3.5 px-5 text-[0.65rem] font-bold tracking-[0.08em] uppercase text-slate-500">
								Price
							</th>
							<th
								class="py-3.5 px-5 text-[0.65rem] font-bold tracking-[0.08em] uppercase text-slate-500">
								Unit
							</th>
							<th
								class="py-3.5 px-5 text-[0.65rem] font-bold tracking-[0.08em] uppercase text-slate-500">
								Status
							</th>
							<th
								class="py-3.5 px-5 text-[0.65rem] font-bold tracking-[0.08em] uppercase text-slate-500 text-right">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						<template v-if="filteredItems.length > 0">
							<tr
								v-for="item in filteredItems"
								:key="item.id"
								class="border-b border-black/[0.04] last:border-none hover:bg-slate-50/60 transition-colors">
								<!-- Name + SKU -->
								<td class="py-4 px-5">
									<div class="text-sm font-semibold text-slate-900">
										{{ item.name }}
									</div>
									<div
										class="text-[0.68rem] font-mono text-slate-300 mt-0.5 tracking-wider">
										{{ item.sku }}
									</div>
								</td>

								<!-- Category -->
								<td class="py-4 px-5 text-sm text-slate-500">
									{{ item.category }}
								</td>

								<!-- Stock -->
								<td class="py-4 px-5">
									<span class="text-[0.9375rem] font-bold text-slate-900">{{
										item.stock
									}}</span>
								</td>

								<!-- Price -->
								<td class="py-4 px-5 text-sm font-medium text-slate-700">
									${{ item.price.toFixed(2) }}
								</td>

								<!-- Unit -->
								<td class="py-4 px-5 text-sm text-slate-400">
									{{ item.unit }}
								</td>

								<!-- Status badge -->
								<td class="py-4 px-5">
									<span :class="badgeClass(item)">
										<span
											:class="dotClass(item)"
											class="w-1.5 h-1.5 rounded-full inline-block"></span>
										{{ statusLabel(item) }}
									</span>
								</td>

								<!-- Actions -->
								<td class="py-4 px-5">
									<div class="flex items-center justify-end gap-2">
										<!-- Edit -->
										<button
											@click="openEditModal(item)"
											title="Edit item"
											class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold transition-colors duration-150 active:scale-95">
											<i class="bi bi-pencil text-[0.75rem]"></i>
											Edit
										</button>
										<!-- Delete -->
										<button
											@click="deleteItem(item.id)"
											title="Delete item"
											class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold transition-colors duration-150 active:scale-95">
											<i class="bi bi-trash text-[0.75rem]"></i>
											Delete
										</button>
									</div>
								</td>
							</tr>
						</template>

						<!-- Empty state -->
						<tr v-else>
							<td colspan="7">
								<div
									class="flex flex-col items-center justify-center py-20 gap-3">
									<div
										class="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl text-slate-300">
										<i class="bi bi-inbox"></i>
									</div>
									<div class="text-center">
										<p class="text-sm font-semibold text-slate-700">
											No items found
										</p>
										<p class="text-xs text-slate-400 mt-1 max-w-xs">
											Try adjusting your search or filter, or add a new stock
											item to get started.
										</p>
									</div>
									<button
										@click="openAddModal"
										class="mt-1 inline-flex items-center gap-2 bg-[#0B3D2E] hover:bg-[#0f6746] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow transition-all">
										<i class="bi bi-plus-lg"></i> Add Stock Item
									</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- ── Notice Banner ── -->
			<div
				class="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-4">
				<i
					class="bi bi-info-circle text-emerald-700 text-base mt-0.5 shrink-0"></i>
				<div>
					<p class="text-sm font-semibold text-[#0B3D2E]">
						Automated Reordering Active
					</p>
					<p class="text-xs text-emerald-700 mt-0.5 leading-relaxed">
						LuxeDine Pro is set to automatically place orders for staple items
						when they reach 15% stock capacity.
					</p>
				</div>
			</div>
		</div>

		<!-- ── Modal ── -->
		<Transition
			enter-active-class="transition duration-200 ease-out"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="transition duration-150 ease-in"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0">
			<div
				v-if="modal.open"
				class="fixed inset-0 z-50 flex items-center justify-center p-4">
				<!-- Backdrop -->
				<div
					class="absolute inset-0 bg-black/30 backdrop-blur-sm"
					@click="closeModal"></div>

				<!-- Panel -->
				<Transition
					enter-active-class="transition duration-200 ease-out"
					enter-from-class="opacity-0 scale-95 translate-y-2"
					enter-to-class="opacity-100 scale-100 translate-y-0">
					<div
						v-if="modal.open"
						class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 z-10">
						<div class="flex items-center justify-between mb-6">
							<h2 class="text-lg font-semibold text-slate-900">
								{{
									modal.mode === "add" ? "Add Stock Item" : "Edit Stock Item"
								}}
							</h2>
							<button
								@click="closeModal"
								class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
								<i class="bi bi-x-lg text-sm"></i>
							</button>
						</div>

						<div class="space-y-4">
							<ModalField
								label="Item Name"
								v-model="form.name"
								placeholder="e.g. Extra Virgin Olive Oil" />
							<ModalField
								label="SKU"
								v-model="form.sku"
								placeholder="e.g. OIL-001" />

							<div class="grid grid-cols-2 gap-3">
								<ModalField
									label="Category"
									v-model="form.category"
									placeholder="e.g. Oils & Fats" />
								<ModalField
									label="Unit"
									v-model="form.unit"
									placeholder="e.g. Bottle, kg" />
							</div>

							<div class="grid grid-cols-2 gap-3">
								<ModalField
									label="Current Stock"
									v-model.number="form.stock"
									type="number"
									placeholder="0" />
								<ModalField
									label="Price ($)"
									v-model.number="form.price"
									type="number"
									placeholder="0.00"
									step="0.01" />
							</div>
						</div>

						<!-- Error -->
						<p v-if="formError" class="mt-3 text-xs text-rose-600 font-medium">
							{{ formError }}
						</p>

						<div class="flex gap-3 mt-7">
							<button
								@click="closeModal"
								class="flex-1 py-2.5 text-sm font-medium border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
								Cancel
							</button>
							<button
								@click="saveItem"
								class="flex-1 py-2.5 text-sm font-semibold bg-[#0B3D2E] hover:bg-[#0f6746] text-white rounded-xl shadow transition-all active:scale-[0.98]">
								{{ modal.mode === "add" ? "Add Item" : "Save Changes" }}
							</button>
						</div>
					</div>
				</Transition>
			</div>
		</Transition>
	</div>
</template>

<script setup>
	import { ref, computed, reactive } from "vue";

	// ── Sub-components (inline) ──────────────────────────────

	const StatCard = {
		name: "StatCard",
		props: {
			label: { type: String, required: true },
			value: { type: [String, Number], required: true },
			status: { type: String, default: "neutral" },
			icon: { type: String, required: true },
		},
		computed: {
			borderColor() {
				return {
					info: "border-l-emerald-600",
					warning: "border-l-amber-500",
					danger: "border-l-rose-500",
					neutral: "border-l-slate-300",
				}[this.status];
			},
			iconBg() {
				return {
					info: "bg-emerald-50 text-emerald-600",
					warning: "bg-amber-50 text-amber-500",
					danger: "bg-rose-50 text-rose-500",
					neutral: "bg-slate-100 text-slate-500",
				}[this.status];
			},
		},
		template: `
    <div :class="['bg-white border border-black/[0.06] border-l-4 rounded-2xl p-5 flex items-center justify-between gap-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150', borderColor]">
      <div class="flex flex-col gap-1">
        <span class="text-[0.62rem] font-bold tracking-[0.09em] uppercase text-slate-500">{{ label }}</span>
        <span class="text-[1.75rem] font-bold text-slate-900 leading-none tracking-tight">{{ value }}</span>
      </div>
      <div :class="['w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0', iconBg]">
        <i :class="'bi ' + icon"></i>
      </div>
    </div>
  `,
	};

	const ModalField = {
		name: "ModalField",
		props: {
			label: { type: String, required: true },
			modelValue: { type: [String, Number], default: "" },
			type: { type: String, default: "text" },
			placeholder: { type: String, default: "" },
			step: { type: String, default: "" },
		},
		emits: ["update:modelValue"],
		template: `
    <div class="flex flex-col gap-1.5">
      <label class="text-[0.65rem] font-bold tracking-[0.08em] uppercase text-slate-400">{{ label }}</label>
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :step="step || undefined"
        @input="$emit('update:modelValue', type === 'number' ? parseFloat($event.target.value) : $event.target.value)"
        class="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 bg-white placeholder-slate-300 outline-none focus:border-[#0f6746] focus:ring-2 focus:ring-[#0f6746]/10 transition-all"
      />
    </div>
  `,
	};

	// ── Data ─────────────────────────────────────────────────

	const items = ref([
		{
			id: 1,
			name: "Extra Virgin Olive Oil",
			sku: "OIL-001",
			category: "Oils & Fats",
			stock: 24,
			price: 18.5,
			unit: "Bottle",
		},
		{
			id: 2,
			name: "Aged Parmesan Reggiano",
			sku: "CHE-012",
			category: "Dairy",
			stock: 3,
			price: 42.0,
			unit: "kg",
		},
		{
			id: 3,
			name: "Arborio Rice",
			sku: "GRN-007",
			category: "Grains",
			stock: 0,
			price: 6.75,
			unit: "kg",
		},
		{
			id: 4,
			name: "Black Truffle Paste",
			sku: "TRF-002",
			category: "Specialty",
			stock: 5,
			price: 89.0,
			unit: "Jar",
		},
		{
			id: 5,
			name: "Wagyu Beef Striploin",
			sku: "MEA-031",
			category: "Meat & Poultry",
			stock: 8,
			price: 210.0,
			unit: "kg",
		},
		{
			id: 6,
			name: "Saffron Threads",
			sku: "SPC-004",
			category: "Spices",
			stock: 0,
			price: 55.0,
			unit: "g",
		},
		{
			id: 7,
			name: "Champagne Vinegar",
			sku: "VIN-003",
			category: "Condiments",
			stock: 2,
			price: 14.25,
			unit: "Bottle",
		},
		{
			id: 8,
			name: "Sourdough Starter",
			sku: "BAK-009",
			category: "Bakery",
			stock: 12,
			price: 4.0,
			unit: "Cup",
		},
	]);

	// ── Search & Filter ───────────────────────────────────────

	const search = ref("");
	const activeFilter = ref("all");

	const tabs = [
		{ key: "all", label: "All" },
		{ key: "low", label: "Low Stock" },
		{ key: "out", label: "Out of Stock" },
	];

	const filteredItems = computed(() => {
		const q = search.value.trim().toLowerCase();
		return items.value.filter((item) => {
			const matchSearch =
				!q ||
				[item.name, item.sku, item.category, item.unit].some((f) =>
					f?.toLowerCase().includes(q),
				);
			const matchFilter =
				activeFilter.value === "all"
					? true
					: activeFilter.value === "low"
						? item.stock > 0 && item.stock <= 5
						: activeFilter.value === "out"
							? item.stock === 0
							: true;
			return matchSearch && matchFilter;
		});
	});

	// ── Stats ─────────────────────────────────────────────────

	const stats = computed(() => {
		const list = items.value;
		let low = 0,
			out = 0,
			value = 0;
		list.forEach((i) => {
			value += (i.price ?? 0) * (i.stock ?? 0);
			if (i.stock === 0) out++;
			else if (i.stock <= 5) low++;
		});
		return { total: list.length, low, out, value };
	});

	const formattedValue = computed(
		() =>
			"$" +
			stats.value.value.toLocaleString("en-US", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}),
	);

	// ── Badge helpers ─────────────────────────────────────────

	function statusLabel(item) {
		if (item.stock === 0) return "Out of Stock";
		if (item.stock <= 5) return "Low Stock";
		return "In Stock";
	}

	function badgeClass(item) {
		const base =
			"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.68rem] font-semibold";
		if (item.stock === 0) return `${base} bg-rose-50 text-rose-600`;
		if (item.stock <= 5) return `${base} bg-amber-50 text-amber-600`;
		return `${base} bg-emerald-50 text-emerald-700`;
	}

	function dotClass(item) {
		if (item.stock === 0) return "bg-rose-500";
		if (item.stock <= 5) return "bg-amber-500";
		return "bg-emerald-500";
	}

	// ── Delete ────────────────────────────────────────────────

	function deleteItem(id) {
		items.value = items.value.filter((i) => i.id !== id);
	}

	// ── Modal ─────────────────────────────────────────────────

	const modal = reactive({ open: false, mode: "add", editId: null });
	const formError = ref("");

	const emptyForm = () => ({
		name: "",
		sku: "",
		category: "",
		unit: "",
		stock: 0,
		price: 0,
	});
	const form = reactive(emptyForm());

	function openAddModal() {
		Object.assign(form, emptyForm());
		formError.value = "";
		modal.mode = "add";
		modal.editId = null;
		modal.open = true;
	}

	function openEditModal(item) {
		Object.assign(form, { ...item });
		formError.value = "";
		modal.mode = "edit";
		modal.editId = item.id;
		modal.open = true;
	}

	function closeModal() {
		modal.open = false;
	}

	function saveItem() {
		if (!form.name.trim()) {
			formError.value = "Item name is required.";
			return;
		}
		if (!form.sku.trim()) {
			formError.value = "SKU is required.";
			return;
		}
		formError.value = "";

		if (modal.mode === "add") {
			items.value.push({
				id: Date.now(),
				name: form.name.trim(),
				sku: form.sku.trim(),
				category: form.category.trim() || "General",
				unit: form.unit.trim() || "Unit",
				stock: Number(form.stock) || 0,
				price: Number(form.price) || 0,
			});
		} else {
			const idx = items.value.findIndex((i) => i.id === modal.editId);
			if (idx !== -1) {
				items.value[idx] = {
					...items.value[idx],
					name: form.name.trim(),
					sku: form.sku.trim(),
					category: form.category.trim(),
					unit: form.unit.trim(),
					stock: Number(form.stock),
					price: Number(form.price),
				};
			}
		}
		closeModal();
	}
</script>
