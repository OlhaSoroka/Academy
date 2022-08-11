<template>
  <BaseModal
    ref="createUpdateManagerModal"
    :header="isUpdateMode ? 'Update manager' : 'Add new manager'"
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
              label="Fullname"
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
                label="New password"
                vid="password"
                placeholder="Enter password"
              />
            </div>
            <div>
              <BaseInput
                v-model="confirmPassword"
                type="password"
                label="Confirm new password"                
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
                :disabled="invalid"
                @click="submitAddNewManager"
              >
                {{ isUpdateMode ? "Update" : "Create" }}
              </BaseButton>
            </div>
            <div class="mx-2">
              <BaseButton
                :variant="'btn_red'"
                @click="cancelAddNewManager"
              >
                Cancel
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
import { MANAGER_ROLE } from "@/constants/roles.constant";
import { mapActions } from "vuex";
export default {
	components: { BaseInput, BaseButton, BaseModal, ValidationObserver },
	props: {
		toggleModal: {
			type: Boolean,
			default: false,
		},
		manager: {
			required: false,
			type: Object,
			default: null,
		},
	},
	data() {
		return { fullName: '', email: '', password: '', confirmPassword: '', changePasswordMode: false };
	},
	computed: {
		isUpdateMode() {
			return !!this.manager;
		},
	},
	watch: {
		toggleModal() {
			this.changePasswordMode = false;
			this.$refs.createUpdateManagerModal.openModal();
			if (this.isUpdateMode) {
				this.fullName = this.manager.fullName;
				this.email = this.manager.email;
			}
		},
	},
	methods: {
		...mapActions('managers', ['createManager', 'updateManager']),
		clearInputs() {
			this.fullName = '';
			this.email = '';
			this.password = '';
			this.confirmPassword = '';
		},
		submitAddNewManager() {
			if (this.isUpdateMode) {
				this.updateManagerHandler();
			} else {
				this.createManagerHandler();
			}
			this.$refs.createUpdateManagerModal.closeModal();
		},
		cancelAddNewManager() {
			this.clearInputs();
			this.$refs.createUpdateManagerModal.closeModal();
		},
		toggleChangePassword() {
			this.changePasswordMode = !this.changePasswordMode;
		},
		updateManagerHandler() {
			const managerData = {
				id: this.manager.id,
				fullName: this.fullName,
				email: this.email,
			};
			if (this.changePasswordMode) {
				managerData.password = this.password;
			}
			this.updateManager(managerData);
			this.clearInputs();
		},
		createManagerHandler() {
			const manager = {
				email: this.email,
				fullName: this.fullName,
				password: this.password,
				role: MANAGER_ROLE,
			};
			this.createManager(manager);
			this.clearInputs();
		},
	},
};
</script>
