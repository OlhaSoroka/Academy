<template>
  <div
    v-if="!!user" 
    class="navigation-container"
  > 
    <div class="navigation-main-logo">
      <img
        src="../assets/logo-h.svg"
        alt="main_logo"
      >
    </div>

    <div class="mt-5">
      <div class="">
        <div class="">
          <img
            :src="user.avatarUrl.path"
            class="rounded-full w-1/2 h-1/2 m-auto mt-4"
          >
        </div>
      </div>
      <router-link
        class=""
        :to="{ name: PROFILE }"
      >
        <div class="mt-4 text-primary-700 text-base">
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
          <span class="navigation-text">Courses</span>
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
          <span class="navigation-text">Users</span>
        </router-link>
      </div>
      <div>
        <router-link
          v-if="isAdmin"
          class="navigation-link"
          :to="{ name: MENTORS }"
        >
          <svg
            width="16"
            height="16"
          >
            <use href="../icons/sprite-navigation.svg#icon-mentors" />
          </svg>
          <span class="navigation-text">Mentors</span>
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
          <span class="navigation-text">Log out</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PROFILE, STUDENTS, MENTORS, COURSE_DASHBOARD, LOGIN } from '@/constants/routes.constant';
import { ADMIN_ROLE } from '@/constants/roles.constant';
import { mapActions, mapGetters } from 'vuex';
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
			STUDENTS,
			MENTORS,
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
.navigation-container{
  @apply p-4 border-r-2 border-stone-200
}
.navigation-main-logo{
 @apply m-auto w-2/3
}
.navigation-link{
 @apply flex  justify-center items-center m-auto p-3 cursor-pointer opacity-70
}
.navigation-text{
   @apply w-1/2 text-start ml-4
}

.router-link-exact-active {
	@apply opacity-100
}
</style>
