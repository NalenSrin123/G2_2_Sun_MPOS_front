<template>
	<div class="p-8 bg-slate-50 min-h-screen">
		<div class="flex justify-between items-center mb-6">
			<div>
				<h1 class="text-xl font-bold text-slate-900">Inventory Management</h1>
				<p class="text-xs text-slate-400">
					Track and manage your kitchen and cellar stock levels.
				</p>
			</div>

			<BaseButton @click="isModalOpen = true">
				<template #icon><i class="bi bi-plus-lg"></i></template>
				Add Stock Item
			</BaseButton>
		</div>
		<InventorySummary :items="inventoryList" />

		<InventoryTable
			:items="inventoryList"
			@edit-item="handleEditTrigger"
			@delete-item="handleDeleteRecord" />

		<div
			class="bg-emerald-50/50 border border-emerald-100/80 rounded-xl p-4 flex items-start gap-3 mt-6">
			<i class="bi bi-info-circle text-emerald-600 text-lg mt-0.5"></i>
			<div>
				<h4 class="text-sm font-bold text-[#0f6746]">
					Automated Reordering Active
				</h4>
				<p class="text-xs text-emerald-700/80 mt-0.5">
					LuxeDine Pro is set to automatically place orders for staple items
					when they reach 15% stock capacity.
				</p>
			</div>
		</div>

		<InventoryModal
			:isOpen="isModalOpen"
			@close="isModalOpen = false"
			@save="handleSaveStockItem" />
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import BaseButton from "../ui/BaseButton.vue";
	import InventorySummary from "../components/InventorySummary.vue";
	import InventoryTable from "../components/InventoryTable.vue";
	import InventoryModal from "../components/InventoryModal.vue";

	const isModalOpen = ref(false);

	const inventoryList = ref([]);

	const handleSaveStockItem = (newItemData) => {
		inventoryList.value.push({
			id: Date.now(),
			...newItemData,
		});
		isModalOpen.value = false;
	};

	const handleEditTrigger = (item) => {
		console.log("Edit requested for: ", item);
	};

	const handleDeleteRecord = (id) => {
		inventoryList.value = inventoryList.value.filter((item) => item.id !== id);
	};
</script>
