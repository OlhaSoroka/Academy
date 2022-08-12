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
        :class="['base-input', {'!border-red-700': errors.length > 0}]"
        v-on="listeners"
      >
      <p class="text-red-700 text-xs w-72 -ml-2 text-center absolute">
        <span v-if="errors.length > 0 && vid === 'password'">
          6 chars min with at least 1 Latin letter and 1 number.
        </span>
        <span v-if="errors.length > 0 && vid === 'confirmpassword'">
          Passwords do not match.
        </span>        
        <span v-if="errors.length > 0 && label === 'Full Name'">
          Full Name is empty.
        </span>        
        <span v-if="errors.length > 0 && vid != 'confirmpassword' && vid != 'password' && label != 'Full Name'">{{ errors[0] }}</span>
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
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      emailRules: "required|email",
      passwordRules: "required|min:6|regex:[A-Za-z]+[0-9]+",
      initialScoreRules: "required|min_value:0"
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
      } else if (this.type === "password" && this.vid != "text") {
        return `${this.passwordRules}|${this.rules}`;
      } else if (this.type === 'number')  return `${this.initialScoreRules}`;
      else return `${this.rules}`;
    },
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="postcss" scoped>
.base-input {
  @apply block p-1 m-1 w-64 ml-1 border-2 border-sky-700 rounded-md text-base font-mono placeholder:text-slate-400 hover:bg-stone-50 focus:drop-shadow-xl focus:bg-stone-50 focus:border-sky-700 focus:outline-none focus:text-cyan-900;
}
</style>
