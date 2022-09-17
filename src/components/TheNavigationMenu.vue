<template>
  <div
    v-if="!!user"
    class="navigation-container transition-all"
    :class="isOpen ? ['w-60', 'p-4'] : ['w-16', 'p-0']"
  >
    <router-link
      :to="{ name: COURSE_DASHBOARD }"
    >
      <div
        v-if="isOpen"
        class="navigation-main-logo"
      >
        <img
          src="../assets/logo-h.svg"
          alt="main_logo"
        >
      </div>
      <div
        v-else
        class="flex m-auto p-4"
      >
        <img
          class="w-7 h-7"
          src="https://office.inventorsoft.co/images/logo_star_mini.jpg"
          alt="small_logo"
        >
      </div>
    </router-link>
    <div
      v-if="isOpen"
      class="mt-7"
    >
      <div class="flex justify-center">
        <div class="rounded-full shadow-md w-24 h-24 block relative overflow-hidden">
          <img
            :src="user.avatarUrl.path"
            class="w-full h-full object-cover"
          >
        </div>
      </div>
      <router-link
        :to="{ name: PROFILE }"
      >
        <div class="navigation-profile-name">
          {{ user.fullName }}
        </div>
      </router-link>
    </div>

    <div class="mt-5">
      <div>
        <router-link
          class="navigation-link"
          :to="{ name: COURSE_DASHBOARD }"
        >
          <svg
            width="16"
            height="16"
          >
            <use href="../icons/sprite-navigation.svg#icon-courses" />
          </svg>
          <span
            v-if="isOpen"
            class="navigation-text"
          >Courses</span>
        </router-link>
      </div>
      <div>
        <router-link
          class="navigation-link"
          :to="{ name: STUDENTS }"
        >
          <svg
            class="navigation-menu-icon"
            width="16"
            height="16"
          >
            <use href="../icons/sprite-navigation.svg#icon-members" />
          </svg>
          <span
            v-if="isOpen"
            class="navigation-text"
          >Students</span>
        </router-link>
      </div>
      <div>
        <router-link
          v-if="isAdmin"
          class="navigation-link"
          :to="{ name: MENTORS }"
        >
          <svg
            class="navigation-menu-icon"
            width="16"
            height="16"
          >
            <use href="../icons/sprite-navigation.svg#icon-mentors" />
          </svg>
          <span
            v-if="isOpen"
            class="navigation-text"
          >Mentors</span>
        </router-link>
      </div>
      <div>
        <router-link
          v-if="isAdmin"
          class="navigation-link"
          :to="{ name: ADMINS }"
        >
          <svg
            class="navigation-menu-icon"
            width="16"
            height="16"
          >
            <use href="../icons/sprite-navigation.svg#icon-admin" />
          </svg>
          <span
            v-if="isOpen"
            class="navigation-text"
          >Admins</span>
        </router-link>
      </div>
      <div>
        <div
          class="navigation-link"
          @click="logout"
        >
          <svg
            id="logout"
            width="16"
            height="16"
          >
            <use href="../icons/sprite-navigation.svg#icon-exit" />
          </svg>
          <span
            v-if="isOpen"
            class="navigation-text"
          >Log out</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PROFILE, STUDENTS, MENTORS, ADMINS, COURSE_DASHBOARD, LOGIN } from '@/constants/routes.constant';
import { ADMIN_ROLE } from '@/constants/roles.constant';
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'NavigationMenu',
	props: {
		role: {
			default: 'user',
			type: String,
		},
    isOpen: {
      default: true,
      type: Boolean
    }
	},
	data() {
		return {
			PROFILE,
			STUDENTS,
			MENTORS,
			ADMINS,
			COURSE_DASHBOARD,
			LOGIN,
		};
	},
	computed: {
		...mapGetters('user', ['user']),
		isAdmin() {
			return this.user.role === ADMIN_ROLE;
		},
	},
	methods: {
		...mapActions('user', ['logoutUser']),
		async logout() {
			await this.logoutUser();
		},
	},
};
</script>
<style lang="postcss" scoped>
.navigation-container {
	@apply border-r-2 border-stone-200;
}
.navigation-main-logo {
	@apply m-auto w-2/3;
}
.navigation-link {
	@apply flex  justify-center items-center m-auto p-3 cursor-pointer opacity-70 hover:opacity-100;
}
.navigation-text {
	@apply w-1/2 text-start ml-4;
}

.router-link-exact-active {
	@apply opacity-100;
}
.navigation-profile-name {
	@apply mt-4 text-primary-700 text-base hover:text-primary-900 flex justify-center;
}
</style>
