<template>
  <div
    v-if="!!user"
    class="navigation-menu"
  >
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
    <router-link
      v-if="isAdmin"
      :to="{ name: ADMINS }"
    >
      <svg
        class="navigation-menu-icon"
        width="16"
        height="16"
      >
        <use href="../icons/sprite-navigation.svg#icon-managers" />
      </svg>
      <span class="navigation-menu-text">Admins</span>
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
      <div class="profile__image_container">
        <div class="profile__image_block">
          <!-- disable image cache -->
          <img :src="user.avatarUrl.path + '?' + Date.now()">
        </div>
      </div>
      <span class="navigation-menu-text">{{ user.fullName }}</span>
    </router-link>
  </div>
</template>

<script>
import {
  PROFILE,
  USERS,
  MANAGERS,
  ADMINS,
  COURSE_DASHBOARD,
  LOGIN,
} from "@/constants/routes.constant";
import { ADMIN_ROLE } from "@/constants/roles.constant";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "NavigationMenu",
  props: {
    role: {
      default: "user",
      type: String,
    },
  },
  data() {
    return {
      PROFILE,
      USERS,
      MANAGERS,
      ADMINS,
      COURSE_DASHBOARD,
      LOGIN,
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    isAdmin() {
      return this.user.role === ADMIN_ROLE;
    },
  },

  methods: {
    ...mapActions("user", ["logoutUser"]),
    async logout() {
      await this.logoutUser();
    },
  },
};
</script>

<style lang="postcss" scoped>
.navigation-menu {
  @apply bg-stone-50 text-sky-700 w-48 h-screen;
}

.navigation-menu > * {
  @apply text-left flex text-base px-2 py-3 hover:bg-sky-400 hover:text-stone-50 hover:fill-stone-50 hover:duration-500 focus:bg-sky-400 focus:text-stone-50 focus:duration-500 focus:fill-stone-50;
}

.navigation-menu-profile {
  @apply absolute w-40 bottom-2;
}
.profile__image_block img {
  @apply rounded-full shadow-md max-w-xs w-12 h-12 block;
}

@media only screen and (max-width: 480px) {
  .navigation-menu {
    @apply w-10;
  }

  .navigation-menu-text {
    @apply hidden;
  }

  .navigation-menu > * {
    @apply p-2;
  }

  .navigation-menu-icon {
    @apply fill-sky-700;
  }

  .navigation-menu-profile {
    @apply w-10;
  }
}

.navigation-menu > *:hover,
.navigation-menu > *:focus {
  .navigation-menu-icon {
    @apply m-1 fill-stone-50 duration-500;
  }
}

.navigation-menu-icon {
  @apply m-1 fill-sky-700;
}

.navigation-menu-text {
  @apply ml-2.5;
}

.router-link-exact-active {
  @apply bg-sky-400 text-white;
}
</style>
