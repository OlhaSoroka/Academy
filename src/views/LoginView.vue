<template>
  <div class="loginview">
    <h1 class="text-pink-400">This is LOGIN page</h1>    
    {{user.email}}    
    <div class="max-w-xl mx-auto px-4">
      <div class="rounded-lg shadow-lg p-4">
        <LoginForm @submitAuth="authSubmitted" />
        <p
          class="
            mx-2
            cursor-pointer
            text-center
            hover:opacity-75
            transition-opacity
            underline
          "
          @click="getAllUsers1"
        >
          Send Password to Email
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import { mapGetters } from "vuex";
import { getAllUsers} from "@/api/user/index";

export default {
  name: "LoginView",
  components: {
    LoginForm,
  },
  data() {
    return {
      authSubmitted: Object,            
    };
  },
  computed: {
    ...mapGetters( ['user', 'accessToken'] ),     
  },
  methods: {
    sendPasswordToEmail() {},
    getAllUsers1() {
      console.log(getAllUsers(this.accessToken))       
    }
  },
};
</script>

<style scoped>
</style>
