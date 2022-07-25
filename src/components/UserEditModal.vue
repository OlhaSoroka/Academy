!<template>
  <div>
    <BaseModal ref="userEditModal" 
    :header="'Edit User'">
      <template #body>
        <ValidationObserver v-slot="{ invalid }">
          <div class="flex flex-col items-center text-start mt-5">
            <BaseInput
              v-model="targetUser.fullName"
              type="text"
              label="Name"
              placeholder="Enter name"
            />
            <BaseInput
              v-model="targetUser.email"
              type="email"
              label="Email"
              placeholder="Enter email"
              vid="email"
            />
            <BaseInput
              v-model="targetUser.course"
              type="text"
              label="Course"
              placeholder="Enter course"
            />
            <div class="flex justify-center mt-5">
              <BaseButton :disabled="invalid"
              @click="submitUserEditButton">
                Submit
              </BaseButton>
              <BaseButton
                :disabled="false"
                variant="btn_red"
                @click="cancelUserEditButton"
              >
                Cancel
              </BaseButton>
            </div>
          </div>
        </ValidationObserver>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BaseModal from "./BaseModal";
import BaseInput from "./BaseInput";
import BaseButton from "./BaseButton";
import { ValidationObserver } from "vee-validate";
export default {
  name: "UserEditModal",
  components: {
    BaseModal,
    BaseInput,
    BaseButton,
    ValidationObserver,
  },
  props: {
    isOpenedUserEditModal: {
      required: true,
      type: Boolean,
      default: false,
    },
    targetUserValue: {
      required: true,
      type: Object,
      default: null,
    },
    fetchEditedUser: {
      required: true,
    },
  },
  watch: {
    isOpenedUserEditModal() {
      this.$refs.userEditModal.openModal();
    },
    targetUserValue() {
      this.targetUser = this.targetUserValue;
    },
  },
  methods: {
    ...mapActions("users", ["updateUser"]),
    async submitUserEditButton() {
      await this.updateUser(this.targetUser)
        .then(
          () => this.$refs.userEditModal.closeModal(),
          setTimeout(() => {
            return this.fetchEditedUser();
          }, 1000)
        )
        // eslint-disable-next-line
        .catch((error) => {
          console.log(error.message, "|| Inputs is not valid");
        });
    },
    cancelUserEditButton() {
      this.$refs.userEditModal.closeModal();
    },
  },
  data() {
    return {
      targetUser: {
        id: null,
        fullName: "",
        email: "",
        course: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
button {
  @apply mx-1;
}
</style>