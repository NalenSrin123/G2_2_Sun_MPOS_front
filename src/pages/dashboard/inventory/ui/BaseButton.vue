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
</template>
<script setup>
	defineProps({
		variant: {
			type: String,
			default: "primary",
		},
		size: {
			type: String,
			default: "button",
		},
		disabled: {
			type: String,
			default: false,
		},
	});
</script>
