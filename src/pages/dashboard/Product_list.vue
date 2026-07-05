<template>
	<div class="p-6 bg-gray-50 min-h-screen font-inter">
		<!-- Header -->
		<div class="flex items-start justify-between gap-3 flex-wrap mb-6">
			<div>
				<h1 class="text-xl font-bold text-gray-900">Menu Management</h1>
				<p class="text-sm text-gray-400 mt-1">
					Manage your catalog of {{ items.length }} active items across 4
					categories.
				</p>
			</div>

			<RouterLink
				class="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
				to="/dashboard/create-product">
				Add New Item
			</RouterLink>
		</div>

		<!-- Stats -->
		<div class="grid grid-cols-3 gap-4 mb-6">
			<div
				class="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
				<div>
					<p class="text-xs text-gray-400 mb-1">Total Items</p>
					<p class="text-3xl font-bold text-gray-900">{{ items.length }}</p>
				</div>
				<div
					class="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
					<svg
						class="w-5 h-5 text-emerald-700"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24">
						<rect x="3" y="3" width="7" height="7" />
						<rect x="14" y="3" width="7" height="7" />
						<rect x="3" y="14" width="7" height="7" />
						<rect x="14" y="14" width="7" height="7" />
					</svg>
				</div>
			</div>
			<div
				class="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
				<div>
					<p class="text-xs text-gray-400 mb-1">In Stock</p>
					<p class="text-3xl font-bold text-emerald-700">{{ inStockCount }}</p>
				</div>
				<div
					class="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
					<svg
						class="w-5 h-5 text-emerald-700"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24">
						<polyline points="20 6 9 17 4 12" />
					</svg>
				</div>
			</div>
			<div
				class="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
				<div>
					<p class="text-xs text-gray-400 mb-1">Low Stock Alerts</p>
					<p class="text-3xl font-bold text-amber-500">{{ alertCount }}</p>
				</div>
				<div
					class="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center">
					<svg
						class="w-5 h-5 text-violet-600"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24">
						<path
							d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
					</svg>
				</div>
			</div>

			<!-- MODAL -->
			<Teleport to="body">
				<div v-if="showModal" class="modal-bg" @click.self="closeModal">
					<div class="modal">
						<div class="modal-head">
							<h2 class="modal-title">
								{{ editId ? "Edit Item" : "Add New Item" }}
							</h2>
							<button class="modal-x" @click="closeModal">
								<i class="bi bi-x-lg"></i>
							</button>
						</div>
						<div class="modal-body">
							<div class="fg">
								<label>Item Name</label
								><input
									v-model="form.name"
									placeholder="e.g. Grilled Lamb Chops" />
							</div>
							<div class="fg">
								<label>Description</label
								><input
									v-model="form.desc"
									placeholder="Short description..." />
							</div>
							<div class="fg-row">
								<div class="fg">
									<label>Price</label
									><input v-model="form.price" placeholder="$0.00" />
								</div>
								<div class="fg">
									<label>Quantity</label
									><input v-model.number="form.qty" type="number" min="0" />
								</div>
							</div>
							<div class="fg">
								<label>Category</label
								><select v-model="form.cat">
									<option>Starters</option>
									<option>Mains</option>
									<option>Desserts</option>
									<option>Drinks</option>
								</select>
							</div>
							<div class="fg">
								<label>Image URL</label
								><input v-model="form.img" placeholder="https://..." />
							</div>
						</div>
						<div class="modal-foot">
							<button class="btn-cancel" @click="closeModal">Cancel</button>
							<button class="btn-add" @click="saveItem">
								{{ editId ? "Save Changes" : "Add Item" }}
							</button>
						</div>
					</div>
				</div>
			</Teleport>
		</div>

		<!-- Filters -->
		<div class="flex items-center justify-between gap-3 mb-4 flex-wrap">
			<div class="flex gap-2 overflow-x-auto pb-1">
				<button
					v-for="c in ['All Items', ...categories]"
					:key="c"
					@click="
						activeCat = c;
						page = 1;
					"
					:class="
						activeCat === c
							? 'bg-emerald-800 text-white border-emerald-800'
							: 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
					"
					class="px-4 py-2 rounded-full border text-sm font-medium transition-colors whitespace-nowrap">
					{{ c }}
				</button>
			</div>
			<button
				class="flex items-center gap-1.5 text-sm text-gray-400 hover:text-emerald-800 transition-colors">
				<svg
					class="w-4 h-4"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24">
					<line x1="4" y1="6" x2="20" y2="6" />
					<line x1="8" y1="12" x2="16" y2="12" />
					<line x1="11" y1="18" x2="13" y2="18" />
				</svg>
				Advanced Filters
			</button>
		</div>

		<!-- Table rows (desktop) -->
		<div class="hidden md:flex flex-col gap-2">
			<div
				v-for="item in items"
				:key="item.id"
				class="bg-white rounded-xl flex items-center overflow-hidden shadow-sm hover:shadow-md transition-shadow">
				<!-- Accent bar -->
				<div
					class="w-1.5 self-stretch flex-shrink-0"
					:class="stockAccent(item.qty)"></div>

				<!-- Image + name -->
				<div class="flex items-center gap-3 px-4 py-3 min-w-[220px] flex-1">
					<img
						:src="item.img"
						:alt="item.name"
						class="w-12 h-12 rounded-lg object-cover border border-gray-100 flex-shrink-0" />
					<div>
						<p class="text-sm font-semibold text-gray-900">{{ item.name }}</p>
						<p class="text-xs text-gray-400 mt-0.5">{{ item.desc }}</p>
					</div>
					<!-- <button class="btn-add" @click="design_create"><i class="bi bi-plus-lg"></i>Add New Item Row</button> -->
				</div>

				<!-- Category -->
				<div class="min-w-[110px] px-2">
					<p class="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
						Category
					</p>
					<p class="text-sm text-gray-700">{{ item.cat }}</p>
				</div>

				<!-- Price -->
				<div class="min-w-[90px] px-2">
					<p class="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
						Price
					</p>
					<p class="text-sm font-semibold text-gray-900">{{ item.price }}</p>
				</div>

				<!-- Status badge -->
				<div class="min-w-[120px] px-2">
					<span
						class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
						:class="stockBadge(item.qty)">
						<span
							v-if="item.qty > 0 && item.qty < 10"
							class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
						{{ stockLabel(item.qty) }}
					</span>
				</div>

				<!-- Qty -->
				<div class="min-w-[70px] px-2">
					<p class="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
						Qty
					</p>
					<p
						class="text-sm font-semibold"
						:class="
							item.qty > 0 && item.qty < 10 ? 'text-amber-500' : 'text-gray-900'
						">
						{{ item.qty }}
					</p>
				</div>

				<!-- Actions -->
				<div class="flex items-center gap-2 pr-4 pl-2">
					<button
						@click="openEdit(item)"
						class="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
						Edit
					</button>
					<button
						@click="removeItem(item.id)"
						class="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-50 transition-colors">
						<svg
							class="w-4 h-4"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24">
							<polyline points="3 6 5 6 21 6" />
							<path d="M19 6l-1 14H6L5 6" />
							<path d="M10 11v6" />
							<path d="M14 11v6" />
							<path d="M9 6V4h6v2" />
						</svg>
					</button>
				</div>
			</div>

			<div
				v-if="pagedItems.length === 0"
				class="bg-white rounded-xl p-10 text-center text-sm text-gray-400 shadow-sm">
				No items found.
			</div>
		</div>

		<!-- Mobile cards -->
		<div class="flex md:hidden flex-col gap-3">
			<div
				v-for="item in items"
				:key="item.id"
				class="bg-white rounded-xl shadow-sm overflow-hidden">
				<div class="flex items-start gap-3 p-4">
					<img
						:src="item.img"
						:alt="item.name"
						class="w-12 h-12 rounded-lg object-cover border border-gray-100 flex-shrink-0" />
					<div class="flex-1 min-w-0">
						<p class="text-sm font-semibold text-gray-900">{{ item.name }}</p>
						<p class="text-xs text-gray-400 mt-0.5 truncate">{{ item.desc }}</p>
					</div>
					<div class="flex gap-1 flex-shrink-0">
						<button
							@click="openEdit(item)"
							class="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700">
							<svg
								class="w-3.5 h-3.5"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								viewBox="0 0 24 24">
								<path
									d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
								<path
									d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
							</svg>
						</button>
						<button
							@click="removeItem(item.id)"
							class="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500">
							<svg
								class="w-3.5 h-3.5"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								viewBox="0 0 24 24">
								<polyline points="3 6 5 6 21 6" />
								<path d="M19 6l-1 14H6L5 6" />
								<path d="M10 11v6" />
								<path d="M14 11v6" />
								<path d="M9 6V4h6v2" />
							</svg>
						</button>
					</div>
				</div>
				<div class="flex items-center gap-3 px-4 pb-3 flex-wrap">
					<span class="text-xs text-gray-500">{{ item.cat }}</span>
					<span class="text-xs font-semibold text-gray-900">{{
						item.price
					}}</span>
					<span
						class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
						:class="stockBadge(item.qty)">
						<span
							v-if="item.qty > 0 && item.qty < 10"
							class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
						{{ stockLabel(item.qty) }}
					</span>
					<span
						class="text-xs"
						:class="
							item.qty > 0 && item.qty < 10
								? 'text-amber-500 font-semibold'
								: 'text-gray-500'
						"
						>Qty: {{ item.qty }}</span
					>
				</div>
			</div>
			<div
				v-if="items.length === 0"
				class="bg-white rounded-xl p-10 text-center text-sm text-gray-400 shadow-sm">
				No items found.
			</div>
		</div>

		<!-- Footer -->
		<div
			class="flex items-center justify-between flex-wrap gap-3 mt-6 pt-5 border-t border-gray-100">
			<div class="flex gap-8 flex-wrap">
				<div>
					<p
						class="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
						Total Items
					</p>
					<p class="text-sm font-semibold text-gray-900 mt-1">
						{{ items.length }} Items
					</p>
				</div>
				<div>
					<p
						class="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
						Active Categories
					</p>
					<p class="text-sm font-semibold text-gray-900 mt-1">4 Groups</p>
				</div>
				<div>
					<p
						class="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
						Low Stock Alerts
					</p>
					<p class="text-sm font-semibold text-amber-500 mt-1">
						{{ alertCount }} Items
					</p>
				</div>
			</div>
			<div class="flex items-center gap-2">
				<span class="text-xs text-gray-400"
					>Page {{ page }} of {{ totalPages }}</span
				>
				<button
					class="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
					:disabled="page <= 1"
					@click="page--">
					<svg
						class="w-3.5 h-3.5"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24">
						<polyline points="15 18 9 12 15 6" />
					</svg>
				</button>
				<button
					class="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
					:disabled="page >= totalPages"
					@click="page++">
					<svg
						class="w-3.5 h-3.5"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24">
						<polyline points="9 18 15 12 9 6" />
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Modal -->
	<Teleport to="body">
		<div
			v-if="showModal"
			class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
			@click.self="closeModal">
			<div
				class="bg-white rounded-2xl w-full max-w-[440px] shadow-xl overflow-hidden"
				style="animation: pop 0.18s ease">
				<div
					class="flex items-center justify-between px-5 py-4 bg-emerald-50 border-b border-gray-100">
					<h2 class="text-sm font-bold text-gray-900">
						{{ editId ? "Edit Item" : "Add New Item" }}
					</h2>
					<button
						@click="closeModal"
						class="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-emerald-100 transition-colors">
						<svg
							class="w-4 h-4"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24">
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>
				<div class="p-5 flex flex-col gap-4">
					<div class="flex flex-col gap-1.5">
						<label
							class="text-[10px] font-bold uppercase tracking-widest text-gray-400"
							>Item Name</label
						>
						<input
							v-model="form.name"
							placeholder="e.g. Grilled Lamb Chops"
							class="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-700 bg-gray-50 focus:bg-white transition-colors" />
					</div>
					<div class="flex flex-col gap-1.5">
						<label
							class="text-[10px] font-bold uppercase tracking-widest text-gray-400"
							>Description</label
						>
						<input
							v-model="form.desc"
							placeholder="Short description..."
							class="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-700 bg-gray-50 focus:bg-white transition-colors" />
					</div>
					<div class="flex gap-3">
						<div class="flex flex-col gap-1.5 flex-1">
							<label
								class="text-[10px] font-bold uppercase tracking-widest text-gray-400"
								>Price</label
							>
							<input
								v-model="form.price"
								placeholder="$0.00"
								class="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-700 bg-gray-50 focus:bg-white transition-colors w-full" />
						</div>
						<div class="flex flex-col gap-1.5 flex-1">
							<label
								class="text-[10px] font-bold uppercase tracking-widest text-gray-400"
								>Quantity</label
							>
							<input
								v-model.number="form.qty"
								type="number"
								min="0"
								class="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-700 bg-gray-50 focus:bg-white transition-colors w-full" />
						</div>
					</div>
					<div class="flex flex-col gap-1.5">
						<label
							class="text-[10px] font-bold uppercase tracking-widest text-gray-400"
							>Category</label
						>
						<select
							v-model="form.cat"
							class="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-700 bg-gray-50 focus:bg-white transition-colors">
							<option>Starters</option>
							<option>Mains</option>
							<option>Desserts</option>
							<option>Drinks</option>
						</select>
					</div>
					<div class="flex flex-col gap-1.5">
						<label
							class="text-[10px] font-bold uppercase tracking-widest text-gray-400"
							>Image URL</label
						>
						<input
							v-model="form.img"
							placeholder="https://..."
							class="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-700 bg-gray-50 focus:bg-white transition-colors" />
					</div>
				</div>
				<div class="flex justify-end gap-2 px-5 py-4 border-t border-gray-100">
					<button
						@click="closeModal"
						class="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
						Cancel
					</button>
					<button
						@click="saveItem"
						class="px-4 py-2 bg-emerald-800 text-white text-sm font-semibold rounded-lg hover:bg-emerald-900 transition-colors">
						{{ editId ? "Save Changes" : "Add Item" }}
					</button>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<script setup>
	import { useRouter } from "vue-router";
	import { ref, computed, onMounted } from "vue";
	import api from "../../services/api";

	const router = useRouter();

	// Navigation function
	const design_create = () => {
		router.push("/design_create_product_page");
	};

	// Local items data
	const items = ref([]);

	// API data
	const products = ref([]);

	// Filter states
	const searchQuery = ref("");
	const selectCategory = ref("");
	const statusFilter = ref("");

	// Categories
	const categories = ["Starters", "Mains", "Desserts", "Drinks"];
	const activeCat = ref("All Items");
	const page = ref(1);
	const perPage = 5;
	let nextId = 6;

	// Modal states
	const showModal = ref(false);
	const editId = ref(null);
	const form = ref({
		name: "",
		desc: "",
		price: "",
		qty: 0,
		cat: "Mains",
		img: "",
	});

	// Computed properties
	const filtered = computed(() =>
		items.value.filter(
			(i) => activeCat.value === "All Items" || i.cat === activeCat.value,
		),
	);
	const totalPages = computed(() =>
		Math.max(1, Math.ceil(filtered.value.length / perPage)),
	);
	const pagedItems = computed(() =>
		filtered.value.slice((page.value - 1) * perPage, page.value * perPage),
	);
	const alertCount = computed(
		() => items.value.filter((i) => i.qty > 0 && i.qty < 10).length,
	);
	const inStockCount = computed(
		() => items.value.filter((i) => i.qty >= 10).length,
	);

	// Stock helper functions
	function stockLabel(qty) {
		return qty === 0 ? "Sold Out" : qty < 10 ? "Low Stock" : "In Stock";
	}

	function stockAccent(qty) {
		return qty === 0
			? "bg-gray-300"
			: qty < 10
				? "bg-amber-400"
				: "bg-emerald-500";
	}

	function stockBadge(qty) {
		return qty === 0
			? "bg-gray-100 text-gray-500"
			: qty < 10
				? "bg-amber-50 text-amber-600"
				: "bg-emerald-50 text-emerald-700";
	}

	// CRUD operations
	async function removeItem(id) {
		const response = await api.delete(`/products/${id}`);
		if (response.success) {
			router.push("/dashboard/products");
		}
	}

	function openEdit(item) {
		editId.value = item.id;
		form.value = { ...item };
		showModal.value = true;
	}

	function closeModal() {
		showModal.value = false;
	}

	function saveItem() {
		if (!form.value.name.trim()) return;

		if (editId.value) {
			const idx = items.value.findIndex((i) => i.id === editId.value);
			if (idx !== -1) {
				items.value[idx] = { ...items.value[idx], ...form.value };
			}
		} else {
			items.value.push({ id: nextId++, ...form.value });
		}
		closeModal();
	}

	// API functions
	const fetchAllData = async () => {
		try {
			const queryParams = {};

			if (searchQuery.value) {
				queryParams.search = searchQuery.value;
			}
			if (selectCategory.value) {
				queryParams.category_id = selectCategory.value;
			}
			if (statusFilter.value && statusFilter.value !== " ") {
				queryParams.is_active = statusFilter.value === "true";
			}

			const response = await api.get("/products", { params: queryParams });
			items.value = response.data.data;
			console.log("Data Fetched Successfully...", response.data);
		} catch (error) {
			console.error("Server error", error);
		}
	};

	// Lifecycle hooks
	onMounted(() => {
		fetchAllData();
	});
</script>

<style scoped>
	@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

	.font-inter {
		font-family: "Inter", sans-serif;
	}

	@keyframes pop {
		from {
			transform: translateY(10px) scale(0.98);
			opacity: 0;
		}
		to {
			transform: none;
			opacity: 1;
		}
	}
</style>
