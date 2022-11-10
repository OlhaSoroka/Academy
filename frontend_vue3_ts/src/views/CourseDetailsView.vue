<template>
	<div class="courses__container">
		<h1 class="courses__header">Course Details</h1>
		<h3 v-if="courseId" class="courses__subheader">
			Details of {{ currentCourse.name }} course
		</h3>
		<nav class="courses__nav my-3">
			<BaseButton class="courses__nav__btn" variant="btn_blue" @click="">
				<BaseArrowUp class="-rotate-90" />
			</BaseButton>
		</nav>
		
		<div><MainInfo :currentCourse="currentCourse"></MainInfo></div>
		<div class="mt-10"><GroupWidget :currentCourse="currentCourse" /></div>
		<div class="mt-10"><ResultsWidget :courseId="courseId" /></div>

	</div>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { Course } from '../api/models/course.model';
import BaseButton from '../components/baseComponents/BaseButton.vue';
import BaseArrowUp from '../components/baseComponents/BaseIcons/BaseArrowUp.vue';
import GroupWidget from '../components/widgets/GroupWidget.vue';
import MainInfo from '../components/widgets/MainInfo.vue';
import ResultsWidget from '../components/widgets/ResultsWidget.vue';
import { useCoursesStore } from '../store/courses';

export default {
	computed: {
		...mapStores(useCoursesStore),
		courseId(): string {
			return this.$route.params.id as string;
		},
		currentCourse(): Course {
			return this.coursesStore.getCourseById(this.courseId)!
		}
	},
	components: { GroupWidget, ResultsWidget, BaseButton, MainInfo, BaseArrowUp }
}
</script>

<style lang="postcss" scoped>


.courses__header {
	@apply font-semibold text-lg text-start text-primary-700;
}

.courses__subheader {
	@apply mt-2 font-normal text-stone-400 text-start;
}

.courses__container {
	@apply p-10;
}

.courses__nav {
	@apply flex justify-between px-0;
}

.courses__nav__btn {
	@apply w-fit mx-1 my-2;
}



</style>
