<template>
	<div>
		<BaseModal ref="userCreateModal" :header="header" @isClosed="clearInputs()">
			<template #body>
				<Form @submit.prevent v-slot="{ errors }">
					<div>
						<div>
							<BaseInput v-model="fullName" type="text" label="Full Name" placeholder="Enter name"
								rules="required" />
						</div>
						<div>
							<BaseInput v-model="email" type="email" label="Email" placeholder="Enter email"
								rules="required" />
						</div>
						<div>
							<BaseInput v-model="password" type="password" label="Password" placeholder="Enter password"
								rules="required" />
						</div>
						<div>
							<BaseInput v-model="confirmPassword" type="password" label="Confirm password"
								placeholder="Confirm password" rules="required" />
						</div>
						<div v-if="isStudent">
							<label for="courses" class="block ml-1 text-start">Select Course</label>
							<select id="courses" v-model="courseId" class="select__course">
								<option value="" disabled selected>
									Select Course
								</option>
								<option v-for="course in coursesStore.courses" :key="course.id"
									:value="course.id">
									{{ course.name }}
								</option>
							</select>
						</div>
						<div class="flex justify-evenly mt-5">
							<div class="mx-2">
								<BaseButton :disabled="false" variant="btn_red" @click="cancelUserCreateButton">
									Cancel
								</BaseButton>
							</div>
							<div class="mx-2">
								<BaseButton :disabled="!isFormValid(errors)" @click="submitUserCreateButton">
									Create
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
import BaseInput from '../baseComponents/BaseInput.vue';
import BaseModal from '../baseComponents/BaseModal.vue';
import { RegisterUserBody } from "../../api/models/user.model";
import { useStudentStore } from '../../store/students';
import { useAdminStore } from '../../store/admins';
import { useMentorStore } from '../../store/mentors';
import { Form } from 'vee-validate';

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

			(this.$refs.userCreateModal as typeof BaseModal).closeModal();
		},
		cancelUserCreateButton() {
			(this.$refs.userCreateModal as typeof BaseModal).closeModal();
			this.clearInputs();
		},
	},
	components: { BaseModal, BaseButton, BaseInput, Form }
})
</script>
  
<style lang="postcss" scoped>
.select__course {
	@apply block p-1 m-1 w-full ml-1 border-2 border-primary-700 rounded-md text-base font-mono placeholder:text-slate-400 hover:bg-stone-50 focus:drop-shadow-xl focus:bg-stone-50 focus:border-primary-700 focus:outline-none focus:text-cyan-900;
}
</style>