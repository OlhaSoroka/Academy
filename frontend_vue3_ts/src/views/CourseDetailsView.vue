<template>
	<div class="courses__container" v-if="currentCourse">
		<h1 class="courses__header">Course Details</h1>
		<h3 v-if="courseId" class="courses__subheader">
			Details of {{ currentCourse.name }} course
		</h3>
		<nav class="courses__nav my-3">
			<div>
				<BaseButton class="courses__nav__btn" variant="btn_blue" @click="">
					<BaseArrowUp class="-rotate-90" />
				</BaseButton>
			</div>

			<div class="nav__courses">
				<div class="flex">
					<BaseButton class="nav__btn mr-3" @click="">
						<BaseArrowPrev />
					</BaseButton>
					<BaseButton class="nav__btn" @click="">
						<BaseArrowNext />
					</BaseButton>
				</div>
			</div>
		</nav>

		<div>
			<MainInfo :currentCourse="currentCourse"></MainInfo>
		</div>
		<div class="mt-10">
			<GroupWidget :currentCourse="currentCourse" />
		</div>
		<div class="mt-10">
			<ResultsWidget :courseId="courseId" />
		</div>
		<div class="mt-10">
			<MaterialWidget :currentCourse="currentCourse" />
		</div>

	</div>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { Course } from '../api/models/course.model';
import BaseButton from '../components/baseComponents/BaseButton.vue';
import BaseArrowNext from '../components/baseComponents/BaseIcons/BaseArrowNext.vue';
import BaseArrowPrev from '../components/baseComponents/BaseIcons/BaseArrowPrev.vue';
import BaseArrowUp from '../components/baseComponents/BaseIcons/BaseArrowUp.vue';
import GroupWidget from '../components/widgets/GroupWidget.vue';
import MainInfo from '../components/widgets/MainInfo.vue';
import ResultsWidget from '../components/widgets/ResultsWidget.vue';
import MaterialWidget from '../components/widgets/MaterialWidget.vue'
import { useCourseDetailsStore } from '../store/course-details.store';

export default {
	computed: {
		...mapStores(useCourseDetailsStore),
		courseId(): string {
			return this.$route.params.id as string;
		},
		currentCourse(): Course {
			return this.courseDetailsStore.selectedCourse[0];
		}
	},
	components: { GroupWidget, ResultsWidget, BaseButton, MainInfo, BaseArrowUp, BaseArrowNext, BaseArrowPrev, MaterialWidget }
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
	@apply p-10 bg-primary-100;
}

.courses__nav {
	@apply flex justify-between px-0;
}

.courses__nav__btn {
	@apply w-fit mx-1 my-2;
}
</style>
