!<template>
  <div>
    <BaseModal
      ref="userCreateModal" 
      :header="'Create new User'"
    >
      <template #body>
        <ValidationObserver v-slot="{ invalid }">
          <div 
            class="flex flex-col items-center text-start mt-5"
          >
            <div
              v-for="input in userInputsValue" 
              :key="input.label"
            >
              <BaseInput
                v-model="createModel[input.model]"
                :type="input.type"
                :label="input.label"
                :placeholder="input.placeholder"
              />
            </div>
            <div 
              class="flex justify-center mt-5"
            >
              <BaseButton
                :disabled="invalid" 
                @click="submitUserCreateButton"
              >
                Submit
              </BaseButton>
              <BaseButton
                :disabled="false"
                variant="btn_red"
                @click="canselUserCreateButton"
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
  name: "UserCreateModal",
  components: {
    BaseModal,
    BaseInput,
    BaseButton,
    ValidationObserver,
  },
  props: {
    isOpenedUserCreateModal: {
      required: true,
      type: Boolean,
    },
    userInputsValue: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      createModel: {
        fullName: "",
        password: "",
        email: "",
        course: "",
        initialScore: "",
        role: "user",
        avatarUrl:
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png",
      },
    };
  },
  watch: {
    isOpenedUserCreateModal() {
      this.$refs.userCreateModal.openModal();
    },
  },
  methods: {
    ...mapActions("users", ["createNewUser"]),
    clearInputs() {
      this.createModel = {
        fullName: "",
        password: "",
        email: "",
        course: "",
        initialScore: "",
        role: "user",
        avatarUrl:
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png",
      }
    },
    submitUserCreateButton() {
      this.$refs.userCreateModal.closeModal()
      this.createNewUser(this.createModel)
      
    },
    canselUserCreateButton() {
      this.$refs.userCreateModal.closeModal();
      this.clearInputs()
    },
  }
};
</script>

<style lang="scss" scoped>
button {
  @apply mx-1;
}
</style>