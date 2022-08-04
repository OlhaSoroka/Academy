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
            :variant="'btn_blue'"
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
        :variant="'btn_blue'"
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
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getAllUsers } from "@/api/user";

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
    async onSubmit() {
      const auth = getAuth()
      try{
      const { user } = await signInWithEmailAndPassword(auth, this.formData.email, this.formData.password)
      const { accessToken, email } = user
      const users = await getAllUsers(accessToken)
      const currentUser = users.find((userOfArray) => (userOfArray.email === email))
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem('email', email)
      localStorage.setItem('user', JSON.stringify(currentUser))
      this.setUser(currentUser)
      this.errorHandler.isError = false
      this.errorHandler.message = ''
      this.$router.push({ name: "courses-dashboard" })
      }            
      catch(error) {
          console.log(error.message)
          this.errorHandler.isError = true
          this.errorHandler.message = error.message
          this.logoutUser()
      }
    },
    logout() {
      this.logoutUser();
      this.setUser({});
      localStorage.removeItem('user')
    },
    resetPasswordOnEmail() {
      this.isLoginPage = false;
      this.errorResetHandeler.message = "";
      this.errorResetHandeler.isError = false;
      const auth = getAuth();
      sendPasswordResetEmail( auth, this.formData.email)
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
  @apply mx-2 cursor-pointer text-end hover:opacity-75 transition-opacity underline text-xs;
}
</style>
