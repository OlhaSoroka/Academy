<template>
  <div class="loginform">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <BaseInput
          type="email"
          label="Email"
          vid="email"
          placeholder="aaa@gmail.com"
          @input="receiveEmail"
        />

        <BaseInput
          type="password"
          label="Password"
          vid="password"
          placeholder="qwe123"
          @input="receivePassword"
        />

        <BaseButton 
          variant="btn_green" 
          type="submit"> 
          Submit 
        </BaseButton>
      </form>
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
  }),
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["setUser"]),
    onSubmit() {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, this.formData.email, this.formData.password)
      .then(response => {
        localStorage.setItem("user", JSON.stringify(response.user));
        this.setUser(response.user);        
      })       
       .catch((error) => {
          console.log(error.message);
          this.setUser({});
          localStorage.removeItem("user");
        });
    },
    receiveEmail(email) {
      this.formData.email = email;
    },
    receivePassword(password) {
      this.formData.password = password;
    },    
    
  },
};
</script>
