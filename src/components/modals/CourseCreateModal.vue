<template>
	<BaseModal ref="courseCreateModal" :header="'Add new course'" @isClosed="clearInputs()">
		<template #body>
			<Form v-slot="{ errors }">
				<div class="w-72">
					<BaseInput v-model="courseToAdd.name" type="text" label="Course Name"
					placeholder="Enter course name" rules="required" />
					<div class="flex justify-evenly mt-5">
						<div class="mx-2">
							<BaseButton button-type="button" :disabled="!isFormValid(errors)" :variant="'btn_blue_outlined'"
								@click="submitCourseCreateButton">
								Create
							</BaseButton>
						</div>
						<div class="mx-2">
							<BaseButton button-type="reset" :disabled="false" :variant="'btn_red_outlined'" @click="cancelCourseCreateButton">
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
			return Object.keys(errors).length === 0 && this.courseToAdd.name;
		},
		clearInputs() {
			this.courseToAdd = new Course(uuidv4())
		},
		submitCourseCreateButton() {
			const { name } = this.courseToAdd;
			if (name) {
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
  
<style lang="scss" scoped>
.course__select {
	@apply p-1.5 w-full border-2 border-primary-600 rounded-sm text-base font-mono placeholder:text-slate-400 hover:bg-stone-50 focus:drop-shadow-xl focus:bg-stone-50 focus:border-primary-700 focus:outline-none focus:text-neutral-900;
}
</style>