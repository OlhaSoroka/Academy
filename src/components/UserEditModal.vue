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
            <div class="mt-5">
              <BaseButton
                :disabled="invalid"
                @click="submitAdminMemberEditButton"
              >
                Submit
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
      type: Boolean,
      default: false,
    },
    targetUserValue: Object,
  },
  watch: {
    isOpenedUserEditModal() {
      this.$refs.adminMemberEditModal.openModal();
    },
    targetUserValue() {
      this.targetUser = this.targetUserValue;
    },
  },
  methods: {
    ...mapActions("users", ["updateUser"]),
    async submitAdminMemberEditButton() {
      await this.updateUser(this.targetUser)
        .then(() => this.$refs.adminMemberEditModal.closeModal())
        // eslint-disable-next-line
        .catch((error) => {
          console.log(error.message);
        });
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
</style>