<template>
  <div
    v-if="!!user"
    class="navigation-menu"
  >
    <router-link :to="{ name: USERS }">
      <svg
        class="navigation-menu-icon"
        width="16"
        height="16"
      >
        <use href="../icons/sprite-navigation.svg#icon-members" />
      </svg>
      <span class="navigation-menu-text">Users</span>
    </router-link>
    <router-link
      v-if="isAdmin"
      :to="{ name: MANAGERS }"
    >
      <svg
        class="navigation-menu-icon"
        width="16"
        height="16"
      >
        <use href="../icons/sprite-navigation.svg#icon-managers" />
      </svg>
      <span class="navigation-menu-text">Managers</span>
    </router-link>
    <router-link :to="{ name: COURSE_DASHBOARD }">
      <svg
        class="navigation-menu-icon"
        width="16"
        height="16"
      >
        <use href="../icons/sprite-navigation.svg#icon-courses" />
      </svg>
      <span class="navigation-menu-text">Courses</span>
    </router-link>
    <label
      for="logout"
      class="block"
      @click="logout"
    >
      <svg
        id="logout"
        class="navigation-menu-icon inline"
        width="16"
        height="16"
      >
        <use href="../icons/sprite-navigation.svg#icon-exit" />
      </svg>
      <span class="navigation-menu-text">Log out</span>
    </label>

    <router-link
      class="navigation-menu-profile"
      :to="{ name: PROFILE }"
    >
      <svg
        class="navigation-menu-icon"
        width="16"
        height="16"
      >
        <use href="../icons/sprite-navigation.svg#icon-profile" />
      </svg>
      <span class="navigation-menu-text">Profile</span>
    </router-link>
  </div>
</template> 

 <script>
import { PROFILE, USERS, MANAGERS, COURSE_DASHBOARD, LOGIN } from '@/constants/routes.constant'
import router from '@/router';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'NavigationMenu',
  props: {
    role: {
      default: 'user',
      type: String
    }
  },
  data() {
    return {
      PROFILE, USERS, MANAGERS, COURSE_DASHBOARD, LOGIN
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    isAdmin() {
      return this.role === 'admin'
    }
  },

  methods: {
    ...mapActions('user', ['logoutUser']),
    async logout() {
      await this.logoutUser()
      router.push({ name: LOGIN })
    }
  },
}
</script>

 <style lang="postcss">
 .navigation-menu {
   @apply bg-stone-50 text-sky-700 w-48 h-screen;
   font-family: font-mono;
 }
 
 .navigation-menu>* {
   @apply text-left flex text-base px-2 py-3 hover:bg-sky-400 hover:text-stone-50 hover:fill-stone-50 hover:duration-500 focus:bg-sky-400 focus:text-stone-50 focus:duration-500 focus:fill-stone-50
 }
 
 .navigation-menu-profile {
   @apply absolute w-48 bottom-2;
 }
 
 @media only screen and (max-width: 480px) {
   .navigation-menu {
     @apply w-10
   }
 
   .navigation-menu-text {
     @apply hidden
   }
 
   .navigation-menu>* {
     @apply p-2
   }
 
   .navigation-menu-icon {
     @apply fill-sky-700
   }
 
   .navigation-menu-profile {
     @apply w-10
   }
 }
 
 .navigation-menu>*:hover,
 .navigation-menu>*:focus {
   .navigation-menu-icon {
     @apply m-1 fill-stone-50 duration-500
   }
 }
 
 .navigation-menu-icon {
   @apply m-1 fill-sky-700
 }
 
 .navigation-menu-text {
   @apply ml-2.5
 }
 </style> 
