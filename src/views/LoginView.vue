<template>
  <div>
    <div
      v-if="!initialLoading"
      class="flex h-full"
    >
      <div class="login__sidebar_container">
        <div>
          <div class="login__img_container">
            <img
              class="login__img"
              src="../assets/inventor_logo.jpg"
              alt="logo"
            >
          </div>
        </div>
      </div>
      <div class="login__form_container">
        <div class="login__header">
          Wellcome to InventorSoft Academy
          <div class="login__subheader">
            Login to continue
          </div>
        </div>
        <div class="login__form_wrapper">
          <div class="max-w-xl mx-auto px-4">
            <div class="rounded-lg shadow-lg p-4">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
    <BaseSpinner v-else />
  </div>
</template>

<script>
import { getAllUsers } from "@/api/user";
import LoginForm from "@/components/LoginForm";
import BaseSpinner from "../components/BaseComponents/BaseSpinner/BaseSpinner.vue";
import { mapActions, mapGetters } from "vuex";
import { COURSE_DASHBOARD } from "@/constants/routes.constant";

export default {
  name: "LoginView",
  components: {
    LoginForm,
    BaseSpinner,
  },
  data() {
    return {
      initialLoading: true,
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
  },
  async mounted() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const result = await this.isTokenAlive(token);
      if (result) {
        const thisEmail = localStorage.getItem("email");
        const users = await getAllUsers(token);
        const currentAcc = users.find((acc) => acc.email === thisEmail);
        this.setUser(currentAcc);
        localStorage.setItem("user", JSON.stringify(currentAcc));
        this.$router.push({ name: COURSE_DASHBOARD });
      }
    }
    this.initialLoading = false;
  },
  methods: {
    ...mapActions("user", ["setUser"]),
    async isTokenAlive(token) {
      try {
        await getAllUsers(token);
        return true;
      } catch (err) {
        return false;
      }
    },
  },
};
</script>
<style lang="postcss" scoped>
.login__sidebar_container {
  @apply w-1/4 bg-sky-800 flex items-center justify-center;
}
.login__img_container {
  @apply flex justify-center items-center;
}
.login__img {
  @apply bg-white rounded-full w-3/5;
}
.login__form_container {
  @apply flex flex-col my-auto mx-auto;
}
.login__header {
  @apply text-3xl text-stone-700 mb-5;
}
.login__subheader {
  @apply text-lg text-stone-700 mt-7;
}
.login__form_wrapper {
  @apply flex justify-center items-center mx-auto;
}
.login__link {
  @apply mx-2 cursor-pointer text-end text-xs hover:opacity-75 transition-opacity underline mb-2 mt-2;
}
</style>
