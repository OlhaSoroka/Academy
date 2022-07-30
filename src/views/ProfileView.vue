<template>
  <div
    v-if="user"
    class="profile__container"
  >
    <div class="profile__image_container">
      <div class="profile__image_block">
        <!-- disable image cache -->
        <img
          v-if="user.avatarUrl"
          :src="user.avatarUrl + '?' + Date.now()"
        >
        <img
          v-else
          src="../assets/no_avatar.png"
          alt="avatar"
        >
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
            {{ user.course || "--" }}
          </div>
        </div>
        <div class="profile__course_item">
          <div class="profile__info_subtitle">
            Score
          </div>
          <div class="profile__info_title">
            {{ user.initialScore || "--" }}
          </div>
        </div>
      </div>
      <div class="profile__buttons_wrapper">
        <div class="mr-5">
          <BaseButton
            :loading="isImageLoading"
            @click="openProfileImageChangeModal"
          >
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
    <ChangeImageModal :toggle-modal="isChangeImageModalOpen" />
    <ChangePasswordModal :toggle-modal="isChangePasswordModalOpen" />
  </div>
</template>
<script>
import BaseButton from '@/components/BaseComponents/BaseButton.vue';
import ChangeImageModal from '@/components/Modals/ChangeImageModal.vue';
import ChangePasswordModal from '@/components/Modals/ChangePasswordModal.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: { BaseButton, ChangeImageModal, ChangePasswordModal },
  data() {
    return {
      isChangePasswordModalOpen: false,
      isChangeImageModalOpen: false,
    };
  },
  computed: {
    ...mapGetters('user', ['user', 'isImageLoading']),
  },
  methods: {
    ...mapActions('user', ['fetchUser']),
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
.profile__container {
  @apply w-2/3 h-2/3 self-center mx-auto shadow-xl flex justify-center;
}

.profile__image_container {
  @apply bg-emerald-500 flex justify-center items-center p-12;
}

.profile__image_block img {
  @apply rounded-full shadow-md max-w-xs w-full h-full block;
}

.profile__info_container {
  @apply p-12 text-start grow;
}

.profile__course_info_wrapper {
  @apply flex mb-5;
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
