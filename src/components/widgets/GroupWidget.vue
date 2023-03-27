<template>
	<div class="group__container ">
		<div class="flex items-center">
			<h2 class="group__header mr-3">Group</h2>
			<Spinner v-if="courseDetailsStore.groupWidgetLoading" />
		</div>
		<div>
			<BaseTableEditable :column-defs="columnDefs" :row-data="courseDetailsStore.group" class="mt-5 min-h-[200px]"
				:uniq-identifier="uniqIdentifier" @cellValueChanged="onCellEdit($event)" />
		</div>
	</div>
</template>
  
<script lang="ts">
import BaseTableEditable from "../baseComponents/BaseTableEditable.vue";
import { mapStores } from 'pinia';
import { useUserStore } from '../../store/user';
import { updateUserByID } from "../../api/user";
import { defineComponent, PropType } from "vue";
import { Course } from "../../api/models/course.model";
import { AppUser } from "../../api/models/user.model";
import { useCourseDetailsStore } from "../../store/course-details.store";
import { EnglishLevel } from "../../models/english-level.enum";
import Spinner from "../Spinner.vue";
export default defineComponent({
	components: {
		BaseTableEditable,
		Spinner
	},
	props: {
		currentCourse: {
			type: Object as PropType<Course>
		}
	},
	data(): {
		columnDefs: any,
		uniqIdentifier: any,
	} {
		return {
			columnDefs: [],
			uniqIdentifier: 'id',
		};
	},
	computed: {
		...mapStores(useUserStore, useCourseDetailsStore),
	},
	beforeMount() {
		if (this.userStore.isAdmin || this.userStore.isMentor) {
			this.columnDefs = [
				{ field: "avatarUrl", headerName: "", width: 80, centered: true, image: true },
				{ field: "fullName", headerName: "Name", headerEditable: false, sortable: false, editable: this.userStore.isAdmin, filter: true, width: 300 },
				{ field: "email", headerName: "Email", headerEditable: false, sortable: false, editable: false, filter: true, width: 250 },
				{ field: "phone", headerName: "Phone", headerEditable: false, sortable: false, editable: this.userStore.isAdmin, filter: false, width: 200 },
				{ field: "city", headerName: "City", headerEditable: false, sortable: true, editable: this.userStore.isAdmin, filter: true, width: 200 },
				{ field: "age", headerName: "Age", headerEditable: false, sortable: true, editable: this.userStore.isAdmin,centered:true, width: 100 },
				{ field: "education", headerName: "Education", headerEditable: false, sortable: false, editable: this.userStore.isAdmin, filter: true, width: 250 },
				{
					field: "eng_level", headerName: "English level", headerEditable: false, sortable: true, editable: this.userStore.isAdmin, filter: true, width: 250, dropdown: true,
					options: [
						{ label: EnglishLevel.BEGINNER_ELEMENTARY, value: EnglishLevel.BEGINNER_ELEMENTARY },
						{ label: EnglishLevel.PRE_INTERMEDIATE, value: EnglishLevel.PRE_INTERMEDIATE },
						{ label: EnglishLevel.INTERMEDIATE, value: EnglishLevel.INTERMEDIATE },
						{ label: EnglishLevel.UPPER_INTERMEDIATE, value: EnglishLevel.UPPER_INTERMEDIATE },
						{ label: EnglishLevel.ADVANCED, value: EnglishLevel.ADVANCED },
						{ label: EnglishLevel.PROFICIENT, value: EnglishLevel.PROFICIENT },
					]
				},
				{ field: "cv_link", headerName: "CV link", headerEditable: false, sortable: false, editable: this.userStore.isAdmin, link: true, filter: false, width: 250 },

			]
		}
	},
	methods: {
		async onCellEdit(event: { uniqIdentifier: string, data: AppUser }) {
			await updateUserByID(event.uniqIdentifier, event.data);
			this.courseDetailsStore.updatedGroupOrResult();
		},
	}
});
</script>
  
<style lang="scss" scoped>
.group__container {
	@apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full;
}

.group__header {
	@apply text-xl text-gray-700;
}
</style>
  