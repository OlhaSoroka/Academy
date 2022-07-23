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
          v-if="isLogin"
          v-model="formData.password"
          type="password"
          label="Password"
          vid="password"
          placeholder="qwe123"          
        />
        <BaseButton 
          v-if="isLogin"
          variant="btn_green" 
          type="submit"> 
          Submit 
        </BaseButton>        
      </form>
      <p class="text-pink-400">
        {{ errorHandler.message }}
      </p>            
    </ValidationObserver>
    <BaseButton 
          v-if="!isLogin"
          variant="btn_green" 
          @click="resetPasswordOnEmail"
          > 
          Reset Password 
        </BaseButton>
    <p 
          v-if="isLogin"
          class="link" 
          @click="goToReset"
          >
          Reset password
    </p>
    <p class="text-pink-400">
        {{ errorResetHandeler.message }}
    </p>                
    <p     
          v-if="!isLogin"
          class="link" 
          @click="goToLogin">
          Log in page
    </p>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
import { mapGetters, mapActions } from "vuex";
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import { resetPassword } from '@/api/user';

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
    },
    isLogin: true,
    errorResetHandeler: {
      isError: false,
      message: ''
    },
    checkEmailMessage: ''
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
    },
    resetPasswordOnEmail() {            
      this.isLogin = false
      this.errorResetHandeler.message = ''
      this.errorResetHandeler.isError = false
      resetPassword({'email': this.formData.email})         
      .then (response => {        
        this.isLogin = true        
        return response
      })
      .catch((error) => {                              
          console.log(error.response.data)                              
          this.errorResetHandeler.message = error.response.data
          this.errorResetHandeler.isError = true
        });
    },  
    goToLogin(){
      this.isLogin = true
      this.errorResetHandeler.message = ''
    },  
    goToReset(){
      this.isLogin = false
    }
  },
};
</script>

<style lang="postcss" scoped>
.link {
  @apply mx-2 cursor-pointer text-center hover:opacity-75 transition-opacity underline;
}
</style>