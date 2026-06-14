<template>
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
</template>
<script setup>
	defineProps({
		label: String,
		modelValue: [String, Number],
		type: {
			type: String,
			default: "text",
		},
		prefix: String,
	});

	defineEmits(["update:modelValue"]);
</script>
