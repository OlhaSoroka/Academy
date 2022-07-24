<template>
  <div
    id="app"
    class="flex"
  >
    <navigation-menu class="" />
    <router-view class="w-full" />
  </div>
</template>
<script>
import { mapActions } from 'vuex';


export default {
  mounted() {
    console.log('appcreate');
  },
  methods: {
    ...mapActions('user', ["setUser"]),
  },


}
</script>

<script>
import NavigationMenu from '@/components/TheNavigationMenu.vue';
export default {
	components: {
		NavigationMenu,
	},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}
</style>
