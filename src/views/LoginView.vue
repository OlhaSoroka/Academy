<template>
  <div class="loginview">
    <h1 class="text-pink-400">
      This is LOGIN page
    </h1>    
    <div class="max-w-xl mx-auto px-4">
      <div class="rounded-lg shadow-lg p-4">
        <LoginForm />
        <p 
          class="link" 
          @click="sendPasswordToEmail">
          Send Password to Email
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import { mapGetters } from "vuex";

export default {
  name: "LoginView",
  components: {
    LoginForm,
  },
  data() {
    return {      
    };
  },
  computed: {
    ...mapGetters(["user", "accessToken"]),
  },
  methods: {
    sendPasswordToEmail() {},    
  },
};
</script>

<style lang="postcss" scoped>
.link {
  @apply mx-2 cursor-pointer text-center hover:opacity-75 transition-opacity underline;
}
</style>
