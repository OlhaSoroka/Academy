<template>
    <div class="navigation-menu">
        <router-link to="/members">
          <svg class="navigation-menu-icon" width="16" height="16">
            <use href="../../icons/sprite-navigation.svg#icon-members"></use>
          </svg>
          <span class="navigation-menu-text">Members</span>
        </router-link> 
        <router-link to="/courses">
          <svg class="navigation-menu-icon" width="16" height="16">
            <use href="../../icons/sprite-navigation.svg#icon-courses"></use>
          </svg>
          <span class="navigation-menu-text">Courses</span>
        </router-link> 
        <router-link class="navigation-menu-profile" to="/profile">
          <svg class="navigation-menu-icon" width="16" height="16">
            <use href="../../icons/sprite-navigation.svg#icon-profile"></use>
          </svg>
          <span class="navigation-menu-text">Profile</span>
        </router-link>
    </div> 
</template>

<script>
export default {
  name: 'NavigationMenu'
}
</script>

<style lang="scss">
  @import "./TheNavigationMenu.scss";
</style>

