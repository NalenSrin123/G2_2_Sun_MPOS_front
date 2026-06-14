<template>
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
</template>
<script setup>
	defineProps({
		title: String,
		value: [String, Number],
		status: {
			type: String,
			default: "default",
		},
	});
</script>
