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
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'

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
    ...mapActions(["setUser", "logoutUser"]),
    onSubmit() {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, this.formData.email, this.formData.password)
      .then(response => {
        localStorage.setItem("user", JSON.stringify(response.user));
        this.setUser(response.user)        
        this.errorHandler.isError = false
        this.errorHandler.message = ''        
        this.$router.push({ name: "courses-dashboard"} )
      })       
       .catch((error) => {          
          console.log(error.message)
          this.errorHandler.isError = true
          this.errorHandler.message = error.message
          this.logout();                    
        });
    },
    logout() {      
      this.logoutUser();
      this.setUser({});      
    }
  },
};
</script>

<style lang="postcss" scoped>

</style>
