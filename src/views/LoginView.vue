<template>
  <div class="loginview">
    <h1 class="text-pink-400">
      This is LOGIN page
    </h1>
    <div class="max-w-xl mx-auto px-4">
      <div class="rounded-lg shadow-lg p-4">
        <LoginForm />
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
  computed: {
    ...mapGetters(["user", "accessToken"]),
  },
};
</script>
