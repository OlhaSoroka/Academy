<template>
  <div>
    <label v-if="label" class="ml-1 block text-base font-semibold">
      {{ label }}
    </label>
    <Field v-bind="$attrs" :type="type" :value="value" :placeholder="placeholder" @input="updateInput"
      class="base-input" :rules="allRules" :name="label" :validate-on-input="true" />
    <ErrorMessage :name="label" class="base-input-error-text" />
  </div>
</template>

<script lang="ts">
import AllRules from "@vee-validate/rules";
import { Field, defineRule, ErrorMessage } from "vee-validate";
import { defineComponent } from "vue";

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

export default defineComponent({
  name: "BaseInput",
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    rules: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      emailRules: "email",
      passwordRules: "min:6|regex:[A-Za-z]+[0-9]+",
      numberRules: "min_value:0",
    };
  },
  computed: {
    allRules() {
      switch (this.type) {
        case "email":
          return `${this.emailRules}|${this.rules}`;
        case "password":
          return `${this.passwordRules}|${this.rules}`;
        case "number":
          return `${this.numberRules}|${this.rules}`;
        default:
          return `${this.rules}`;
      }
    },
  },
  methods: {
    updateInput(event: any) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
});
</script>

<style lang="scss" scoped>
.base-input {
  @apply relative block w-full max-w-md rounded-sm border-2  border-primary-600 p-1 font-mono text-base placeholder:text-slate-400 hover:bg-stone-50 focus:border-stone-500 focus:bg-stone-50 focus:outline-none focus:drop-shadow-md;
}

.base-input:disabled {
  @apply border-gray-300 bg-gray-50;
}

.base-input-error-text {
  @apply absolute text-xs mt-[-15px] text-red-500 ml-1;
}
</style>
