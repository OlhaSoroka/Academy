<template>
    <div class="navigation-menu">
        <router-link to="/users">
          <svg class="navigation-menu-icon" width="16" height="16">
            <use href="../icons/sprite-navigation.svg#icon-members"></use>
          </svg>
          <span class="navigation-menu-text">Users</span>
        </router-link> 
        <router-link v-if="role==='admin'" to="/managers">
          <svg class="navigation-menu-icon" width="16" height="16">
            <use href="../icons/sprite-navigation.svg#icon-managers"></use>
          </svg>
          <span class="navigation-menu-text">Managers</span>
        </router-link> 
        <router-link to="/courses">
          <svg class="navigation-menu-icon" width="16" height="16">
            <use href="../icons/sprite-navigation.svg#icon-courses"></use>
          </svg>
          <span class="navigation-menu-text">Courses</span>
        </router-link> 
        <router-link class="navigation-menu-profile" to="/profile">
          <svg class="navigation-menu-icon" width="16" height="16">
            <use href="../icons/sprite-navigation.svg#icon-profile"></use>
          </svg>
          <span class="navigation-menu-text">Profile</span>
        </router-link>
    </div> 
</template> 

 <script>
  export default{
    name: 'NavigationMenu',
    props: {
      role: {
        default: 'user',
        type: String
      } 
    }
  }
</script>

 <style lang="scss">
  .navigation-menu{
     @apply bg-stone-50 text-sky-700 w-48 h-screen;
     font-family: font-mono;
  }
  .navigation-menu > *{
    @apply text-left flex text-base px-2 py-3 
    hover:bg-sky-400 hover:text-stone-50 hover:duration-500
    focus:m-1 focus:fill-stone-50 focus:duration-500;
  }
  .navigation-menu-profile {
    @apply absolute w-48 bottom-2;
  }
  
  @media only screen and (max-width: 480px)  {
    .navigation-menu{
      @apply w-10
    }
    .navigation-menu-text{
        @apply hidden
    }
    .navigation-menu > *{
       @apply p-2
    }
    .navigation-menu-icon{
       @apply fill-sky-700
    }
    .navigation-menu-profile {
        @apply w-10
    }
  }

  .navigation-menu > *:hover,
  .navigation-menu > *:focus{
      .navigation-menu-icon{
        @apply m-1 fill-stone-50 duration-500
      }
  }
  .navigation-menu-icon{
    @apply m-1 fill-sky-700
  }

  .navigation-menu-text{
     @apply ml-2.5
  }
</style> 

