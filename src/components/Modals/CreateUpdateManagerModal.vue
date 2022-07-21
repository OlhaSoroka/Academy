<template>
  <BaseModal
    ref="createUpdateManagerModal"
    :header="updateMode ? 'Update manager' : 'Add new manager'"
  >
    <template #body>
      <div class="mt-1">
        <BaseInput
          ref="fullName"
          v-model="fullName"
          type="text"
          label="Fullname"
          placeholder="Enter fullname"
        />
        <BaseInput
          ref="email"
          v-model="email"
          type="email"
          label="Email"
          vid="email"
          placeholder="Enter email"
        />
        <BaseInput
          v-model="password"
          type="password"
          label="Password"
          vid="password"
          placeholder="Enter password"
        />
        <BaseInput
          v-model="confirmPassword"
          type="password"
          label="Confirm "
          vid="password"
          placeholder="Confirm password"
        />
        <div class="flex justify-center mt-5">
          <div class="mx-1">
            <BaseButton @click="submitAddNewManager">
              {{ updateMode ? 'Update' : 'Create' }}
            </BaseButton>
          </div>
          <div class="mx-1">
            <BaseButton
              :variant="'btn_red'"
              @click="cancelAddNewManager"
            >
              Cancel
            </BaseButton>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseModal from '@/components/BaseModal.vue';
import { MANAGER_ROLE } from '@/constants/roles.constant';
import { mapActions } from 'vuex';
export default {
	components: { BaseInput, BaseButton, BaseModal },
	props: {
		toggleModal: {
			type: Boolean,
			default: false,
		},
		updateMode: {
			required: true,
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
		return { fullName: '', email: '', password: '', confirmPassword: '' };
	},
	watch: {
		toggleModal() {
			this.$refs.createUpdateManagerModal.openModal();
			if (this.updateMode) {
				this.fullName = this.manager.fullName;
        this.email = this.manager.email;
			}
		},
	},
	methods: {
		...mapActions('managers', ['createManager']),
		submitAddNewManager() {
			const manager = {
				email: this.email,
				fullName: this.fullName,
				password: this.password,
				role: MANAGER_ROLE,
			};
			this.createManager(manager);
			this.$refs.createUpdateManagerModal.closeModal();
		},
		cancelAddNewManager() {
			this.$refs.createUpdateManagerModal.closeModal();
		},
	},
};
</script>
