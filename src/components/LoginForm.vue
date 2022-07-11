<template>
  <div class="loginform">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <BaseInput type="email" 
        label="Email" 
        vid="email"         
        placeholder="aaa@gmail.com"
        @input="receiveEmail"/>
        
        <BaseInput type="password" 
        label="Password" 
        vid="password"        
        placeholder="qwe123"
        @input="receivePassword"/>
 
        <BaseButton variant="btn_green" 
        @click="onSubmit"> Submit </BaseButton>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import BaseButton from "@/components/BaseButton";
import BaseInput from '@/components/BaseInput'
import { mapActions } from "vuex";

export default {
  name: "LoginForm",
  components: {    
    ValidationObserver,
    BaseButton,
    BaseInput
  },
  data: () => ({
    formData: {
      email: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions(["setUserToState"]),
    onSubmit() {
      this.login(this.formData.email, this.formData.password);
    },
    receiveEmail(email){
      this.formData.email = email  
    },
    receivePassword(password){
      this.formData.password = password 
    },
    login(email, password) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      };
      return fetch(
        "https://inventorsoft-vue-2022-users.herokuapp.com/firebase/login",
        requestOptions
      )
        .then(this.handleResponse)
        .then((user) => {
          if (user.stsTokenManager) {
            localStorage.setItem("user", JSON.stringify(user));
            this.setUserToState(user);
          }
          return user;
        });
    },
    logout() {
      localStorage.removeItem("user");
    },
    handleResponse(response) {
      return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
          if (response.status === 401) {
            this.logout();
          }
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        return data;
      });
    },
  },
};
</script>
