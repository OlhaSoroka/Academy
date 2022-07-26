<template>
  <div class="flex">
    <div
      class="w-1/4 bg-sky-800 flex items-center justify-center"
    >
      <div>
        <div class="flex justify-center items-center">
          <img
            class="bg-white rounded-full w-3/5"
            src="../assets/inventorsoft.jpg"
            alt="logo"
          >
        </div>
        <!-- <div class="text-slate-50 text-lg mt-3">
          Wellcome to InventorSoft Academy
        </div> -->
      </div>
    </div>
    <div class="flex flex-col my-auto mx-auto ">
      <div class="text-3xl text-stone-700 mb-5">
        Wellcome to InventorSoft Academy
        <div class="text-lg text-stone-700 mb-5">
          Login to continue
        </div>
      </div>
      <div class="flex justify-center items-center mx-auto ">
        <div
          class="
      max-w-xl
      mx-auto
      px-4"
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

</style>
