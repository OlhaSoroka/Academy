<template>
	<div>
		<BaseModal ref="userCreateModal" :header="header" @isClosed="clearInputs()">
			<template #body>
				<Form @submit.prevent v-slot="{ errors }">
					<div class="w-60">
						<div class="base-input-container">
								<label class="base-input-label" for="Full Name">Full Name</label>
								<Field :validate-on-input="true" class="base-input" v-model="fullName" :name="'Full Name'" rules="required" placeholder="Enter name"></Field>
								<ErrorMessage class="base-input-error-text" :name="'Full Name'"></ErrorMessage>
						</div>
						<div class="base-input-container">
								<label class="base-input-label" for="Password">Email</label>
								<Field :validate-on-input="true" class="base-input" v-model="email" :name="'Email'" rules="required" placeholder="Enter email"></Field>
								<ErrorMessage class="base-input-error-text" :name="'Email'"></ErrorMessage>
						</div>
						<div class="base-input-container">
								<label class="base-input-label" for="Password">Password</label>
								<Field :validate-on-input="true" class="base-input" v-model="password" :name="'Password'" rules="required" placeholder="Enter password"></Field>
								<ErrorMessage class="base-input-error-text" :name="'Password'"></ErrorMessage>
						</div>
						<div class="base-input-container">
								<label class="base-input-label" for="Confirm password">Confirm password</label>
								<Field :validate-on-input="true" class="base-input" v-model="confirmPassword" :name="'Confirm password'" rules="required|confirmed:@Password" placeholder="Confirm password"></Field>
								<ErrorMessage class="base-input-error-text" :name="'Confirm password'"></ErrorMessage>
						</div>
						<div v-if="isStudent" class="mt-5">
							<label for="courses" class="base-input-label">Select Course</label>
							<select id="courses" v-model="courseId" class="select__course">
								<option value="" disabled selected>
									Select Course
								</option>
								<option v-for="course in coursesStore.activeCourses" :key="course.id"
									:value="course.id">
									{{ course.name }}
								</option>
							</select>
						</div>
						<div class="flex justify-end mt-6">
							<div class="mr-2">
								<BaseButton :disabled="!isFormValid(errors)" :variant="'btn_blue_outlined'" @click="submitUserCreateButton">
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

interface CreateUserData {
	courseId?: string;
	fullName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

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
	data(): CreateUserData {
		return {
			courseId: "",
			confirmPassword: "",
			email: "",
			fullName: "",
			password: ""
		};
	},
	computed: {
		...mapStores(useCoursesStore, useStudentStore, useAdminStore, useMentorStore),
		isStudent() {
			return this.role === 'student';
		}
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
	},
	components: { BaseModal, BaseButton, Form, Field, ErrorMessage }
})
</script>
  
<style lang="scss" scoped>
.select__course {
	@apply  p-1 w-full border-2 border-primary-600 rounded-sm text-base font-mono placeholder:text-slate-400 hover:bg-stone-50 focus:drop-shadow-xl focus:bg-stone-50 focus:border-primary-700 focus:outline-none focus:text-slate-900;
}
</style>