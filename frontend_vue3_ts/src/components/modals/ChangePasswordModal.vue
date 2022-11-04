<template>
	<BaseModal ref="passwordModal" :header="'Change password'" @isClosed="clearInputs()">
		<template #body>
			<Form @submit.prevent v-slot="{ errors }">
				<div class="flex flex-col items-center">
					<div class="w-64">
						<BaseInput type="password" label="Password" v-model="newPassword"
							placeholder="Enter new password" rules="required" />
					</div>
					<div class="w-64">
						<BaseInput v-model="confirmedPassword" type="password" label="Confirm password"
							rules="required" placeholder="Confirm new password" />
					</div>
					<div class="w-full flex justify-around mt-2">
						<div class="mx-1">
							<BaseButton :variant="'btn_red'" @click="cancelPasswordChange">
								Cancel
							</BaseButton>
						</div>
						<div class="mx-1">
							<BaseButton :disabled="!isFormValid(errors)" @click="submitPasswordChange">
								Submit
							</BaseButton>
						</div>
					</div>
				</div>
			</Form>
		</template>
	</BaseModal>
</template>
  
<script lang="ts">
import { Form } from 'vee-validate';
import BaseButton from '../baseComponents/BaseButton.vue';
import BaseModal from '../baseComponents/BaseModal.vue';
import BaseInput from '../baseComponents/BaseInput.vue';
import { defineComponent } from 'vue';
import { changePassword } from '../../api/user';

export default defineComponent({
	components: { BaseButton, BaseModal, BaseInput, Form },
	props: {
		toggleModal: {
			type: Boolean,
			default: true,
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
			(this.$refs.passwordModal as typeof BaseModal).openModal();
		},
	},
	methods: {
		clearInputs() {
			this.newPassword = "";
			this.confirmedPassword = "";
		},
		openPasswordChangeModal() {
			(this.$refs.passwordModal as typeof BaseModal).openModal();
		},
		async submitPasswordChange() {
			await changePassword(this.newPassword);
			(this.$refs.passwordModal as typeof BaseModal).closeModal();
			this.clearInputs();
		},
		cancelPasswordChange() {
			(this.$refs.passwordModal as typeof BaseModal).closeModal();
			this.clearInputs();
		},
		isFormValid(errors: Partial<Record<string, string | undefined>>) {
			return Object.keys(errors).length === 0 && this.newPassword === this.confirmedPassword;
		},
	},
});
</script>