<template>
  <div class="p-10">
    <div class="profile-title">
      My profile
    </div>
    <div class="flex justify-center">
      <div
        v-if="user"
        class="profile-container"
      >
        <div class="profile__image_container">
          <div
            v-if="!isImageLoaded"
            class="profile__image_loading"
          >
            <BaseSpinner />
          </div>
          <div
            v-show="isImageLoaded"
            class="profile__image_block relative"
          >
            <div
              class="profile-image-bg profile-image-hover"
              @click="openProfileImageChangeModal"
            >
              <div class="text-white">
                <svg
                  class="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                /></svg>
              </div>
            </div>
            <img
              :src="user.avatarUrl.path"
              @load="profileImageLoaded"
            >
          </div>
          <div class="profile-image-title ">
            {{ user.fullName }}
          </div>
        </div>
        <div class="profile-info-container">
          <div class="profile-info-subtitle">
            <span class="profile-info-title">Email: </span>{{ user.email }}
          </div>
          <div v-if="isUser">
            <div class="profile-info-subtitle">
              <span class="profile-info-title">Course: </span>{{ user.course || "--" }}
            </div>
          </div>
          <div class="mt-5">
            <BaseButton @click="openPasswordChangeModal">
              Change password
            </BaseButton>
          </div>
        </div>
      </div>
      <div />
    </div>
    <ChangeImageModal
      :toggle-modal="isChangeImageModalOpen"
      @onProfileImageChange="profileImageChanged"
    />
    <ChangePasswordModal :toggle-modal="isChangePasswordModalOpen" />
  </div>
</template>

<script>
import BaseButton from '@/components/BaseComponents/BaseButton.vue';
import ChangeImageModal from '@/components/Modals/ChangeImageModal.vue';
import ChangePasswordModal from '@/components/Modals/ChangePasswordModal.vue';
import BaseSpinner from '@/components/BaseComponents/BaseSpinner/BaseSpinner.vue';
import { mapGetters } from 'vuex';
import { STUDENTS_ROLE } from '@/constants/roles.constant';
export default {
	components: {
		BaseButton,
		ChangeImageModal,
		ChangePasswordModal,
		BaseSpinner,
	},
	data() {
		return {
			isChangePasswordModalOpen: false,
			isChangeImageModalOpen: false,
			isImageLoaded: false,
		};
	},
	computed: {
		...mapGetters('user', ['user', 'isImageLoading']),
		isUser() {
			return this.user.role === STUDENTS_ROLE;
		},
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
	},
};
</script>
<style lang="postcss" scoped>
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
  background-color: rgba(0, 0, 0, 0.4);
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
