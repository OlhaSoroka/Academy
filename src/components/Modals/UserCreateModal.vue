!<template>
  <div>
    <BaseModal
      ref="userCreateModal"
      :header="'Add new user'"
      @isClosed="clearInputs()"
    >
      <template #body>
        <ValidationObserver v-slot="{ invalid }">
          <div>
            <div
              v-for="input in userInputsValue" 
              :key="input.label"
            >            
              <BaseInput
                v-model="createModel[input.model]"
                :type="input.type"
                :label="input.label"
                :placeholder="input.placeholder"
                :vid="input.vid"
                :rules="requiredField(input.label)"
              />
            </div>
            <div 
              class="flex justify-evenly mt-5"
            >
              <div class="mx-2">
                <BaseButton
                  :disabled="false"
                  variant="btn_red"
                  @click="canselUserCreateButton"
                >
                  Cancel
                </BaseButton>
              </div>
              <div class="mx-2">
                <BaseButton
                  :disabled="invalid"
                  @click="submitUserCreateButton"
                >
                  Create
                </BaseButton>
              </div>
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
        confirmpassword: "",
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
        confirmpassword: "",
        email: "",
        course: "",
        initialScore: "",
        role: "user",
        avatarUrl:
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png",
      }
    },
    submitUserCreateButton() {
      this.createNewUser(this.createModel)
      this.$refs.userCreateModal.closeModal()
    },
    canselUserCreateButton() {
      this.$refs.userCreateModal.closeModal();
      this.clearInputs()
    },
    requiredField(label) {
      if (label==="Full Name" || label==="Course" || label==="Initial Score"){
        return "required"}
      if (label==="Confirm password") {
        return "confirmed:password"
      }
      if (label==="Password") {
        return "confirmed:password"
      }
    }
  }
};
</script>