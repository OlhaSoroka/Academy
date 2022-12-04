<template>
	<div class="courses__container" v-if="currentCourse">
		<h1 class="courses__header" id="course-details-top">{{currentCourse.name}}</h1>
		<h3 v-if="courseId" class="courses__subheader">
			Course details of {{ currentCourse.name }}
		</h3>
		<nav class="courses__nav my-3">
			<router-link :to="{ name: COURSE_DASHBOARD }">
				<div>
					<BaseButton class="courses__nav__btn" variant="btn_blue">
						<ArrowUpIcon class="-rotate-90" />
					</BaseButton>
				</div>
			</router-link>
			<div class="nav__courses" v-if="userStore.isAdmin || userStore.isMentor">
				<CourseNavigator></CourseNavigator>
			</div>
		</nav>
		<div class="flex justify-center items-center pr-32 pl-32 ">
			<div>
				<BaseButton variant="btn_blue_outlined" class="mr-3" @click="scrollToWidget('mainInfoWidget')">Main Info
				</BaseButton>
			</div>
			<div>
				<BaseButton variant="btn_blue_outlined" class="mr-3" @click="scrollToWidget('groupWidget')">Group
				</BaseButton>
			</div>
			<div>
				<BaseButton variant="btn_blue_outlined" class="mr-3" @click="scrollToWidget('resultEntryWidget')">Entry
					Results</BaseButton>
			</div>
			<div>
				<BaseButton variant="btn_blue_outlined" class="mr-3" @click="scrollToWidget('resultExitWidget')">Exit
					Results</BaseButton>
			</div>
			<div>
				<BaseButton variant="btn_blue_outlined" class="mr-3" @click="scrollToWidget('lectureWidget')">Lectures
				</BaseButton>
			</div>
			<div>
				<BaseButton variant="btn_blue_outlined" class="mr-3" @click="scrollToWidget('materialWidget')">Materials
				</BaseButton>
			</div>
			<div>
				<BaseButton variant="btn_blue_outlined" class="mr-3" @click="scrollToWidget('documentWidget')">Documents
				</BaseButton>
			</div>
			<div>
				<BaseButton variant="btn_blue_outlined" class="mr-3" @click="scrollToWidget('commentWidget')">Comments
				</BaseButton>
			</div>
		</div>
		<Spinner v-if="courseDetailsStore.isCourseDetailsLoading" />
		<div v-else>
			<div id="mainInfoWidget" class="mt-10">
				<MainInfoWidget :currentCourse="currentCourse"></MainInfoWidget>
			</div>
			<div id="groupWidget" class="mt-10">
				<GroupWidget :currentCourse="currentCourse" />
			</div>
			<div id="resultEntryWidget" class="mt-10">
				<ResultsEntryWidget v-if="userStore.isAdmin" :courseId="courseId" />
			</div>
			<div id="resultExitWidget" class="mt-10">
				<ResultsExitWidget v-if="userStore.isAdmin" :courseId="courseId" />
			</div>
			<div id="lectureWidget" class="mt-10">
				<LecturesWidget :currentCourse="currentCourse" />
			</div>
			<div id="materialWidget" class="mt-10">
				<MaterialWidget :currentCourse="currentCourse" />
			</div>
			<div id="documentWidget" class="mt-10">
				<DocumentWidget v-if="userStore.isAdmin || userStore.isMentor" :currentCourse="currentCourse" />
			</div>
			<div id="commentWidget" class="mt-10">
				<CommentWidget v-if="userStore.isAdmin || userStore.isMentor" :currentCourse="currentCourse" />
			</div>
		</div>
		<button class="w-16 h-16 bg-primary-300 shadow font-bold text-white rounded-full p-2 fixed bottom-5 right-5 flex justify-center items-center" @click="scrollToTop()"><ArrowPrevIcon class="rotate-90 "/></button>
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
import DocumentWidget from '../components/widgets/DocumentWidget.vue';
import CourseNavigator from '../components/CourseNavigator.vue';
import FilterMenu from '../components/baseComponents/SearchMenu.vue';

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
		},
		scrollToTop(): void {
			const top = document.getElementById('course-details-top');
			if (top) {
				top.scrollIntoView({
					behavior: 'smooth',
					block: "end",
				})
			}
		}
	},
	components: { GroupWidget, BaseButton, MainInfoWidget, ArrowUpIcon, ArrowNextIcon, ArrowPrevIcon, MaterialWidget, CommentWidget, LecturesWidget, Spinner, ResultsEntryWidget, ResultsExitWidget, DocumentWidget, CourseNavigator, FilterMenu }
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
