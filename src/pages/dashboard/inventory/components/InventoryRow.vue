<template>
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
</template>

<script setup>
	import { computed } from "vue";

	const props = defineProps({
		item: {
			type: Object,
			required: true,
		},
	});

	defineEmits(["edit", "delete"]);

	const stockStatusLabel = computed(() => {
		if (props.item.stock === 0) return "Out of Stock";
		if (props.item.stock <= 5) return "Low Stock";
		return "In Stock";
	});

	const statusBadgeClasses = computed(() => {
		const base =
			"inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ";
		if (props.item.stock === 0)
			return base + "bg-rose-50 text-rose-700 border border-rose-100/50";
		if (props.item.stock <= 5)
			return base + "bg-amber-50 text-amber-700 border border-amber-100/50";
		return base + "bg-emerald-50 text-emerald-700 border border-emerald-100/50";
	});
</script>
