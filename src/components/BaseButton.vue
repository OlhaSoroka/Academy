<template>
  <button
    :class="classes"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
/*use example: after import =>  "<BaseButton variant='btn_red' @click="handleClick"> Delete </BaseButton>"*/
export default {
	props: {
		variant: {
			type: String,
			default: 'btn_green',
			validator: (value) => ['btn_green', 'btn_black', 'btn_red', 'btn_blue'].includes(value),
		},
	},
	computed: {
		classes() {
			return `btn ${this.variant}`;
		},
	},
};
</script>

<style lang="postcss" scoped>
.btn {
	@apply p-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
}

.btn_green {
	@apply bg-emerald-500 hover:bg-emerald-700;
}

.btn_red {
	@apply bg-red-500 hover:bg-red-700;
}

.btn_black {
	@apply bg-stone-500 hover:bg-stone-700;
}
.btn_blue {
	@apply bg-sky-700 hover:bg-sky-900;
}

</style>
