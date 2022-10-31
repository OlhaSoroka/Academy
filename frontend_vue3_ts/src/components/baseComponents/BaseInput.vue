<template>
  <div>
    <label v-if="label" :for="name" class="ml-1 block text-start">
      {{ label }}
    </label>
    <Field
      :id="name"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="updateInput"
      class="base-input"
      :rules="allRules"
      :name="name"
    />
    <ErrorMessage :name="type" class="base-input-error-text" />
  </div>
</template>

<script lang="ts">
import AllRules from "@vee-validate/rules";
import { Form, Field, defineRule, ErrorMessage } from "vee-validate";
import { defineComponent } from "vue";

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

export default defineComponent({
  name: "BaseInput",
  components: {
    Form,
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
  name: {
    type: String,
    required: true,
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
      emailRules: "required|email",
      passwordRules: "required|min:6|regex:[A-Za-z]+[0-9]+",
      numberRules: "min_value:0",
    };
  },
  computed: {
    allRules() {
      if (this.type === "email") {
        return `${this.emailRules}|${this.rules}`;
      } else if (this.type === "password") {
        return `${this.passwordRules}|${this.rules}`;
      } else if (this.type === "number") {
        return `${this.numberRules}|${this.rules}`;
      } else return `${this.rules}`;
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
.base-input {
  @apply m-1 ml-1 mb-4 relative block w-full max-w-md rounded-md border-2 border-primary-700 p-1 font-mono text-base placeholder:text-slate-400 hover:bg-stone-50 focus:border-primary-700 focus:bg-stone-50 focus:text-cyan-900 focus:outline-none focus:drop-shadow-xl;
}

.base-input:disabled {
  @apply border-gray-300 bg-gray-50;
}
.base-input-error-text {
  @apply absolute text-xs mt-[-15px] text-red-500 ml-1;
}
</style>
