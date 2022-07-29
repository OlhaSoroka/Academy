<template>
  <div class="flex">
    <div
      class="login__sidebar_container"
    >
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
        <div
          class="max-w-xl mx-auto px-4"
        >
          <div class="rounded-lg shadow-lg p-4">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm';
import { mapGetters } from 'vuex';

export default {
	name: 'LoginView',
	components: {
		LoginForm,
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters(['user', 'accessToken']),
	},
	methods: {
		sendPasswordToEmail() {},
	},
};
</script>

<style lang="postcss" scoped>
.login__sidebar_container{
  @apply w-1/4 bg-sky-800 flex items-center justify-center;
}
.login__img_container{
  @apply flex justify-center items-center;
}
.login__img{
@apply bg-white rounded-full w-3/5;
}
.login__form_container{
 @apply flex flex-col my-auto mx-auto 
}
.login__header{
 @apply text-3xl text-stone-700 mb-5
}
.login__subheader{
 @apply text-lg text-stone-700 mt-7
}
.login__form_wrapper{
@apply flex justify-center items-center mx-auto
}
.login__link {
	@apply mx-2 cursor-pointer text-end text-xs hover:opacity-75 transition-opacity underline mb-2 mt-2 ;
}
</style>
