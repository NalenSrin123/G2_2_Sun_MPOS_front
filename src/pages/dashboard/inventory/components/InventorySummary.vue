<template>
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
	import BaseCard from "../ui/BaseCard.vue";
	const props = defineProps({
		items: {
			type: Array,
			required: true,
		},
	});

	const computedStats = computed(() => {
		let totalItems = props.items.length;
		let lowStock = 0;
		let outOfStock = 0;
		let totalValue = 0;
		props.items.forEach((item) => {
			totalValue += item.price * item.stock;
			if (item.stock === 0) {
				outOfStock++;
			} else if (item.stock <= 5) {
				lowStock++;
			}
		});
		return { totalItems, lowStock, outOfStock, totalValue };
	});
</script>
