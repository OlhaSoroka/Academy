<template>
  <div
    v-if="user"
    class="profile__container"
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
        class="profile__image_block"
      >
        <img
          :src="user.avatarUrl.path"
          @load="profileImageLoaded"
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
      <div
        v-if="isUser"
        class="profile__course_info_wrapper"
      >
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
    <ChangeImageModal
      :toggle-modal="isChangeImageModalOpen"
      @onProfileImageChange="profileImageChanged"
    />
    <ChangePasswordModal :toggle-modal="isChangePasswordModalOpen" />
  </div>
</template>
<script>
import BaseButton from "@/components/BaseComponents/BaseButton.vue";
import ChangeImageModal from "@/components/Modals/ChangeImageModal.vue";
import ChangePasswordModal from "@/components/Modals/ChangePasswordModal.vue";
import BaseSpinner from "@/components/BaseComponents/BaseSpinner/BaseSpinner.vue";
import { mapGetters } from "vuex";
import { USER_ROLE } from "@/constants/roles.constant";
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
    ...mapGetters("user", ["user", "isImageLoading"]),
    isUser() {
      return this.user.role === USER_ROLE;
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
.profile__container {
  @apply w-full h-2/3 self-center mx-auto shadow-xl flex justify-center;
}

.profile__image_container {
  @apply bg-sky-800 flex justify-center items-center p-12;
}

.profile__image_loading {
  @apply w-64 h-64 flex justify-center items-center;
}

.profile__image_block {
  @apply rounded-full shadow-md w-64 h-64 block relative;
}

.profile__image_block img {
  @apply w-full h-full object-cover;
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
