<template>
  <div class="loginform">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <BaseInput
          v-model="formData.email"
          type="email"
          label="Email"
          vid="email"
          placeholder="aaa@gmail.com"
        />
        <div v-if="isLoginPage">
          <BaseInput
            v-model="formData.password"
            type="password"
            label="Password"
            vid="password"
            placeholder="qwe123"
          />
          <BaseButton
            variant="btn_green"
            type="submit"
          >
            Submit
          </BaseButton>
          <p
            class="link"
            @click="goToResetPage"
          >
            Reset password
          </p>
        </div>
      </form>
      <p class="text-pink-400">
        {{ errorHandler.message }}
      </p>
    </ValidationObserver>
    <div v-if="!isLoginPage">
      <BaseButton
        variant="btn_green"
        @click="resetPasswordOnEmail"
      >
        Reset Password
      </BaseButton>
      <p
        class="link"
        @click="goToLoginPage"
      >
        Log in page
      </p>
    </div>
    <p class="text-pink-400">
      {{ errorResetHandeler.message }}
    </p>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import BaseButton from "@/components/BaseComponents/BaseButton";
import BaseInput from "@/components/BaseComponents/BaseInput";
import { mapGetters, mapActions } from "vuex";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { resetPassword } from "@/api/user";

export default {
  name: "LoginForm",
  components: {
    ValidationObserver,
    BaseButton,
    BaseInput,
  },
  data: () => ({
    formData: {
      email: "",
      password: "",
    },
    errorHandler: {
      isError: false,
      message: "",
    },
    isLoginPage: true,
    errorResetHandeler: {
      isError: false,
      message: "",
    },
  }),
  computed: {
    ...mapGetters('user', ["user"]),
  },
  methods: {
    ...mapActions('user', ["setUser", "logoutUser"]),
    onSubmit() {
      const auth = getAuth();
      signInWithEmailAndPassword(
        auth,
        this.formData.email,
        this.formData.password
      )
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.user));
          this.setUser(response.user);
          this.errorHandler.isError = false;
          this.errorHandler.message = "";
          this.$router.push({ name: "courses-dashboard" });
        })
        .catch((error) => {
          this.errorHandler.isError = true;
          this.errorHandler.message = error.message;
          this.logout();
        });
    },
    logout() {
      this.logoutUser();
      this.setUser({});
    },
    resetPasswordOnEmail() {
      this.isLoginPage = false;
      this.errorResetHandeler.message = "";
      this.errorResetHandeler.isError = false;
      resetPassword({ email: this.formData.email })
        .then((response) => {
          this.isLoginPage = true;
          return response;
        })
        .catch((error) => {
          console.log(error.response.data);
          this.errorResetHandeler.message = error.response.data;
          this.errorResetHandeler.isError = true;
        });
    },
    goToLoginPage() {
      this.isLoginPage = true;
      this.errorResetHandeler.message = "";
    },
    goToResetPage() {
      this.isLoginPage = false;
    },
  },
};
</script>

<style lang="postcss" scoped>
.link {
  @apply mx-2 cursor-pointer text-center hover:opacity-75 transition-opacity underline;
}
</style>
