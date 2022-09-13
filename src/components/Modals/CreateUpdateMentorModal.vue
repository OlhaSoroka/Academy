<template>
  <BaseModal
    ref="createUpdateMentorModal"
    :header="isUpdateMode ? 'Update mentor' : 'Add new mentor'"
    @isClosed="clearInputs()"
  >
    <template #body>
      <ValidationObserver v-slot="{ invalid }">
        <div>
          <div>
            <BaseInput
              ref="fullName"
              v-model="fullName"
              type="text"
              label="Full Name"
              placeholder="Enter fullname"
              rules="required"
            />
          </div>
          <div>
            <BaseInput
              ref="email"
              v-model="email"
              type="email"
              label="Email"
              vid="email"
              placeholder="Enter email"
            />
          </div>
          <div v-if="!isUpdateMode || changePasswordMode">
            <div>
              <BaseInput
                v-model="password"
                type="password"
                label="Password"
                vid="password"
                placeholder="Enter password"
              />
            </div>
            <div>
              <BaseInput
                v-model="confirmPassword"
                type="password"
                label="Confirm password"
                placeholder="Confirm password"
                vid="confirmpassword"
                rules="confirmed:password"
              />
            </div>
          </div>
          <div class="mt-6">
            <div
              v-if="isUpdateMode"
              class="mx-1"
            >
              <BaseButton @click="toggleChangePassword">
                {{ changePasswordMode ? "Hide password" : "Change password" }}
              </BaseButton>
            </div>
          </div>
          <div class="flex justify-evenly mt-5">
            <div class="mx-2">
              <BaseButton
                :variant="'btn_red'"
                @click="cancelAddNewMentor"
              >
                Cancel
              </BaseButton>
            </div>
            <div class="mx-2">
              <BaseButton
                :disabled="invalid"
                @click="submitAddNewMentor"
              >
                {{ isUpdateMode ? "Update" : "Create" }}
              </BaseButton>
            </div>
          </div>
        </div>
      </ValidationObserver>
    </template>
  </BaseModal>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import BaseButton from "@/components/BaseComponents/BaseButton.vue";
import BaseModal from "@/components/BaseComponents/BaseModal.vue";
import { MENTOR_ROLE } from "@/constants/roles.constant";
import { mapActions } from "vuex";
export default {
  components: { BaseInput, BaseButton, BaseModal, ValidationObserver },
  props: {
    toggleModal: {
      type: Boolean,
      default: false,
    },
    mentor: {
      required: false,
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      changePasswordMode: false,
    };
  },
  computed: {
    isUpdateMode() {
      return !!this.mentor;
    },
  },
  watch: {
    toggleModal() {
      this.changePasswordMode = false;
      this.$refs.createUpdateMentorModal.openModal();
      if (this.isUpdateMode) {
        this.fullName = this.mentor.fullName;
        this.email = this.mentor.email;
      }
    },
  },
  methods: {
    ...mapActions("mentors", ["createMentor", "updateMentor"]),
    clearInputs() {
      this.fullName = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
    },
    submitAddNewMentor() {
      if (this.isUpdateMode) {
        this.updateMentorHandler();
      } else {
        this.createMentorHandler();
      }
      this.$refs.createUpdateMentorModal.closeModal();
    },
    cancelAddNewMentor() {
      this.clearInputs();
      this.$refs.createUpdateMentorModal.closeModal();
    },
    toggleChangePassword() {
      this.changePasswordMode = !this.changePasswordMode;
    },
    updateMentorHandler() {
      const mentorData = {
        id: this.mentor.id,
        fullName: this.fullName,
        email: this.email,
      };
      if (this.changePasswordMode) {
        mentorData.password = this.password;
      }
      this.updateMentor(mentorData);
      this.clearInputs();
    },
    createMentorHandler() {
      const mentor = {
        email: this.email,
        fullName: this.fullName,
        password: this.password,
        role: MENTOR_ROLE,
      };
      this.createMentor(mentor);
      this.clearInputs();
    },
  },
};
</script>
