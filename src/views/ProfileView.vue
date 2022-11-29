<template>
	<div class="p-10 bg-primary-100 min-h-full">
		<div class="p-10 bg-stone-50 shadow-md border border-stone-300 rounded-md w-full ">
			<div class="profile-title">
				My profile
			</div>
			<div class="flex justify-center">
				<div v-if="userStore.currentUser" class="profile-container">
					<div class="profile__image_container">
						<div v-if="!isImageLoaded" class="profile__image_loading">
							<BaseSpinner />
						</div>
						<div v-show="isImageLoaded" class="profile__image_block relative">
							<div class="profile-image-bg profile-image-hover" @click="openProfileImageChangeModal">
								<div class="text-white">
									<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
									</svg>
								</div>
							</div>
							<img :src="userStore.currentUser.avatarUrl" @load="profileImageLoaded">
						</div>
						<div class="profile-image-title ">
							{{ userStore.currentUser.fullName }}
						</div>
					</div>
					<div class="profile-info-container">
						<div class="profile-info-subtitle">
							<div class="profile-info-subtitle">
								<span class="profile-info-title">Name: </span>{{ userStore.currentUser.fullName }}
							</div>
							<div class="profile-info-subtitle">
								<span class="profile-info-title">Email: </span>{{ userStore.currentUser.email }}
							</div>
						</div>
						<div class="profile-info-subtitle">
							<span class="profile-info-title">Role: </span>{{ userStore.currentUser.role }}
						</div>
						<div v-if="isStudent">
							<div class="profile-info-subtitle">
								<span class="profile-info-title">Course: </span>{{ courseName ||
										"--"
								}}
							</div>
							<div class="profile-info-subtitle">
								<span class="profile-info-title">English level: </span>{{
										userStore.currentUser.eng_level || "--"
								}}
							</div>
							<div class="profile-info-subtitle">
								<span class="profile-info-title">City: </span>{{ userStore.currentUser.city || "--" }}
							</div>
							<div class="profile-info-subtitle">
								<span class="profile-info-title">Education: </span>{{ userStore.currentUser.education ||
										"--"
								}}
							</div>
							<div class="profile-info-subtitle">
								<span class="profile-info-title">Phone number: </span>{{ userStore.currentUser.phone ||
										"--"
								}}
							</div>
						</div>
						<div class="mt-7 flex items-center">
							<div v-if="shouldCvShow" class="mr-2">
								<BaseButton @click="openCv(userStore.currentUser?.cv_link)" :variant="'btn_blue_outlined'">
									CV
								</BaseButton>
							</div>
							<div>
								<BaseButton @click="openPasswordChangeModal" :variant="'btn_blue_outlined'">
									Change password
								</BaseButton>
							</div>
						</div>
					</div>
				</div>
				<div />
			</div>
			<ChangeImageModal :toggle-modal="isChangeImageModalOpen" @onProfileImageChange="profileImageChanged" />
			<ChangePasswordModal :toggle-modal="isChangePasswordModalOpen" />
		</div>
	</div>
</template>
  
<script lang="ts">
import { mapStores } from 'pinia';
import BaseButton from '../components/BaseComponents/BaseButton.vue';
import ChangeImageModal from '../components/Modals/ChangeImageModal.vue';
import ChangePasswordModal from '../components/Modals/ChangePasswordModal.vue';
import { ROLES } from '../models/router.model';
import { useUserStore } from '../store/user';
import { defineComponent } from 'vue';
import { getCourseById } from '../api/course';
export default defineComponent({
	components: {
		BaseButton,
		ChangeImageModal,
		ChangePasswordModal
	},
	data() {
		return {
			isChangePasswordModalOpen: false,
			isChangeImageModalOpen: false,
			isImageLoaded: false,
			courseName: ""
		};
	},
	async beforeMount() {
		if (this.userStore.currentUser?.courseId) {
			const course = await getCourseById(this.userStore.currentUser.courseId);
			this.courseName = course.name;
		}

	},
	computed: {
		...mapStores(useUserStore),
		isStudent() {
			return this.userStore.currentUser!.role === ROLES.STUDENTS_ROLE;
		},
		shouldCvShow(): boolean {
			return !!this.userStore.currentUser?.cv_link && this.isStudent;
		}
	},
	methods: {
		profileImageLoaded() {
			this.isImageLoaded = true;
		},
		profileImageChanged() {
			this.isImageLoaded = false;
		},
		openProfileImageChangeModal() {
			this.isChangeImageModalOpen = !this.isChangeImageModalOpen;
		},
		openPasswordChangeModal() {
			this.isChangePasswordModalOpen = !this.isChangePasswordModalOpen;
		},
		openCv(link?: string): void {
			if (link) {
				window.open(link, '_blank')?.focus();
			}
		}
	},
});
</script>
<style lang="scss" scoped>
.profile-title {
	@apply font-semibold text-2xl text-start text-primary-700 mb-5
}

.profile-container {
	@apply border-gray-300 w-full h-fit border-2 p-7 flex justify-between;
}

.profile__image_container {
	@apply flex flex-col justify-center items-center p-12 w-1/3 border-gray-300 border-2 mr-7;
}

.profile__image_loading {
	@apply w-64 h-64 flex justify-center items-center;
}

.profile__image_block {
	@apply rounded-full shadow-md w-64 h-64 block relative overflow-hidden;
}

.profile__image_block img {
	@apply w-full h-full object-cover;
}

.profile-image-title {
	@apply w-1/2 text-center mt-4 text-lg
}

.profile-info-container {
	@apply flex flex-col justify-center p-12 w-2/3 border-gray-300 border-2
}

.profile-image-bg {
	background-color:rgba(36, 35, 35, 0.274);
}

.profile-image-hover {
	@apply absolute w-64 h-64 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer
}

.profile-info-title {
	@apply font-semibold
}

.profile-info-subtitle {
	@apply text-lg mt-2
}
</style>
  