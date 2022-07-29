<template>
  <BaseModal
    ref="profileImageModal"
    :header="'Change profile image'"
  >
    <template #body>
      <div class="flex flex-col items-center text-start mt-5">
        <div v-if="profileImageSrc">
          <img
            class="h-60 w-auto rounded-md"
            :src="profileImageSrc"
          >
        </div>
        <div v-else>
          Please select image from your PC
        </div>
        <input
          v-show="false"
          ref="fileInput"
          type="file"
          @change="onImageSelected"
        >
        <div class="mt-5 flex">
          <div class="w-24 mx-2">
            <BaseButton @click="selectImage">
              Select
            </BaseButton>
          </div>
          <div
            v-if="profileImageSrc"
            class="w-24 mx-2"
          >
            <BaseButton @click="submitImage">
              Submit
            </BaseButton>
          </div>
          <div class="w-24 mx-2">
            <BaseButton
              :variant="'btn_red'"
              @click="cancel"
            >
              Cancel
            </BaseButton>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseButton from "@/components/BaseComponents/BaseButton.vue";
import BaseModal from "@/components/BaseComponents/BaseModal.vue";
import { mapActions } from "vuex";
export default {
  components: { BaseButton, BaseModal },
  props: {
    toggleModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      profileImageSrc: "",
      file: null,
    };
  },
  watch: {
    toggleModal() {
      this.$refs.profileImageModal.openModal();
    },
  },
  mounted() {},
  methods: {
    ...mapActions("user", ["changeProfileImage"]),
    selectImage() {
      this.$refs.fileInput.click();
    },
    cancel() {
      this.profileImageSrc = "";
      this.$refs.profileImageModal.closeModal();
    },
    onImageSelected(e) {
      this.file = e.target.files[0];
      if (this.file) {
        this.file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          this.profileImageSrc = fileReader.result;
        };
        fileReader.readAsDataURL(this.file);
      }
    },
    submitImage() {
      if (this.file) {
        this.changeProfileImage(this.file);
        this.profileImageSrc = "";
        this.$refs.profileImageModal.closeModal();
      }
    },
  },
};
</script>
