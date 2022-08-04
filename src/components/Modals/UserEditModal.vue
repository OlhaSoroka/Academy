!<template>
  <div>
    <BaseModal
      ref="userEditModal" 
      :header="'Edit User'"
    >
      <template #body>
        <ValidationObserver v-slot="{ invalid }">
          <div class="flex flex-col items-center text-start mt-5">
            <div
              v-for="input in userInputsValue" 
              :key="input.label"
            >
              <BaseInput
                v-model="targetUser[input.model]"
                :type="input.type"
                :label="input.label"
                :placeholder="input.placeholder"
                :rules="requiredField(input.label)"
              />
            </div>
            <div class="flex justify-center mt-5">
              <BaseButton
                :disabled="invalid"
                @click="submitUserEditButton"
              >
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
import BaseModal from "../BaseComponents/BaseModal";
import BaseInput from "../BaseComponents/BaseInput";
import BaseButton from "../BaseComponents/BaseButton";
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
    },
    targetUserValue: {
      required: true,
      type: Object,
    },
    userInputsValue: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      targetUser: {},
    };
  },
  watch: {
    isOpenedUserEditModal() {
      this.$refs.userEditModal.openModal();
    },
    targetUserValue() {
      this.targetUser = this.targetUserValue;
    }
  },
  methods: {
    ...mapActions("users", ["updateUser"]),
    submitUserEditButton() {
      this.$refs.userEditModal.closeModal()
      this.updateUser(this.targetUser)
    },
    cancelUserEditButton() {
      this.$refs.userEditModal.closeModal();
    },
    requiredField(label) {
      if (label==="Name" || label==="Course"){
        return "required"}
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  @apply mx-1;
}
</style>