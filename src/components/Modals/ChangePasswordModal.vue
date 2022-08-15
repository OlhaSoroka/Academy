<template>
  <BaseModal
    ref="passwordModal"
    :header="'Change password'"
    @isClosed="clearInputs()"
  >
    <template #body>
      <ValidationObserver v-slot="{ invalid }">
        <div class="flex flex-col items-center">
          <div>
            <BaseInput
              v-model="newPassword"
              type="password"
              label="New password"
              vid="password"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <BaseInput
              v-model="confirmedPassword"
              type="password"
              label="Confirm new password"
              rules="confirmed:password"
              vid="confirmpassword"
              placeholder="Confirm password"
            />
          </div>
          <div class="flex justify-center mt-5">
            <div class="mx-1">
              <BaseButton
                :variant="'btn_red'"
                @click="cancelPasswordChange"
              >
                Cancel
              </BaseButton>
            </div>
            <div class="mx-1">
              <BaseButton
                :disabled="invalid"
                @click="submitPasswordChange"
              >
                Submit
              </BaseButton>
            </div>
          </div>
        </div>
      </ValidationObserver>
    </template>
  </BaseModal>
</template>

<script>
import BaseButton from "@/components/BaseComponents/BaseButton.vue";
import BaseModal from "@/components/BaseComponents/BaseModal.vue";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import { ValidationObserver } from "vee-validate";
import { mapActions } from "vuex";
export default {
  components: { BaseButton, BaseModal, BaseInput, ValidationObserver },
  props: {
    toggleModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newPassword: "",
      confirmedPassword: "",
    };
  },
  watch: {
    toggleModal() {
      this.$refs.passwordModal.openModal();
    },
  },
  methods: {
    ...mapActions("user", ["changePassword"]),
    clearInputs() {
      this.newPassword = "";
      this.confirmedPassword = "";
    },
    openPasswordChangeModal() {
      this.$refs.passwordModal.openModal();
    },
    submitPasswordChange() {
      this.changePassword(this.newPassword);
      this.$refs.passwordModal.closeModal();
      this.clearInputs();
    },
    cancelPasswordChange() {
      this.$refs.passwordModal.closeModal();
      this.clearInputs();
    },
  },
};
</script>
