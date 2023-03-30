<template>
	<transition name="fade">
		<div v-if="toastStore.shouldShowToast" class="toast" :class="isFailure() ? 'toast_failure' : 'toast_success'">
			<div>
				<div class="toast__dialog">
					<div :class="isFailure() ? 'toast__header_failure' : 'toast__header_success'">
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
import { defineComponent } from "vue";
import { useToastStore, ToastType } from "../store/toast.store"
export default defineComponent({
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
});
</script>
  
<style lang="postcss" scoped>
.toast {
	@apply fixed bottom-0 right-0 m-8 rounded-md shadow-md  bg-stone-50;
}

.toast__dialog {
	@apply w-80 rounded-md z-20 p-3;
}
.toast_success {
	@apply border border-primary-700
}
.toast_failure {
	@apply border border-red-500
}
.toast__header_success {
	@apply font-bold text-xl text-primary-600;
}
.toast__header_failure {
	@apply font-bold text-xl text-red-500;
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
  



