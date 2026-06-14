<template>
	<Teleport to="body">
		<Transition
			enter-active-class="transition duration-200 ease-out"
			enter-from-class="opacity-0 scale-95"
			enter-to-class="opacity-100 scale-100"
			leave-active-class="transition duration-150 ease-in"
			leave-from-class="opacity-100 scale-100"
			leave-to-class="opacity-0 scale-95">
			<div
				v-if="isOpen"
				class="fixed inset-0 z-50 flex items-center justify-center p-4">
				<div
					class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
					@click="$emit('close')"></div>

				<div
					class="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full p-6 relative z-10">
					<button
						@click="$emit('close')"
						class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition">
						✕
					</button>

					<slot />
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
	defineProps({
		isOpen: Boolean,
	});
	defineEmits(["close"]);
</script>
