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
      </form>
      <p class="text-pink-400">
        {{ errorHandler.message }}
      </p>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
import { mapGetters, mapActions } from "vuex";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
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
      message: ''
    }
  }),
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions('user', ["setUser", "logoutUser"]),
    async onSubmit() {
      const auth = getAuth()
      const { user } = await signInWithEmailAndPassword(auth, this.formData.email, this.formData.password)
      const { accessToken, email } = user

      const users = await getAllUsers(accessToken)

      const currentUser = users.find((userOfArray) => (userOfArray.email = email))
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem('email', email)
      this.setUser(currentUser)

      this.errorHandler.isError = false
      this.errorHandler.message = ''

      this.$router.push({ name: "courses-dashboard" })

      .catch((error) => {
        console.log(error.message)

        this.errorHandler.isError = true
        this.errorHandler.message = error.message

        this.logoutUser();
      });

    },
  },
};
</script>

<style lang="postcss" scoped>
</style>
