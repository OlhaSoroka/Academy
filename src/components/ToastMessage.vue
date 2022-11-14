<template>
	<transition name="fade">
		<div v-if="toastStore.shouldShowToast" class="toast" :class="isFailure() ? 'bg-red-300' : 'bg-green-300'">
			<div>
				<div class="toast__dialog">
					<div class="toast__header">
						{{ toastStore.messageType }}
					</div>
					<div class="toast__body">
						{{ toastStore.toastMessage }}
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
  
<script lang="ts">
import { mapStores } from "pinia";
import { useToastStore, ToastType } from "../store/toast.store"
export default {
	data() {
		return {
			header: "header",
		};
	},
	computed: {
		...mapStores(useToastStore),

	},
	methods: {
		isFailure() {
			return this.toastStore.messageType === ToastType.FAILURE
		}
	}
};
</script>
  
<style lang="postcss" scoped>
.toast {
	@apply fixed bottom-0 right-0 m-8 rounded-md shadow-md;
}

.toast__dialog {
	@apply w-80 rounded-md z-20 p-3;
}

.toast__header {
	@apply font-bold text-xl text-stone-800;
}

.toast__body {
	@apply overflow-auto text-stone-800;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
  