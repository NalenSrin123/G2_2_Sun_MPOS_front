<template>
	<BaseModal :isOpen="isOpen" @close="$emit('close')">
		<h3 class="text-base font-bold text-slate-900 mb-5">Add New Stock Entry</h3>

		<form class="space-y-4" @submit.prevent="handleSubmit">
			<BaseInput
				label="Item Name"
				placeholder="e.g. Chardonnay Wine"
				v-model="form.name"
				required />

			<div class="grid grid-cols-2 gap-4">
				<BaseInput
					label="SKU"
					placeholder="CH-001"
					v-model="form.sku"
					required />
				<BaseInput
					label="Category"
					placeholder="Cellar"
					v-model="form.category"
					required />
			</div>

			<div class="grid grid-cols-3 gap-3">
				<BaseInput
					label="Price ($)"
					type="number"
					step="0.01"
					v-model.number="form.price"
					required />
				<BaseInput
					label="Stock"
					type="number"
					v-model.number="form.stock"
					required />
				<BaseInput label="Unit" placeholder="units" v-model="form.unit" />
			</div>

			<div class="flex justify-end gap-2 pt-4">
				<BaseButton variant="secondary" type="button" @click="$emit('close')"
					>Cancel</BaseButton
				>
				<BaseButton type="submit">Save</BaseButton>
			</div>
		</form>
	</BaseModal>
</template>
<script setup>
	import { reactive, watch } from "vue";
	import BaseButton from "../ui/BaseButton.vue";
	import BaseInput from "../ui/BaseInput.vue";
	import BaseModal from "../ui/BaseModal.vue";

	const props = defineProps({
		isOpen: Boolean,
	});
	const emit = defineEmits(["close", "save"]);

	const form = reactive({
		name: "",
		sku: "",
		category: "",
		price: 0,
		stock: 0,
		unit: "units",
	});
	watch(
		() => props.isOpen,
		(newVal) => {
			if (newVal) {
				form.name = "";
				form.sku = "";
				form.category = "";
				form.price = 0;
				form.stock = 0;
				form.unit = "units";
			}
		},
	);
	const handleSubmit = () => {
		emit(`save ${{ ...form }}`);
	};
</script>
