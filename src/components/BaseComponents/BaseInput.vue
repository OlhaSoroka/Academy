<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="label || vid"
    :vid="vid"
    :rules="allRules"
  >
    <div class="mb-6">
      <label
        v-if="label"
        class="block ml-1 text-start"
      >{{ label }}</label>
      <input
        v-bind="$attrs"
        v-model="model"
        :type="type"
        class="BaseInput"
        v-on="listeners"
      >
      <p
        class="text-center text-red-700 text-sm w-64 ml-1 absolute"
      >
        {{ errors[0] }}
      </p>
    </div>
  </ValidationProvider>
</template>

<script>
/* use example: <ValidationObserver>
        <BaseInput type="password" label="Password" vid="password" placeholder="qwe123"/>
      <BaseInput type="password" label="ConfirmPassword" rules="confirmed:password" placeholder="qwe123"/>
      </ValidationObserver> */
import { ValidationProvider } from "vee-validate";
import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

export default {
  components: {
    ValidationProvider,
  },

  inheritAttrs: false,
  props: {
    label: {
      type: [String, Boolean],
      default: false,
    },
    rules: {
      type: String,
      default: "",
    },
    vid: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      emailRules: "required|email",
      passwordRules: "min:6|regex:[A-Za-z]+[0-9]+",
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    listeners() {
      return {
        ...this.$listeners,
        input: (event) => this.onInput(event.target.value),
      };
    },
    allRules() {
      if (this.type === "email") {
        return `${this.emailRules}|${this.rules}`;
      } else if (this.type === "password") {
        return `${this.passwordRules}|${this.rules}`;
      } else return `${this.rules}`;
    }
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="postcss" scoped>
.BaseInput {
  @apply block p-1 m-1 w-64 ml-1 border-2 border-sky-700 rounded-md text-base font-mono placeholder:text-slate-400 hover:bg-stone-50 focus:drop-shadow-xl focus:bg-stone-50 focus:border-sky-700 focus:outline-none focus:text-cyan-900;
}
</style>
