<template>
	<div class="courses__container" v-if="currentCourse">
		<h1 class="courses__header">Course Details</h1>
		<h3 v-if="courseId" class="courses__subheader">
			Details of {{ currentCourse.name }} course
		</h3>
		<nav class="courses__nav my-3">
			<router-link :to="{ name: COURSE_DASHBOARD }">
				<div>
					<BaseButton class="courses__nav__btn" variant="btn_blue">
						<ArrowUpIcon class="-rotate-90" />
					</BaseButton>
				</div>
			</router-link>
			<!-- <div>
				<button class="bg-red-500 text-white p-2" @click="scrollToWidget('commentWidget')">Comments</button>
			</div> -->
			<div class="nav__courses" v-if="userStore.isAdmin || userStore.isMentor">
				<div class="flex">
					<BaseButton class="nav__btn mr-3" @click="">
						<ArrowPrevIcon />
					</BaseButton>
					<BaseButton class="nav__btn" @click="">
						<ArrowNextIcon />
					</BaseButton>
				</div>
			</div>
		</nav>
		<Spinner v-if="courseDetailsStore.isCourseDetailsLoading" />
		<div v-else>
			<div>
				<MainInfoWidget :currentCourse="currentCourse"></MainInfoWidget>
			</div>
			<div class="mt-10">
				<GroupWidget :currentCourse="currentCourse" />
			</div>
			<div class="mt-10">
				<ResultsEntryWidget v-if="userStore.isAdmin" :courseId="courseId" />
			</div>
			<div class="mt-10">
				<ResultsExitWidget v-if="userStore.isAdmin" :courseId="courseId" />
			</div>
			<div class="mt-10">
				<LecturesWidget :currentCourse="currentCourse" />
			</div>
			<div class="mt-10">
				<MaterialWidget :currentCourse="currentCourse" />
			</div>
			<div id="commentWidget" class="mt-10">
				<CommentWidget v-if="userStore.isAdmin || userStore.isMentor" :currentCourse="currentCourse" />
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { ROUTE_NAMES } from '../models/router.model'
import { mapStores } from 'pinia';
import { Course } from '../api/models/course.model';
import BaseButton from '../components/baseComponents/BaseButton.vue';
import ArrowNextIcon from '../components/baseComponents/icons/ArrowNextIcon.vue';
import ArrowPrevIcon from '../components/baseComponents/icons/ArrowPrevIcon.vue';
import ArrowUpIcon from '../components/baseComponents/icons/ArrowUpIcon.vue';
import GroupWidget from '../components/widgets/GroupWidget.vue';
import MainInfoWidget from '../components/widgets/MainInfoWidget.vue';
import MaterialWidget from '../components/widgets/MaterialWidget.vue'
import { useCourseDetailsStore } from '../store/course-details.store';
import CommentWidget from '../components/widgets/CommentWidget.vue';
import LecturesWidget from '../components/widgets/LecturesWidget.vue';
import { useUserStore } from '../store/user';
import Spinner from '../components/baseComponents/spinner/Spinner.vue';
import ResultsEntryWidget from '../components/widgets/ResultsEntryWidget.vue';
import ResultsExitWidget from '../components/widgets/ResultsExitWidget.vue';

export default {
	data() {
		return {
			COURSE_DASHBOARD: ROUTE_NAMES.COURSE_DASHBOARD,
		};
	},
	computed: {
		...mapStores(useCourseDetailsStore, useUserStore),
		courseId(): string {
			return this.$route.params.id as string;
		},
		currentCourse(): Course {
			return this.courseDetailsStore.selectedCourse[0];
		}
	},
	methods: {
		scrollToWidget(widgetId: string): void {
			const widget = document.getElementById(widgetId);
			if (widget) {
				widget.scrollIntoView({
					behavior: "smooth",
					block: "center"
				})
			}
		}
	},
	components: { GroupWidget, BaseButton, MainInfoWidget, ArrowUpIcon, ArrowNextIcon, ArrowPrevIcon, MaterialWidget, CommentWidget, LecturesWidget, Spinner, ResultsEntryWidget, ResultsExitWidget }
}
</script>

<style lang="scss" scoped>
.courses__header {
	@apply font-semibold text-lg text-start text-primary-700;
}

.courses__subheader {
	@apply mt-2 font-normal text-stone-400 text-start;
}

.courses__container {
	@apply p-10 bg-primary-100 min-h-full;
}

.courses__nav {
	@apply flex justify-between px-0;
}

.courses__nav__btn {
	@apply flex justify-center items-center;
}
</style>
