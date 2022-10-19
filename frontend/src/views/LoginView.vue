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
      Copyright ©<a
        class="text-primary-700 text-xs font-semibold mx-1"
        href="https://inventorsoft.co/"
      >InventorSoft</a>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm';

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
	async mounted() {
		this.initialLoading = false;
	},
};
</script>
<style lang="postcss" scoped>
.login-page-container {
	background: center / cover no-repeat url("../assets/login_page_bg.jpg");
}
.login-page-shader {
	@apply w-full h-full bg-gradient-to-b from-white to-transparent flex justify-center items-center;
}
.login-form-container {
	@apply bg-white p-8 rounded-lg shadow-2xl;
}

.login-form-logo {
	@apply w-1/2;
}
.login-title {
	@apply font-semibold text-3xl p-4 from-neutral-900;
}
.login-link {
	@apply font-light text-xs p-4 text-black flex justify-end items-end;
}
</style>
