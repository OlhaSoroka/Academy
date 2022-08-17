<template>
  <button
    :class="[classes, { btn_disabled: disabled }]"
    :disabled="disabled"
    v-on="$listeners"
  >
    <div v-if="loading">
      <div class="btn_loading" />
    </div>
    <slot v-else />
  </button>
</template>

<script>
/*use example: after import =>  "<BaseButton variant='btn_red' @click="handleClick"> Delete </BaseButton>"*/
export default {
  props: {
    variant: {
      type: String,
      default: "btn_blue",
      validator: (value) =>
        ["btn_green", "btn_black", "btn_red", "btn_blue"].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
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
  @apply min-h-[40px] p-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
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
.btn_disabled {
  @apply opacity-50 pointer-events-none;
}
.btn_loading {
  @apply w-6 h-6 border-4 border-white border-double border-t-transparent rounded-full animate-spin mx-auto;
}
.btn_blue {
  @apply bg-sky-700 hover:bg-sky-900;
}
</style>
