<template>
  <Form>
    <label v-if="label" :for="id" class="ml-1 block text-start">
      {{ label }}
    </label>
    <Field
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateInput"
      class="base-input"
      :rules="allRules"
      :name="type"
    />
    <ErrorMessage :name="type" class="base-input-error-text" />
  </Form>
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
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    rules: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
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
  @apply m-1 ml-1 block w-full max-w-md rounded-md border-2 border-primary-700 p-1 font-mono text-base placeholder:text-slate-400 hover:bg-stone-50 focus:border-primary-700 focus:bg-stone-50 focus:text-cyan-900 focus:outline-none focus:drop-shadow-xl;
}

.base-input:disabled {
  @apply border-gray-300 bg-gray-50;
}
.base-input-error-text {
  @apply text-xs text-red-500 ml-1;
}
</style>
