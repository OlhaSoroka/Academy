<template>
	<BaseModal ref="passwordModal" :header="'Change password'" @isClosed="clearInputs()">
		<template #body>
			<Form @submit.prevent v-slot="{ errors }">
				<div class="flex flex-col">
					<div class="w-52">
						<div class="base-input-container relative">
							<label for="New password" class="base-input-label">Password</label>
							<Field class="base-input" v-model="newPassword" name="New password" rules="required||min:9"
								placeholder="Enter new password" :validate-on-input="true"
								v-bind:type="isPasswordHidden ? 'text' : 'password'" />
							<div>
								<ErrorMessage class="base-input-error-text" :name="'New password'">
									<p class="base-input-error-text">{{ passwordErrorMessage }}</p>
								</ErrorMessage>
							</div>
							<div>
								<div v-show="isPasswordHidden" @click="showPassword()" class="cursor-pointer "><svg
										id="password-eye-fill" width="32" height="32"
										class="absolute top-[48px] left-[180px] text-slate-700">
										<use href="../../icons/spite-navigation.svg#password-eye-fill" />
									</svg></div>
								<div v-show="!isPasswordHidden" @click="showPassword()" class="cursor-pointer "><svg
										id="password-eye-slash" width="32" height="32"
										class="absolute top-[48px] left-[180px] text-slate-600">
										<use href="../../icons/spite-navigation.svg#password-eye-slash" />
									</svg></div>
							</div>
						</div>
					</div>
					<div class="base-input-container relative">
						<label for="Confirmed password" class="base-input-label">Confirm password</label>
						<Field class="base-input" v-model="confirmedPassword" name="Confirmed password"
							placeholder="Confirm new password" rules="confirmed:@New password" :validate-on-input="true" 
							v-bind:type="isPasswordConfirmedHidden ? 'text' : 'password'"/>
						<div>
							<ErrorMessage class="base-input-error-text" :name="'Confirmed password'">
								<p class="base-input-error-text">{{ confirmErrorMessage }}</p>
							</ErrorMessage>
							<div>
								<div v-show="isPasswordConfirmedHidden" @click="showConfirmedPassword()"
									class="cursor-pointer "><svg id="password-eye-fill" width="32" height="32"
										class="absolute top-[48px] left-[180px] text-slate-700">
										<use href="../../icons/spite-navigation.svg#password-eye-fill" />
									</svg></div>
								<div v-show="!isPasswordConfirmedHidden" @click="showConfirmedPassword()"
									class="cursor-pointer "><svg id="password-eye-slash" width="32" height="32"
										class="absolute top-[48px] left-[180px] text-slate-600">
										<use href="../../icons/spite-navigation.svg#password-eye-slash" />
									</svg></div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex justify-end mt-8">
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
import { INVALID_CONFIRMED_PASSWORD, INVALID_PASSWORD, REQUIRED_ERROR_MESSAGE } from '../../constants/form-errors-constants';

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
			isPasswordHidden: false,
			isPasswordConfirmedHidden: false,
		};
	},
	watch: {
		toggleModal() {
			(this.$refs.passwordModal as typeof BaseModal).openModal();
		},
	},
	computed: {
		passwordErrorMessage() {
			return !this.newPassword ? REQUIRED_ERROR_MESSAGE : INVALID_PASSWORD;
		},
		confirmErrorMessage() {
			return !this.confirmedPassword ? REQUIRED_ERROR_MESSAGE : INVALID_CONFIRMED_PASSWORD
		}
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
			return Object.keys(errors).length === 0 && this.newPassword.length>0 &&this.confirmedPassword.length>0;
		},
		showPassword() {
			this.isPasswordHidden = !this.isPasswordHidden;
		},
		showConfirmedPassword() {
			this.isPasswordConfirmedHidden = !this.isPasswordConfirmedHidden;
		}
	},
});
</script>