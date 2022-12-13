<template>
  <button :class="[classes, { btn_disabled: disabled }]" :disabled="disabled" class="btn_green" :type="type">
    <div v-if="loading">
      <div class="btn_loading" />
    </div>
    <slot v-else />
  </button>
</template>
  
<script  lang="ts">
/*use example: after import =>  "<BaseButton variant='btn_red' @click="handleClick"> Delete </BaseButton>"*/
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    variant: {
      type: String,
      default: "btn_blue",
      validator: (value: string) =>
        ["btn_blue", "btn_red_outlined", "btn_blue_outlined"].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    buttonType: {
      type: String,
      default: "button",
    },
  },
  computed: {
    classes() {
      return `btn ${this.variant}`;
    },
    type() {
      return this.buttonType as "button" | "submit" | "reset"
    }
  },
});
</script>
  
<style lang="postcss" scoped>
.btn {
  @apply w-max min-h-[42px] p-2 px-4 text-white font-semibold rounded-sm shadow-sm focus:outline-none transition-colors
}


.btn_red_outlined {
  @apply border border-red-500 text-red-500 hover:bg-red-500 hover:text-white ;
}

.btn_disabled {
  @apply opacity-50 pointer-events-none;
}

.btn_loading {
  @apply w-6 h-6 border-4 border-white border-double border-t-transparent rounded-full animate-spin mx-auto;
}

.btn_blue {
  @apply bg-primary-700 hover:bg-primary-900;
}
.btn_blue_outlined {
  @apply border border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white;
}
</style>
  