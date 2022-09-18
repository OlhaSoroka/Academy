<template>
  <BaseModal
    ref="createUpdateAdminModal"
    :header="isUpdateMode ? 'Update admin' : 'Add new admin'"
    @isClosed="clearInputs()"
  >
    <template #body>
      <ValidationObserver v-slot="{ invalid }">
        <div>
          <div class="w-80">
            <BaseInput
              ref="fullName"
              v-model="fullName"
              type="text"
              label="Full Name"
              placeholder="Enter fullname"
              rules="required"
            />
          </div>
          <div class="w-80">
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
            <div class="w-80">
              <BaseInput
                v-model="password"
                type="password"
                label="Password"
                vid="password"
                placeholder="Enter password"
              />
            </div>
            <div class="w-80">
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
                @click="cancelAddNewAdmin"
              >
                Cancel
              </BaseButton>
            </div>
            <div class="mx-2">
              <BaseButton
                :disabled="invalid"
                @click="submitAddNewAdmin"
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
import { ADMIN_ROLE } from "@/constants/roles.constant";
import { mapActions } from "vuex";
export default {
  components: { BaseInput, BaseButton, BaseModal, ValidationObserver },
  props: {
    toggleModal: {
      type: Boolean,
      default: false,
    },
    admin: {
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
      return !!this.admin;
    },
  },
  watch: {
    toggleModal() {
      this.changePasswordMode = false;
      this.$refs.createUpdateAdminModal.openModal();
      if (this.isUpdateMode) {
        this.fullName = this.admin.fullName;
        this.email = this.admin.email;
      }
    },
  },
  methods: {
    ...mapActions("admins", ["createAdmin", "updateAdmin"]),
    clearInputs() {
      this.fullName = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
    },
    submitAddNewAdmin() {
      if (this.isUpdateMode) {
        this.updateAdminHandler();
      } else {
        this.createAdminHandler();
      }
      this.$refs.createUpdateAdminModal.closeModal();
    },
    cancelAddNewAdmin() {
      this.clearInputs();
      this.$refs.createUpdateAdminModal.closeModal();
    },
    toggleChangePassword() {
      this.changePasswordMode = !this.changePasswordMode;
    },
    updateAdminHandler() {
      const adminData = {
        id: this.admin.id,
        fullName: this.fullName,
        email: this.email,
      };
      if (this.changePasswordMode) {
        adminData.password = this.password;
      }
      this.updateAdmin(adminData);
      this.clearInputs();
    },
    createAdminHandler() {
      const admin = {
        email: this.email,
        fullName: this.fullName,
        password: this.password,
        role: ADMIN_ROLE,
      };
      this.createAdmin(admin);
      this.clearInputs();
    },
  },
};
</script>
