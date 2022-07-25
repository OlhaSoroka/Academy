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
          @click="sendPasswordToEmail"
        >
          Send Password to Email
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllUsers } from "@/api/user";
import LoginForm from "@/components/LoginForm";
import { mapActions, mapGetters } from "vuex";
import { COURSE_DASHBOARD } from '@/constants/routes.constant';

export default {
  name: "LoginView",
  components: {
    LoginForm,
  },

  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(["user"]),
  },
  async mounted() {
    const token = localStorage.getItem('accessToken')
    if (token) {
      const result = await this.isTokenAlive(token)
      if (result) {
        const thisEmail = localStorage.getItem('email')
        const currentAcc = result.find(acc => acc.email === thisEmail)
        this.setUser(currentAcc)
        this.$router.push({ name: COURSE_DASHBOARD })
      }
    }
  },
  methods: {
    ...mapActions('user', ['setUser']),
    async isTokenAlive(token) {
      try {
         await getAllUsers(token)
        return !!true 
      } catch (err) {
        return false
      }
    }
  },
};
</script>

<style lang="postcss" scoped>
.link {
  @apply mx-2 cursor-pointer text-center hover:opacity-75 transition-opacity underline;
}
</style>
