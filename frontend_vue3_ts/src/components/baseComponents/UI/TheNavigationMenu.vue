<template>
	<div v-if="userStore.currentUser" class="navigation-container transition-all" :class="isOpen ? ['w-60', 'p-4'] : ['w-16', 'p-0']">
		<router-link :to="{ name: COURSE_DASHBOARD }">
			<div v-if="isOpen" class="navigation-main-logo">
				<img src="../../../assets/logo-h.svg" alt="main_logo">
			</div>
			<div v-else class="flex m-auto p-4">
				<img class="h-8" src="../assets/logo_small.png" alt="small_logo">
			</div>
		</router-link>
		<div v-if="isOpen" class="mt-7">
			<div class="flex justify-center">
				<div class="rounded-full shadow-md w-24 h-24 block relative overflow-hidden">
					<img :src="userStore.currentUser.avatarUrl" class="w-full h-full object-cover">
				</div>
			</div>
			<router-link :to="{ name: PROFILE }">
				<div class="navigation-profile-name">
					{{ userStore.currentUser.fullName }}
				</div>
			</router-link>
		</div>

		<div class="mt-5">
			<div>
				<router-link class="navigation-link" :to="{ name: COURSE_DASHBOARD }">
					<svg width="16" height="16">
						<use href="../../../icons/spite-navigation.svg#icon-courses" />
					</svg>
					<span v-if="isOpen" class="navigation-text">Courses</span>
				</router-link>
			</div>
			<div>
				<router-link class="navigation-link" :to="{ name: STUDENTS }">
					<svg class="navigation-menu-icon" width="16" height="16">
						<use href="../../../icons/spite-navigation.svg#icon-members" />
					</svg>
					<span v-if="isOpen" class="navigation-text">Students</span>
				</router-link>
			</div>
			<div>
				<router-link v-if="isAdmin" class="navigation-link" :to="{ name: MENTORS }">
					<svg class="navigation-menu-icon" width="16" height="16">
						<use href="../../../icons/spite-navigation.svg#icon-mentors" />
					</svg>
					<span v-if="isOpen" class="navigation-text">Mentors</span>
				</router-link>
			</div>
			<div>
				<router-link v-if="isAdmin" class="navigation-link" :to="{ name: ADMINS }">
					<svg class="navigation-menu-icon" width="16" height="16">
						<use href="../../../icons/spite-navigation.svg#icon-admin" />
					</svg>
					<span v-if="isOpen" class="navigation-text">Admins</span>
				</router-link>
			</div>
			<div>
				<div class="navigation-link" @click="logout">
					<svg id="logout" width="16" height="16">
						<use href="../../../icons/spite-navigation.svg#icon-exit" />
					</svg>
					<span v-if="isOpen" class="navigation-text">Log out</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { ROUTE_NAMES } from '../../../models/router.model';
import { ROLES } from '../../../models/router.model';
import { mapStores } from "pinia";
import { useUserStore } from '../../../store/user';
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
			PROFILE:ROUTE_NAMES.PROFILE,
			STUDENTS:ROUTE_NAMES.STUDENTS,
			MENTORS:ROUTE_NAMES.MENTORS,
			ADMINS:ROUTE_NAMES.ADMINS,
			COURSE_DASHBOARD:ROUTE_NAMES.COURSE_DASHBOARD,
			LOGIN:ROUTE_NAMES.LOGIN,
		};
	},
	computed: {
		...mapStores(useUserStore),
		isAdmin() {
			return this.userStore.currentUser!.role === ROLES.ADMIN_ROLE;
		},
	},
	methods: {
		async logout() {
			await this.userStore.logoutUser();
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
	@apply flex justify-center items-center m-auto p-3 cursor-pointer opacity-70 hover:opacity-100;
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
  