<template>
	<BaseModal ref="cdUpdateModal" :header="'Update course details'">
		<template #body>
			<div class="w-72">
				<Form @submit="submit()" v-slot="{ errors }">
					<div class="text-left">
						<!-- <BaseInput v-model="courseToUpdate.name" type="text" label="Course Name" placeholder="Course Name" /> -->
						<BaseInput v-model="courseToUpdate.date" type="date" label="Date of starting"
							rules="required" />
						<BaseInput v-model="courseToUpdate.date_project_start" type="date"
							label="Date of starting project" />
						<BaseInput v-model="courseToUpdate.date_project_demo" type="date" label="Date of demo" />
						<BaseInput v-model="courseToUpdate.date_final_interview" type="date"
							label="Date of final interview" />
						<div class="w-full text-left ml-1">
							<label for="status">Status</label>
						</div>
						<select id="status" v-model="courseToUpdate.status" rules="required"
							class="block p-1 m-1 w-full ml-1 border-2 border-primary-700 rounded-md text-base font-mono placeholder:text-slate-400 hover:bg-stone-50 focus:drop-shadow-xl focus:bg-stone-50 focus:border-primary-700 focus:outline-none focus:text-cyan-900">
							<option v-for="status in statuses" :key="status" :value="status">
								{{ status }}
							</option>
						</select>
					</div>
					<div class="flex justify-evenly mt-5">
						<div class="mx-2">
							<BaseButton button-type="reset" variant="btn_red" @click="cancel">
								Cancel
							</BaseButton> 
						</div>
						<div class="mx-2">
							<BaseButton button-type="submit" :disabled="!isFormValid(errors)">
								Update
							</BaseButton>
						</div>
					</div>
				</Form>
			</div>
		</template>
	</BaseModal>
</template>
  
<script lang="ts">
import { mapStores } from 'pinia';
import { Form } from 'vee-validate';
import { Course, CourseStatus } from '../../../api/models/course.model';
import { useCoursesStore } from '../../../store/courses';
import BaseButton from '../../baseComponents/BaseButton.vue';
import BaseInput from '../../baseComponents/BaseInput.vue';
import BaseModal from '../../baseComponents/BaseModal.vue';

export default {
	props: {
		toggleModal: {
			type: Boolean,
			default: false,
		},
		id: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			courseToUpdate: new Course(),
			statuses: [CourseStatus.NOT_STARTED, CourseStatus.IN_PROGRESS, CourseStatus.FINISHED],
		};
	},
	computed: {
		...mapStores(useCoursesStore)
	},
	watch: {
		toggleModal() {
			(this.$refs.cdUpdateModal as typeof BaseModal).openModal();
		},
		id() {
			const course = this.coursesStore.getCourseById(this.id)
			if (course) {
				this.courseToUpdate = course
				this.courseToUpdate.date = this.makeDate(course.date)
				this.courseToUpdate.date_final_interview = this.makeDate(course.date_final_interview)
				this.courseToUpdate.date_project_demo = this.makeDate(course.date_project_demo)
				this.courseToUpdate.date_project_start = this.makeDate(course.date_project_start)
				this.courseToUpdate.status = course.status
			}
		}
	},
	mounted() {
		this.coursesStore.getCourses()
	},
	methods: {
		isFormValid(errors: Partial<Record<string, string | undefined>>) {
			return Object.keys(errors).length === 0;
		},
		clearInputs() {
			this.courseToUpdate = new Course()
		},
		makeDate(propsDate: string) {
			if (!propsDate)
				return "";
			// case dd/mm/yyyy -> yyyy-mm--dd
			const date = propsDate.split("/");
			if (date.length > 1)
				return `${date[2]}-${date[1]}-${date[0]}`;
			return propsDate;
		},
		submit() {
			const currentCourse = this.coursesStore.getCourseById(this.id);
			if (currentCourse) {
				this.coursesStore.updateCourse({
					id: currentCourse.id, course: {
						...currentCourse,
						date: this.courseToUpdate.date,
						date_final_interview: this.courseToUpdate.date_final_interview,
						date_project_demo: this.courseToUpdate.date_project_demo,
						date_project_start: this.courseToUpdate.date_project_start,
						status: this.courseToUpdate.status,
					}
				});
				this.coursesStore.getCourses();
				(this.$refs.cdUpdateModal as typeof BaseModal).closeModal();
			}
		},
		cancel() {
			(this.$refs.cdUpdateModal as typeof BaseModal).closeModal();
		},
	},
	components: { BaseModal, BaseButton, BaseInput, Form }
};
</script>