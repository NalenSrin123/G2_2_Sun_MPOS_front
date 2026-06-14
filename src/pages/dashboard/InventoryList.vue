<template>
	<button
		:type="type"
		:disabled="disabled"
		:class="[
			'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none',
			size === 'sm' ? 'px-3 pt-1.5 text-xs' : 'px-4 py-2.5 text-sm',
			variant === 'primary'
				? 'bg-[#0f6746] text-white hover:bg-[#0c5238] shadow-sm shadow-[#0f6746]/10'
				: '',
			variant === 'secondary'
				? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
				: '',
			variant === 'danger' ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : '',
			variant === 'ghost'
				? 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
				: '',
		]">
		<slot name="icon" />

		<slot />
	</button>
	<div
		class="bg-white border border-slate-100 rounded-xl p-5 flex items-center justify-between shadow-xs">
		<div class="flex flex-col gap-1">
			<span
				class="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
				{{ title }}
			</span>
			<span class="text-2xl font-black text-slate-900 tracking-tight">
				{{ value }}
			</span>
		</div>
		<div
			:class="[
				'w-10 h-10 rounded-xl flex items-center justify-center text-lg',
				status === 'warning' ? 'bg-amber-50 text-amber-500' : '',
				status === 'danger' ? 'bg-rose-50 text-rose-500' : '',
				status === 'info' ? 'bg-emerald-50 text-emerald-600' : '',
				status === 'default' ? 'bg-blue-50 text-blue-500' : '',
			]">
			<slot name="icon" />
		</div>
	</div>
	<div class="w-full flex flex-col gap-1.5">
		<label
			v-if="label"
			class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
			{{ label }}
		</label>

		<div class="relative flex items-center w-full">
			<span
				v-if="prefix"
				class="absolute left-3 text-gray-400 text-sm pointer-events-none">
				{{ prefix }}
			</span>

			<input
				:value="modelValue"
				:type="type"
				v-bind="$attrs"
				@input="$emit('update:modelValue', $event.target.value)"
				:class="[
					'w-full border border-gray-200 rounded-lg text-sm text-slate-800 bg-white placeholder-gray-300 transition-all focus:outline-none focus:border-[#0f6746] focus:ring-2 focus:ring-[#0f6746]/10',
					prefix ? 'pl-7 pr-3 py-2' : 'px-3 py-2',
				]" />
		</div>
	</div>
	<!-- Table -->
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
			<!-- Row -->
			<tr
				class="border-b border-gray-50 hover:bg-slate-50/40 transition-colors text-sm text-slate-700">
				<td class="py-4 px-6 font-medium text-slate-900">
					<div>{{ item.name }}</div>
					<div class="text-[11px] text-slate-400 font-mono mt-0.5">
						{{ item.sku }}
					</div>
				</td>
				<td class="py-4 px-6 text-slate-500">{{ item.category }}</td>
				<td class="py-4 px-6 font-semibold">{{ item.stock }}</td>
				<td class="py-4 px-6 font-medium">${{ item.price.toFixed(2) }}</td>
				<td class="py-4 px-6 text-slate-400">{{ item.unit }}</td>
				<td class="py-4 px-6">
					<span :class="statusBadgeClasses">
						{{ stockStatusLabel }}
					</span>
				</td>
				<td class="py-4 px-6 text-right space-x-1">
					<button
						@click="$emit('edit')"
						class="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-slate-100/60 transition-colors">
						<i class="bi bi-pencil"></i>
					</button>
					<button
						@click="$emit('delete')"
						class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100/60 transition-colors">
						<i class="bi bi-trash"></i>
					</button>
				</td>
			</tr>
		</table>
	</div>
	<!-- Summary -->
	<div class="grid grid-cols-4 gap-4 mb-8">
		<BaseCard
			title="Total Items"
			:value="computedStats.totalItems"
			status="info">
			<template #icon><i class="bi bi-box-seam"></i></template>
		</BaseCard>

		<BaseCard
			title="Low Stock"
			:value="computedStats.lowStock"
			status="warning">
			<template #icon><i class="bi bi-exclamation-triangle"></i></template>
		</BaseCard>

		<BaseCard
			title="Out Of Stock"
			:value="computedStats.outOfStock"
			status="danger">
			<template #icon><i class="bi bi-x-circle"></i></template>
		</BaseCard>

		<BaseCard
			title="Total Value"
			:value="`$${computedStats.totalValue.toFixed(2)}`"
			status="default">
			<template #icon><i class="bi bi-layers"></i></template>
		</BaseCard>
	</div>
</template>
<script setup>
	import { computed } from "vue";

	const props = defineProps({
		items: { type: Array, required: true },
		searchQuery: String,
	});

	const emit = defineEmits(["edit-item", "delete-item", "update:searchQuery"]);

	const computedStats = computed(() => {
		let lowStock = 0,
			outOfStock = 0,
			totalValue = 0;
		props.items.forEach((item) => {
			totalValue += item.price * item.stock;
			if (item.stock === 0) outOfStock++;
			else if (item.stock <= 5) lowStock++;
		});
		return { totalItems: props.items.length, lowStock, outOfStock, totalValue };
	});
</script>

