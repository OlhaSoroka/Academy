<template>
  <div
    v-if="user"
    class="profile__container"
  >
    <div class="profile__image_container">
      <div class="profile__image_block">
        <img :src="user.avatarUrl">
      </div>
    </div>

    <div class="profile__info_container">
      <div class="profile__user_info_wrapper">
        <div class="profile__info_subtitle">
          Name Surname
        </div>
        <div class="profile__info_title">
          {{ user.fullName }}
        </div>
      </div>
      <div class="profile__user_info_wrapper">
        <div class="profile__info_subtitle">
          Email
        </div>
        <div class="profile__info_title">
          {{ user.email }}
        </div>
      </div>
      <div class="profile__course_info_wrapper">
        <div class="profile__course_item">
          <div class="profile__info_subtitle">
            Course
          </div>
          <div class="profile__info_title">
            {{ user.course }}
          </div>
        </div>
        <div class="profile__course_item">
          <div class="profile__info_subtitle">
            Score
          </div>
          <div class="profile__info_title">
            {{ user.initialScore }}
          </div>
        </div>
      </div>
      <div class="profile__buttons_wrapper">
        <div class="mr-5">
          <BaseButton @click="openProfileImageChangeModal">
            Change Profile Image
          </BaseButton>
        </div>
        <div class="mr-5">
          <BaseButton @click="openPasswordChangeModal">
            Change password
          </BaseButton>
        </div>
      </div>
    </div>
    <BaseModal
      ref="profileImageModal"
      :header="'Change profile image'"
    >
      <template #body>
        <div class="flex flex-col items-center text-start mt-5">
          <BaseInput
            v-model="profileImage"
            type="text"
            label="Profile photo link"
            placeholder="Paste profile photo link"
          />
          <div class="mt-5">
            <BaseButton
              :disabled="!isProfileImageLinkValid"
              @click="submitProfileImage"
            >
              Submit
            </BaseButton>
          </div>
        </div>
      </template>
    </BaseModal>

    <BaseModal
      ref="passwordModal"
      :header="'Change password'"
    >
      <template #body>
        <div class="flex flex-col items-center mt-5">
          <div class="mb-3">
            <BaseInput
              v-model="oldPassword"
              type="password"
              label="Old password"
              vid="password"
              placeholder="Enter old password"
            />
          </div>
          <div class="mb-3">
            <BaseInput
              v-model="newPassword"
              type="password"
              label="New password"
              vid="password"
              placeholder="Enter new password"
            />
          </div>
          <div class="mb-3">
            <BaseInput
              v-model="confirmedPassword"
              type="password"
              label="Confirm new password"
              vid="password"
              placeholder="Confirm password"
            />
          </div>
        </div>
        <div class="flex justify-center mt-5">
          <div class="w-1/5 mx-1">
            <BaseButton
              :disabled="!isChangePasswordFormValid"
              @click="submitPasswordChange"
            >
              Submit
            </BaseButton>
          </div>
          <div class="w-1/5 mx-1">
            <BaseButton
              :variant="'btn_red'"
              @click="cancelPasswordChange"
            >
              Cancel
            </BaseButton>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>
<script>
import BaseButton from '@/components/BaseButton.vue';
import BaseModal from '@/components/BaseModal.vue';
import BaseInput from '@/components/BaseInput.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
	components: { BaseButton, BaseModal, BaseInput },
	data() {
		return {
			oldPassword: '',
			newPassword: '',
			confirmedPassword: '',
			profileImage: '',
		};
	},
	computed: {
		...mapGetters('user', ['user']),
		userProfileImage() {
			return this.profileImage || this.user.avatarUrl;
		},
		isChangePasswordFormValid() {
			return this.oldPassword && this.newPassword && this.confirmedPassword && this.newPassword === this.confirmedPassword;
		},
		isProfileImageLinkValid() {
			return this.profileImage.length > 0;
		},
	},
	mounted() {
		this.fetchUser('91d00e54-b58b-4ab9-961f-b12e943fa0dc');
	},
	methods: {
		...mapActions('user', ['fetchUser', 'changePassword', 'changeProfileImage']),
		openPasswordChangeModal() {
			this.$refs.passwordModal.openModal();
		},
		submitPasswordChange() {
			this.changePassword({ oldPassword: this.oldPassword, newPassword: this.newPassword });
			this.$refs.passwordModal.closeModal();
		},
		cancelPasswordChange() {
			this.$refs.passwordModal.closeModal();
		},
		openProfileImageChangeModal() {
			this.$refs.profileImageModal.openModal();
		},
		submitProfileImage() {
			this.changeProfileImage(this.profileImage);
			this.$refs.profileImageModal.closeModal();
		},
	},
};
</script>

<style lang="postcss" scoped>
.profile__container {
	@apply w-2/3  mx-auto  shadow-xl flex my-60 justify-center;
}
.profile__image_container {
	@apply bg-emerald-500 flex justify-center items-center p-12;
}
.profile__image_block img {
	@apply rounded-full shadow-md w-80 h-80;
}
.profile__info_container {
	@apply p-12 text-start grow;
}
.profile__course_info_wrapper {
	@apply flex  mb-5;
}
.profile__user_info_wrapper {
	@apply mb-5;
}

.profile__course_item {
	@apply mr-5;
}
.profile__info_subtitle {
	@apply text-stone-300 font-semibold text-lg;
}
.profile__info_title {
	@apply text-stone-700 font-bold text-4xl;
}
.profile__buttons_wrapper {
	@apply flex;
}
</style>
