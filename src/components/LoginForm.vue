<template>
	<div>
		<Form>
			<div class="login__input_container ">
				<div class="base-input-container">
					<label for="Email" class="base-input-label">Email</label>
					<Field class="base-input" v-model="formData.email" name="Email" rules="required||email"
						placeholder="Enter email" :validate-on-input="true" />
					<div>
						<ErrorMessage class="base-input-error-text" name="Email">
							<p class="base-input-error-text">{{ emailErrorMessage }}</p>
						</ErrorMessage>
					</div>
				</div>
			</div>
			<div v-if="isLoginPage">

				<div class="base-input-container relative">
					<label for="Password" class="base-input-label">Password</label>
					<Field class="base-input" v-model="formData.password" name="Password" rules="required"
						v-bind:type="isPasswordHidden ? 'text' : 'password'" placeholder="Enter password"
						:validate-on-input="true" />
					<div>
						<ErrorMessage class="base-input-error-text" name="Password">
							<p class="base-input-error-text">{{ passwordErrorMessage }}</p>
						</ErrorMessage>
					</div>
					<div v-show="isPasswordHidden" @click="showPassword()" class="cursor-pointer "><svg
							id="password-eye-fill" width="32" height="32"
							class="absolute top-[48px] left-[258px] text-slate-700">
							<use href="../icons/spite-navigation.svg#password-eye-fill" />
						</svg></div>
					<div v-show="!isPasswordHidden" @click="showPassword()" class="cursor-pointer "><svg
							id="password-eye-slash" width="32" height="32"
							class="absolute top-[48px] left-[258px] text-slate-600">
							<use href="../icons/spite-navigation.svg#password-eye-slash" />
						</svg></div>
				</div>
				<p class="login__link" @click="goToResetPage">
					Forgot password?
				</p>
				<div class="login__button_container">
					<BaseButton :loading="isDataLoading" class="mt-3" @click="onSubmit()">
						Submit
					</BaseButton>
				</div>
			</div>
		</Form>
		<div v-if="!isLoginPage">
			<div class="login__button_container mt-8">
				<BaseButton @click="resetPasswordOnEmail">
					Reset Password
				</BaseButton>
			</div>
			<p class="login__link" @click="goToLoginPage">
				Back to login
			</p>
		</div>
	</div>
</template>
  
<script lang="ts">

import { firebaseAuth } from "../main";
import { mapStores } from "pinia";
import { useUserStore } from '../store/user';
import {
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from "firebase/auth";
import BaseButton from "./baseComponents/BaseButton.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { ToastType, useToastStore } from "../store/toast.store";
import { ROUTE_NAMES } from "../models/router.model";
import { gethUserByID } from "../api/user";
import { defineComponent } from "vue";
import { REQUIRED_ERROR_MESSAGE, INVALID_EMAIL_ERROR_MESSAGE } from "../constants/form-errors-constants";

export default defineComponent({
	name: "LoginForm",
	components: {
		BaseButton,
		Form,
		Field,
		ErrorMessage
	},
	data() {
		return {
			formData: {
				email: "",
				password: "",
			},
			errorHandler: {
				isError: false,
				message: "",
			},
			isLoginPage: true,
			isDataLoading: false,
			errorResetHandler: {
				isError: false,
				message: "",
			},
			isPasswordHidden: false,
		}
	},
	computed: {
		...mapStores(useUserStore, useToastStore),
		emailErrorMessage() {
			return !this.formData.email ? REQUIRED_ERROR_MESSAGE : INVALID_EMAIL_ERROR_MESSAGE;
		},
		passwordErrorMessage() {
			return REQUIRED_ERROR_MESSAGE;
		}
	},
	methods: {
		async onSubmit() {
			this.isDataLoading = true;
			try {
				const { user } = await signInWithEmailAndPassword(
					firebaseAuth,
					this.formData.email,
					this.formData.password
				)

				const currentUser = await gethUserByID(user.uid);
				if (!currentUser) {
					this.toastStore.showToastMessage({ message: "The user has been deleted", type: ToastType.FAILURE })
				}
				if (currentUser?.archive) {
					this.toastStore.showToastMessage({ message: "You can't enter.Your course already finished", type: ToastType.FAILURE })
				} else {
					localStorage.setItem("currentUser", JSON.stringify(currentUser));

					this.$router.push({ name: ROUTE_NAMES.COURSE_DASHBOARD });
				}


				this.errorHandler.isError = false;
				this.errorHandler.message = "";
				this.isDataLoading = false;

			} catch (error: any) {
				this.errorHandler.isError = true;
				this.isDataLoading = false;
				switch (error.code) {
					case "auth/user-not-found":
						this.errorHandler.message = "Invalid email or password";
						break;
					case "auth/wrong-password":
						this.errorHandler.message = "Invalid email or password";
						break;
					case "auth/invalid-email":
						this.errorHandler.message = "Invalid email";
						break;
					default:
						this.errorHandler.message = error.code;
				}
				this.toastStore.showToastMessage({ message: this.errorHandler.message, type: ToastType.FAILURE })
				this.userStore.logoutUser();
			}
		},
		logout() {
			this.userStore.logoutUser();
		},
		resetPasswordOnEmail() {
			this.isLoginPage = false;
			this.errorResetHandler.message = "";
			this.errorResetHandler.isError = false;
			sendPasswordResetEmail(firebaseAuth, this.formData.email)
				.then((response) => {
					this.isLoginPage = true;
					this.toastStore.showToastMessage({ message: "Check your email for letter", type: ToastType.SUCCESS })
					return response;
				})
				.catch((error) => {
					this.errorResetHandler.isError = true;
					if (error.code == "auth/user-not-found") {
						this.errorResetHandler.message = "User not found";
					} else if (error.code === "auth/invalid-email") {
						this.errorResetHandler.message = "Invalid email";
					} else {
						this.errorResetHandler.message = "Can't reset your password";
					}
					this.toastStore.showToastMessage({ message: this.errorResetHandler.message, type: ToastType.FAILURE })
				});
		},
		goToLoginPage() {
			this.isLoginPage = true;
			this.errorResetHandler.message = "";
		},
		goToResetPage() {
			this.isLoginPage = false;
			this.errorHandler.message = "";
		},
		showPassword() {
			this.isPasswordHidden = !this.isPasswordHidden;
		}
	},
});
</script>
  
<style lang="scss" scoped>
.login__link {
	@apply cursor-pointer hover:opacity-75 transition-opacity underline text-xs text-end mt-3;
}

.login__input_container {
	@apply mb-4
}

.login__button_container {
	@apply flex justify-center items-center
}
</style>
  