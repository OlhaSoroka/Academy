<template>
	<BaseModal ref="courseCreateModal" :header="'Add new course'" @isClosed="clearInputs()">
		<template #body>
			<Form v-slot="{ errors }">
				<div class="w-72">
					<BaseInput v-model="courseToAdd.name" type="text" label="Course Name"
					placeholder="Enter course name" rules="required" />
					<BaseInput v-model="courseToAdd.date" type="date" label="Date of starting" rules="required" />
					<BaseInput v-model="courseToAdd.date_project_start" type="date" label="Date of starting project" />
					<BaseInput v-model="courseToAdd.date_project_demo" type="date" label="Date of demo" />
					<BaseInput v-model="courseToAdd.date_final_interview" type="date" label="Date of final interview" />
					<div class="w-full text-left ml-1">
						<label for="status">Status</label>
					</div>
					<select id="status" v-model="courseToAdd.status"
						class="block p-1 m-1 w-full ml-1 border-2 border-primary-700 rounded-md text-base font-mono placeholder:text-slate-400 hover:bg-stone-50 focus:drop-shadow-xl focus:bg-stone-50 focus:border-primary-700 focus:outline-none focus:text-cyan-900">
						<option v-for="status in statuses" :key="status" :value="status">
							{{ status }}
						</option>
					</select>
					<div class="flex justify-evenly mt-5">
						<div class="mx-2">
							<BaseButton button-type="reset" :disabled="false" variant="btn_red" @click="cancelCourseCreateButton">
								Cancel
							</BaseButton>
						</div>
						<div class="mx-2">
							<BaseButton button-type="button" :disabled="!isFormValid(errors)"
								@click="submitCourseCreateButton">
								Create
							</BaseButton>
						</div>
					</div>
				</div>
			</Form>

		</template>
	</BaseModal>
</template>
  
<script lang="ts">
import { mapStores } from "pinia";
import { useCoursesStore } from "../../store/courses";
import { defineComponent } from 'vue';
import BaseButton from "../baseComponents/BaseButton.vue";
import BaseInput from "../baseComponents/BaseInput.vue";
import BaseModal from "../baseComponents/BaseModal.vue";
import { Course, CourseStatus } from "../../api/models/course.model";
import { Form } from "vee-validate";
import { uuidv4 } from "@firebase/util";

export default defineComponent({
	name: "CourseCreateModal",
	components: { BaseButton, BaseInput, BaseModal, Form },
	props: {
		toggleModal: {
			required: true,
			type: Boolean,
		},
	},
	data(): { courseToAdd: Course, statuses: CourseStatus[] } {
		return {
			courseToAdd: new Course(uuidv4()),
			statuses: [CourseStatus.NOT_STARTED, CourseStatus.IN_PROGRESS, CourseStatus.FINISHED],
		};
	},
	computed: {
		...mapStores(useCoursesStore)
	},
	watch: {
		toggleModal() {
			(this.$refs.courseCreateModal as typeof BaseModal).openModal();
		},
	},
	methods: {
		isFormValid(errors: Partial<Record<string, string | undefined>>) {
			return Object.keys(errors).length === 0 && this.courseToAdd.name && this.courseToAdd.date;
		},
		clearInputs() {
			this.courseToAdd = new Course(uuidv4())
		},
		submitCourseCreateButton() {
			const { name, date } = this.courseToAdd;
			if (name && date) {
				this.coursesStore.createNewCourse(this.courseToAdd);
				(this.$refs.courseCreateModal as typeof BaseModal).closeModal();
			}
		},
		cancelCourseCreateButton() {
			(this.$refs.courseCreateModal as typeof BaseModal).closeModal();
			this.clearInputs();
		},
	},
});
</script>