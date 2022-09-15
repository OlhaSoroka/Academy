<template>
  <div
    id="app"
    class="flex relative"
  >
    <navigation-menu role="admin" />
    <router-view class="w-full h-screen overflow-auto" />
    <ToastMessage />
  </div>
</template>
<script>
import NavigationMenu from '@/components/TheNavigationMenu.vue';
import ToastMessage from '@/components/ToastMessage.vue';
export default {
	components: {
		NavigationMenu,
		ToastMessage,
	},
};
</script>

<style lang="postcss">
/* #app {
	font-family: 'Poppins', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	min-height: 100vh;
} */

</style>
