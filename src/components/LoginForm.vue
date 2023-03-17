<template>
	<div>
		<Form>
			<div class="login__input_container ">
				<BaseInput type="email" label="Email" v-model="formData.email" placeholder="Enter email"
					additionalRules="required" />
			</div>
			<div v-if="isLoginPage">
				<BaseInput type="password" label="Password" v-model="formData.password" placeholder="Enter password"
					additionalRules="required" />
				<p class="login__link" @click="goToResetPage">
					Forgot password?
				</p>
				<div class="login__button_container">
					<BaseButton :loading="isDataLoading" class="mt-3" @click="onSubmit()">
						Submit
					</BaseButton>
				</div>

				<!-- <BaseSpinner v-if="isDataLoading" /> -->
			</div>
		</Form>
		<div v-if="!isLoginPage">
			<div class="login__button_container "><BaseButton @click="resetPasswordOnEmail">
				Reset Password
			</BaseButton></div>
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
import BaseInput from "./baseComponents/BaseInput.vue";
import { Form } from "vee-validate";
import { ToastType, useToastStore } from "../store/toast.store";
import { ROUTE_NAMES } from "../models/router.model";
import { gethUserByID } from "../api/user";

export default {
	name: "LoginForm",
	components: {
		BaseButton,
		BaseInput,
		Form
	},
	data: () => ({
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
	}),
	computed: {
		...mapStores(useUserStore, useToastStore),
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
				}else {
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
	},
};
</script>
  
<style lang="scss" scoped>
.login__link {
	@apply cursor-pointer hover:opacity-75 transition-opacity underline text-xs text-end;
}
.login__input_container {
	@apply mb-4 
}
.login__button_container {
	@apply flex justify-center items-center
}
</style>
  