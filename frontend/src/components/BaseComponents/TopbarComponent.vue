<template>
  <div
    v-if="!!user"
    class="bg-primary-700 p-3 text-white text-2xl flex items-center"
  >
    <div
      class="flex items-center pr-4 cursor-pointer"
      @click="toggleNavigationMenu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-list"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
    </div>
    <div>Academy</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters('user', ['user']),
	},
	methods: {
		toggleNavigationMenu() {
			this.$emit('onMenuToggle');
		},
	},
};
</script>

<style scoped></style>
