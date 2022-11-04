<template>
    <button
      :class="[classes, { btn_disabled: disabled }]"
      :disabled="disabled"
      class="btn_green"
    >
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
        validator: (value:string) =>
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
      submit: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      classes() {
        return `btn ${this.variant}`;
      },
    },
    methods: {
      hello() {
        console.log("Hello from button");
        
      }
    }
  });
  </script>
  
  <style lang="postcss" scoped>
  .btn {
    @apply min-h-[40px] p-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none}
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
    @apply bg-primary-700 hover:bg-primary-900;
  }
  </style>
  