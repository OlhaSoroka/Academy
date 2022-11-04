<template>
  <div>
    <label
      for="applicants"
      class="ml-1 block font-medium text-gray-900 dark:text-gray-400"
      >Select an option</label
    >
    <select id="applicants" class="select" @input="updateInput">
      <option selected disabled>Select an option</option>
      <option v-for="option in options" :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
export default defineComponent({
  data() {
    return {
      selected: "",
    };
  },
  props: {
    options: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
  },
  methods: {
    updateInput(event: any) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
});
</script>

<style lang="postcss" scoped>
.select {
  @apply m-1 ml-1 block w-full rounded-md border-2 border-primary-700 p-1 font-mono text-base placeholder:text-slate-400 hover:bg-stone-50 focus:border-primary-700 focus:bg-stone-50 focus:text-cyan-900 focus:outline-none focus:drop-shadow-xl disabled:border-gray-300 disabled:bg-gray-50;
}
</style>
