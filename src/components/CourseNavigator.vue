<template>
	<div>
		<select class="select__container" @change="onSelectCourse">
			<option disabled selected>Other courses</option>
			<option v-for="course in courses" :value="course.id" :key="course.id" >{{ course.name }}</option>
		</select>
	</div>
</template>

<script lang="ts">
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import { getCourseById } from '../api/course';
import { Course } from '../api/models/course.model';
import { ROUTE_NAMES } from '../models/router.model';
import { useCourseDetailsStore } from '../store/course-details.store';
import { useCoursesStore } from '../store/courses';

export default defineComponent({
	name: "CourseNavigator",
	beforeMount(): void {
		this.coursesStore.fetchCourses()
	},
	computed: {
		...mapStores(useCoursesStore, useCourseDetailsStore),
		courses(): Course[] {
			return this.coursesStore.courses
		},
		currentCourse(): Course {
			return this.courseDetailsStore.selectedCourse[0];
		}
	},
	methods: {
		async onSelectCourse(event: Event) {
			const selectedCourseId: string = (event.target as HTMLSelectElement).value;
			const course = await getCourseById(selectedCourseId);
			this.courseDetailsStore.setCourseDetails(course);
			this.$router.replace({ name: ROUTE_NAMES.COURSE_DETAILS, params: { id: selectedCourseId } })
		}
	}

})
</script>

<style lang="scss">
.select__container {
	@apply h-10 border-[2px] border-primary-500 rounded font-bold text-primary-500 p-1 outline-none;
}
.select__container :focus { outline: none; }

</style>

