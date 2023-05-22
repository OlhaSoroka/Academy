<template>
	<div>
		<BaseModal ref="userCreateModal" :header="header" @isClosed="clearInputs()">
			<template #body>
				<Form @submit.prevent v-slot="{ errors }">
					<div class="w-60">
						<div class="base-input-container">
							<label class="base-input-label" for="Full Name">Full Name</label>
							<Field :validate-on-input="true" class="base-input" v-model="fullName" :name="'Full Name'"
								rules="required" placeholder="Enter name"></Field>
							<ErrorMessage class="base-input-error-text" :name="'Full Name'">
								<p class="base-input-error-text">{{ requiredErrorMessage }}</p>
							</ErrorMessage>
						</div>
						<div class="base-input-container">
							<label class="base-input-label" for="Email">Email</label>
							<Field :validate-on-input="true" class="base-input" v-model="email" :name="'Email'"
								rules="required||email" placeholder="Enter email"></Field>
							<ErrorMessage class="base-input-error-text" :name="'Email'">
								<p class="base-input-error-text">{{ emailErrorMessage }}</p>
							</ErrorMessage>
						</div>
						<div class="base-input-container">
							<label class="base-input-label" for="Password">Password</label>
							<Field :validate-on-input="true" class="base-input" v-model="password"
								v-bind:type="isPasswordHidden ? 'text' : 'password'" :name="'Password'" rules="min:9"
								placeholder="Enter password"></Field>
							<ErrorMessage class="base-input-error-text" :name="'Password'">
								<p class="base-input-error-text">{{ passwordErrorMessage }}</p>
							</ErrorMessage>
							<div v-show="isPasswordHidden" @click="showPassword()" class="cursor-pointer "><svg
									id="password-eye-fill" width="32" height="32"
									class="absolute top-[259px] left-[234px] text-slate-700">
									<use href="../../icons/spite-navigation.svg#password-eye-fill" />
								</svg></div>
							<div v-show="!isPasswordHidden" @click="showPassword()" class="cursor-pointer "><svg
									id="password-eye-slash" width="32" height="32"
									class="absolute top-[259px] left-[234px] text-slate-600">
									<use href="../../icons/spite-navigation.svg#password-eye-slash" />
								</svg></div>
						</div>
						<div class="base-input-container">
							<label class="base-input-label" for="Confirm password">Confirm password</label>
							<Field :validate-on-input="true" class="base-input" v-model="confirmPassword"
								v-bind:type="isPasswordConfirmedHidden ? 'text' : 'password'" :name="'Confirm password'"
								rules="required|confirmed:@Password" placeholder="Confirm password"></Field>
							<ErrorMessage class="base-input-error-text" :name="'Confirm password'">
								<p class="base-input-error-text">{{ confirmedPasswordMessage }}</p>
							</ErrorMessage>
							<div v-show="isPasswordConfirmedHidden" @click="showConfirmedPassword()"
								class="cursor-pointer "><svg id="password-eye-fill" width="32" height="32"
									class="absolute top-[336px] left-[234px] text-slate-700">
									<use href="../../icons/spite-navigation.svg#password-eye-fill" />
								</svg></div>
							<div v-show="!isPasswordConfirmedHidden" @click="showConfirmedPassword()"
								class="cursor-pointer "><svg id="password-eye-slash" width="32" height="32"
									class="absolute top-[336px] left-[234px] text-slate-600">
									<use href="../../icons/spite-navigation.svg#password-eye-slash" />
								</svg></div>
						</div>
						<div v-if="isStudent" class="mt-5">
							<label for="courses" class="base-input-label">Select Course</label>
							<select id="courses" v-model="courseId" class="select__course">
								<option value="" disabled selected>
									Select Course
								</option>
								<option v-for="course in coursesStore.activeCourses" :key="course.id" :value="course.id">
									{{ course.name }}
								</option>
							</select>
						</div>
						<div class="flex justify-end mt-6">
							<div class="mr-2">
								<BaseButton :disabled="!isFormValid(errors)" :variant="'btn_blue_outlined'"
									@click="submitUserCreateButton">
									Create
								</BaseButton>
							</div>
							<div>
								<BaseButton :disabled="false" :variant="'btn_red_outlined'" @click="cancelUserCreateButton">
									Cancel
								</BaseButton>
							</div>
						</div>
					</div>
				</Form>
			</template>
		</BaseModal>
	</div>
</template>
  
<script lang="ts">
import { mapStores } from 'pinia';
import { defineComponent } from 'vue'
import { ROLES } from '../../models/router.model';
import { useCoursesStore } from '../../store/courses';
import BaseButton from '../baseComponents/BaseButton.vue';
import BaseModal from '../baseComponents/BaseModal.vue';
import { RegisterUserBody } from "../../api/models/user.model";
import { useStudentStore } from '../../store/students';
import { useAdminStore } from '../../store/admins';
import { useMentorStore } from '../../store/mentors';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { REQUIRED_ERROR_MESSAGE, INVALID_EMAIL_ERROR_MESSAGE, INVALID_PASSWORD, INVALID_CONFIRMED_PASSWORD } from '../../constants/form-errors-constants';


export default defineComponent({
	name: "UserCreateModal",
	props: {
		toggleModal: {
			required: true,
			type: Boolean,
		},
		role: {
			required: true,
			type: String
		},
		header: {
			required: true,
			type: String
		}
	},
	data() {
		return {
			courseId: "",
			confirmPassword: "",
			email: "",
			fullName: "",
			password: "",
			isPasswordHidden: false,
			isPasswordConfirmedHidden: false,
		};
	},

	computed: {
		...mapStores(useCoursesStore, useStudentStore, useAdminStore, useMentorStore),
		isStudent() {
			return this.role === 'student';
		},
		requiredErrorMessage() {
			return REQUIRED_ERROR_MESSAGE;
		},
		emailErrorMessage() {
			return !this.email ? REQUIRED_ERROR_MESSAGE : INVALID_EMAIL_ERROR_MESSAGE;
		},
		passwordErrorMessage() {
			return INVALID_PASSWORD;
		},
		confirmedPasswordMessage() {
			return INVALID_CONFIRMED_PASSWORD;
		},
	},
	watch: {
		toggleModal() {
			(this.$refs.userCreateModal as typeof BaseModal).openModal();
		},

	},
	mounted() {
		this.coursesStore.fetchCourses();
	},
	methods: {
		isFormValid(errors: Partial<Record<string, string | undefined>>) {
			if (this.role === ROLES.STUDENTS_ROLE) {
				return Object.keys(errors).length === 0 && this.password === this.confirmPassword && this.fullName && this.email && this.courseId;
			}
			return Object.keys(errors).length === 0 && this.password === this.confirmPassword && this.fullName && this.email;
		},
		clearInputs() {
			this.courseId = ""
			this.confirmPassword = ""
			this.email = ""
			this.fullName = ""
			this.password = ""
		},
		async submitUserCreateButton() {
			const registerBody: RegisterUserBody = {
				email: this.email,
				fullName: this.fullName,
				password: this.password,
				role: this.role as ROLES,
			}
			if (registerBody.role === ROLES.STUDENTS_ROLE) {
				registerBody.courseId = this.courseId;
			}
			(this.$refs.userCreateModal as typeof BaseModal).closeModal();
			switch (registerBody.role) {
				case ROLES.STUDENTS_ROLE:
					await this.studentStore.createStudent(registerBody)
					break;
				case ROLES.MENTOR_ROLE:
					await this.mentorStore.createMentor(registerBody)
					break;
				case ROLES.ADMIN_ROLE:
					await this.adminStore.createAdmin(registerBody)
					break;
			}
		},
		cancelUserCreateButton() {
			(this.$refs.userCreateModal as typeof BaseModal).closeModal();
			this.clearInputs();
		},
		showPassword() {
			this.isPasswordHidden = !this.isPasswordHidden;
		},
		showConfirmedPassword() {
			this.isPasswordConfirmedHidden = !this.isPasswordConfirmedHidden;
		}
	},
	components: { BaseModal, BaseButton, Form, Field, ErrorMessage }
})
</script>
  
<style lang="scss" scoped>
.select__course {
	@apply p-1 w-full border-2 border-primary-600 rounded-sm text-sm font-mono placeholder:text-slate-400 hover:bg-stone-50 focus:drop-shadow-xl focus:bg-stone-50 focus:border-primary-700 focus:outline-none focus:text-slate-900;
}</style>