!<template>
  <div>
    <BaseModal ref="adminMemberEditModal" 
    :header="'Edit User'">
      <template #body>
        <ValidationObserver v-slot="{ invalid }">
          <div class="flex flex-col items-center text-start mt-5">
            <BaseInput
              v-model="targetUser.fullName"
              type="text"
              label="Name"
              :placeholder="targetUser.fullName"
            />
            <BaseInput
              v-model="targetUser.email"
              type="email"
              label="Email"
              :placeholder="targetUser.email"
            />
            <BaseInput
              v-model="targetUser.course"
              type="text"
              label="Course"
              :placeholder="targetUser.course"
            />
            <div class="mt-5">
              <BaseButton
                :loading="invalid"
                :disabled="false"
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
  name: "AdminMemberCreateModel",
  components: {
    BaseModal,
    BaseInput,
    BaseButton,
    ValidationObserver,
  },
  props: {
    toggleOpenedAdminMemberEditModal: {
      type: Boolean,
      default: false,
    },
    targetUserValue: Object,
  },
  watch: {
    toggleOpenedAdminMemberEditModal() {
      this.$refs.adminMemberEditModal.openModal();
    },
    targetUserValue() {
      this.targetUser = this.targetUserValue;
    },
  },
  methods: {
    ...mapActions(["updateUser"]),
    async submitAdminMemberEditButton() {
      this.$refs.adminMemberEditModal.closeModal();
      await this.updateUser(this.targetUser);
      this.$router.go(0);
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
  border: 3px solid;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
}
</style>