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
            class="my-3"
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
    </ValidationObserver>
    <div v-if="!isLoginPage">
      <BaseButton
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
    errorResetHandler: {
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
          this.errorHandler.isError = true
          switch (error.code) {
            case 'auth/user-not-found':
              this.errorHandler.message = 'No user with such email.'
              break
            case 'auth/wrong-password': 
              this.errorHandler.message = 'The password is invalid'
              break            
            default:
              this.errorHandler.message = error.code;
          }          
          this.$store.dispatch('toast/show', { message: this.errorHandler.message, type: 'error' }, { root: true });
          this.logoutUser()
      }
    },
    logout() {
      this.logoutUser();
    },
    resetPasswordOnEmail() {
      this.isLoginPage = false;
      this.errorResetHandler.message = "";
      this.errorResetHandler.isError = false;
      const auth = getAuth();
      sendPasswordResetEmail( auth, this.formData.email)
        .then((response) => {
          this.isLoginPage = true;
          this.$store.dispatch(
					"toast/show",
					{ message: "Check your email for letter", type: "success" },
					{ root: true }
				)        
          return response;
        })
        .catch((error) => {          
          if (error.code == "auth/user-not-found") this.errorResetHandler.message = "No user whit such email."
             else this.errorResetHandler.message = error.code
          this.errorResetHandler.isError = true;          
          this.$store.dispatch('toast/show', { message: this.errorResetHandler.message, type: 'error' }, { root: true });       
        });
    },
    goToLoginPage() {
      this.isLoginPage = true;
      this.errorResetHandler.message = "";
    },
    goToResetPage() {
      this.isLoginPage = false;
      this.errorHandler.message = "";
    },
  },
};
</script>

<style lang="postcss" scoped>
.link {
  @apply mx-2 cursor-pointer text-end hover:opacity-75 transition-opacity underline text-xs;
}
</style>
