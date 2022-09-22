<template>
  <div
    id="app"
    class="flex relative"
  >
    <navigation-menu
      role="admin"
      :is-open="isOpen"
    />
    <div class="w-full h-screen overflow-hidden">
      <TopbarComponent @onMenuToggle="toggleNavigationMenu" />
      <router-view class="h-full overflow-auto bg-primary-100" />
    </div>

    <ToastMessage />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import NavigationMenu from '@/components/TheNavigationMenu.vue';
import TopbarComponent from '@/components/BaseComponents/TopbarComponent.vue';
import ToastMessage from '@/components/ToastMessage.vue';
export default {
	components: {
		NavigationMenu,
		ToastMessage,
		TopbarComponent,
	},
	data() {
		return {
			isOpen: true,
		};
	},
	computed: {
		...mapGetters('user', ['user']),
	},
  methods: {
    toggleNavigationMenu() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="scss">

</style>
