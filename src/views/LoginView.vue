<template>
  <div class="login-page-container relative">
    <div class="login-page-shader">
      <div class="w-1/5">
        <div class="login-title">
          Academy Application
        </div>
        <div class="login-form-container">
          <div class="flex justify-center mb-2">
            <img
              class="login-form-logo"
              src="../assets/logo-h.svg"
              alt="main_logo"
            >
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
    <div class="login-link absolute bottom-0 right-0">
      Copyright © <a
        class="text-primary-700 text-xs font-semibold"
        href="https://inventorsoft.co/"
      >InventorSoft</a>
    </div>
  </div>
</template>

<script>
import { getAllUsers } from '@/api/user';
import LoginForm from '@/components/LoginForm';
// import BaseSpinner from "../components/BaseComponents/BaseSpinner/BaseSpinner.vue";
import { mapActions, mapGetters } from 'vuex';
import { COURSE_DASHBOARD } from '@/constants/routes.constant';

export default {
	name: 'LoginView',
	components: {
		LoginForm,
		// BaseSpinner,
	},
	data() {
		return {
			initialLoading: true,
		};
	},
	computed: {
		...mapGetters('user', ['user']),
	},
	async mounted() {
		const token = localStorage.getItem('accessToken');
		if (token) {
			const result = await this.isTokenAlive(token);
			if (result) {
				const thisEmail = localStorage.getItem('email');
				const users = await getAllUsers(token);
				const currentAcc = users.find((acc) => acc.email === thisEmail);
				this.setUser(currentAcc);
				localStorage.setItem('user', JSON.stringify(currentAcc));
				this.$router.push({ name: COURSE_DASHBOARD });
			}
		}
		this.initialLoading = false;
	},
	methods: {
		...mapActions('user', ['setUser']),
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
.login-page-container {
	background: url('../assets/login_page_image.jpg');
}
.login-page-shader {
	@apply w-full h-full bg-gradient-to-b from-white to-transparent flex justify-center items-center;
}
.login-form-container {
	@apply bg-white p-8 rounded-lg shadow-2xl;
}
.login-form-wrapper {
}
.login-form-logo {
	@apply w-1/2;
}
.login-title {
	@apply font-semibold text-3xl p-4 from-neutral-900;
}
.login-link {
	@apply font-light text-xs p-4 text-white flex justify-end items-end;
}
</style>
