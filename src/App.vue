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
import NavigationMenu from "@/components/TheNavigationMenu.vue";
import ToastMessage from "@/components/ToastMessage.vue";
export default {
  components: {
    NavigationMenu,
    ToastMessage,
  },
};
</script>

<style lang="scss" scoped>
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
