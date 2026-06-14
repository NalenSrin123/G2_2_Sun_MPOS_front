<template>
	<div
		class="bg-white border border-gray-100 rounded-xl shadow-xs overflow-hidden">
		<table class="w-full text-left border-collapse">
			<thead>
				<tr
					class="bg-slate-50/70 border-b border-gray-100 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
					<th class="py-4 px-6">Item Name</th>
					<th class="py-4 px-6">Category</th>
					<th class="py-4 px-6">Current Stock</th>
					<th class="py-4 px-6">Price</th>
					<th class="py-4 px-6">Unit</th>
					<th class="py-4 px-6">Status</th>
					<th class="py-4 px-6 text-right">Actions</th>
				</tr>
			</thead>
			<tbody>
				<template v-if="items.length > 0">
					<InventoryRow
						v-for="stockItem in items"
						:key="stockItem.id"
						:item="stockItem"
						@edit="$emit('edit-item', stockItem)"
						@delete="$emit('delete-item', stockItem.id)" />
				</template>

				<tr v-else>
					<td colspan="7" class="py-16 text-center">
						<p class="text-sm text-slate-500 font-medium">
							No active stock inventory items found.
						</p>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script setup>
	import InventoryRow from "./InventoryRow.vue";
	defineProps({
		items: {
			type: Array,
			required: true,
		},
	});
	defineEmits(["edit-item", "delete-item"]);
</script>
