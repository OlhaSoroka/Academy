<template>
	<BaseModal ref="passwordModal" :header="'Change password'" @isClosed="clearInputs()">
		<template #body>
			<Form @submit.prevent v-slot="{ errors }">
				<div class="flex flex-col">
					<div class="w-52">
						<div class="base-input-container">
							<label for="New password">Password</label>
							<Field class="base-input" v-model="newPassword" name="New password" rules="required"
								:validate-on-input="true" />
							<div>
								<ErrorMessage class="base-input-error-text" name="New password" />
							</div>
						</div>
						<div class="base-input-container">
							<label for="Confirmed password">Confirmed password</label>
							<Field class="base-input" v-model="confirmedPassword" name="Confirmed password"
								rules="required|confirmed:@New password" :validate-on-input="true" />
							<div>
								<ErrorMessage class="base-input-error-text" name="Confirmed password" />
							</div>
						</div>
					</div>
					<div class="flex justify-end mt-5">
						<div class="mr-2">
							<BaseButton :variant="'btn_blue_outlined'" :disabled="!isFormValid(errors)"
								@click="submitPasswordChange">
								Submit
							</BaseButton>
						</div>
						<div>
							<BaseButton :variant="'btn_red_outlined'" @click="cancelPasswordChange">
								Cancel
							</BaseButton>
						</div>
					</div>
				</div>
			</Form>
		</template>
	</BaseModal>
</template>
  
<script lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate';
import BaseButton from '../baseComponents/BaseButton.vue';
import BaseModal from '../baseComponents/BaseModal.vue';
import { defineComponent } from 'vue';
import { changePassword } from '../../api/user';

export default defineComponent({
	components: { BaseButton, BaseModal, Form, ErrorMessage, Field },
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
			return Object.keys(errors).length === 0;
		},
	},
});
</script>