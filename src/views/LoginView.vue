<template>
  <div
    v-if="!initialLoading"
    class="loginview"
  >
    <h1 class="text-pink-400">
      This is LOGIN page
    </h1>
    <div class="max-w-xl mx-auto px-4">
      <div class="rounded-lg shadow-lg p-4">
        <LoginForm />
        <!-- uncommed it when Yurii do reset pass reset feature-->
        <!-- <p
          @click=""
          class="link"
        >
          Send Password to Email
        </p> -->
      </div>
    </div>
  </div>
  <BaseSpinner v-else />
</template>

<script>
import { getAllUsers } from "@/api/user";
import LoginForm from "@/components/LoginForm";
import BaseSpinner from '../components/BaseComponents/BaseSpinner/BaseSpinner.vue'
import { mapActions, mapGetters } from "vuex";
import { COURSE_DASHBOARD } from '@/constants/routes.constant';

export default {
  name: "LoginView",
  components: {
    LoginForm,
    BaseSpinner
  },

  data() {
    return {
      initialLoading: true,
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
        const users = await getAllUsers(token)
        const currentAcc = users.find(acc => acc.email === thisEmail)
        this.setUser(currentAcc)
        this.$router.push({ name: COURSE_DASHBOARD })
      }
    }
    this.initialLoading = false;

  },
  methods: {
    ...mapActions('user', ['setUser']),
    async isTokenAlive(token) {
      try {
        await getAllUsers(token)
        return true
      } catch (err) {
        return false
      }
    },
  }
}
</script>
