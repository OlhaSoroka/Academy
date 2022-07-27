<template>
  <div
    v-if="true"
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
    <router-link
      v-if="$store.state.user"
      :to="{ name: LOGIN }"
      @click="logout"
    >
      <svg
        class="navigation-menu-icon"
        width="16"
        height="16"
      >
        <use href="../icons/sprite-navigation.svg#icon-exit" />
      </svg>
      <span class="navigation-menu-text">Log out</span>
    </router-link>
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
import { mapActions } from 'vuex';
import { PROFILE, USERS, MANAGERS, COURSE_DASHBOARD, LOGIN } from '@/constants/routes.constant';
import { ADMIN_ROLE } from '@/constants/roles.constant';
export default {
	name: 'NavigationMenu',
	props: {
		role: {
			default: 'user',
			type: String,
		},
	},
	data() {
		return {
			PROFILE,
			USERS,
			MANAGERS,
			COURSE_DASHBOARD,
			LOGIN,
		};
	},
	computed: {
		isAdmin() {
			return this.role === ADMIN_ROLE;
		},
	},
	methods: {
		...mapActions(['logout']),
	},
};
</script>

<style lang="scss">
.navigation-menu {
	@apply bg-stone-50 text-sky-700 w-48 h-screen;
	font-family: font-mono;
}
.navigation-menu > * {
	@apply text-left flex text-base px-2 py-3 
    hover:bg-sky-400 hover:text-stone-50 
    hover:fill-stone-50 hover:duration-500
    focus:bg-sky-400 focus:text-stone-50 focus:duration-500
    focus:fill-stone-50;
}
.navigation-menu-profile {
	@apply absolute w-48 bottom-2;
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
</style>
