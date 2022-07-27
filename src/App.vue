<template>
  <div 
    id="app" 
    class="flex"
  >
<<<<<<< HEAD
    <navigation-menu />
=======
    <navigation-menu
      role="admin"
    />
>>>>>>> master
    <router-view class="w-full" />
  </div>
</template>
<script>
export default {
  mounted() {
  }
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
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
