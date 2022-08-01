<template>
  <transition name="fade">
    <div
      v-if="show"
      class="toast"
      :class="isError ? 'bg-red-500' : 'bg-green-300'"
    >
      <div>
        <div class="toast__dialog">
          <div class="toast__header">
            {{ type }}
          </div>
          <div class="toast__body">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'ToastMessage',
	data() {
		return {
			header: 'header',
		};
	},
	computed: {
		...mapGetters('toast', ['show', 'message', 'type']),
		isError() {
			return this.type === 'error';
		},
	},
};
</script>

<style lang="postcss" scoped>
.toast {
	@apply fixed bottom-0 right-0 m-8 rounded-md shadow-md;
}

.toast__dialog {
	@apply  w-80 rounded-md z-20 p-3;
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
