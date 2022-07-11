<template>
  <div class="profile__container">
    <div class="profile__image_container">
      <div class="profile__image_block">
        <img :src="userProfileImage">
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
          <BaseButton @click="$refs.fileInput.click()">
            Change Profile Image
          </BaseButton><input
            v-show="false"
            ref="fileInput"
            type="file"
            @change="fileLoaded"
          >
        </div>
        <div class="mr-5">
          <BaseButton @click="openPasswordChangeModal">
            Change password
          </BaseButton>
        </div>
      </div>
    </div>
    <BaseModal
      ref="modal"
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
            <BaseButton @click="submitPasswordChange">
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
			profileImage: null,
		};
	},
	computed: {
		...mapGetters('user', ['user']),
		userProfileImage() {
			return this.profileImage || this.user.avatarUrl;
		},
	},
	mounted() {
    console.log("mounted");
		this.fetchUser();
	},
	methods: {
		...mapActions('user', ['fetchUser', 'changePassword', 'changeProfileImage']),
		openPasswordChangeModal() {
			console.log(this.$refs);
			this.$refs.modal.openModal();
		},
		submitPasswordChange() {
			this.changePassword({ oldPassword: this.oldPassword, newPassword: this.newPassword });
			this.$refs.modal.closeModal();
		},
		cancelPasswordChange() {
			this.$refs.modal.closeModal();
		},
		fileLoaded(event) {
			const file = event.target.files[0];
			const fileReader = new FileReader();
			fileReader.onloadend = () => {
				this.profileImage = fileReader.result;
				this.changeProfileImage(this.profileImage);
			};
			if (file.type === 'image/jpeg') {
				fileReader.readAsDataURL(file);
			}
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
