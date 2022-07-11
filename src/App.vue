<template>
  <div id="app">
    <navigation-menu />
    <router-view />
  </div>
</template>

<script>
  import NavigationMenu from '@/components/TheNavigationMenu.vue'
  export default {
    components: {
      NavigationMenu
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
