<template>
	<div class="group__container ">
		<div class="group__header">
			Group
		</div>
		<div>
			<BaseTableEditable :column-defs="columnDefs" :row-data="courseDetailsStore.group"
				:uniq-identifier="uniqIdentifier" @cellValueChanged="onCellEdit($event)" />
		</div>
	</div>
</template>
  
<script lang="ts">
import { ROLES } from "../../models/router.model";
import BaseTableEditable from "../baseComponents/BaseTableEditable.vue";
import { mapStores } from 'pinia';
import { useUserStore } from '../../store/user';
import { updateUserByID } from "../../api/user";
import { PropType } from "vue";
import { Course } from "../../api/models/course.model";
import { AppUser } from "../../api/models/user.model";
import { useCourseDetailsStore } from "../../store/course-details.store";
import { getCourseById } from "../../api/course";
export default {
	components: {
		BaseTableEditable
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
		isAdmin() {
			if (this.userStore.user) {
				return this.userStore.user.role === ROLES.ADMIN_ROLE
			}
		},
		isMentor() {
			if (this.userStore.user) {
				return this.userStore.user.role === ROLES.MENTOR_ROLE
			}
		},
		isStudent() {
			if (this.userStore.user) {
				return this.userStore.user.role === ROLES.STUDENTS_ROLE
			}
		}
	},
	beforeMount() {
		if (this.isStudent) {
			this.columnDefs = [
				{ field: "fullName", headerName: "Name", sortable: true, editable: this.isAdmin, width: 200 },
				{ field: "email", headerName: "Email", sortable: true, editable: false, minWidth: 150, width: 20 }
			]
		}
		if (this.isAdmin || this.isMentor) {
			this.columnDefs = [
				{ field: "fullName", headerName: "Name", headerEditable: false, sortable: true, editable: this.isAdmin, width: 200 },
				{ field: "email", headerName: "Email", headerEditable: false, sortable: true, editable: false, width: 250 },
				{ field: "phone", headerName: "Phone", headerEditable: false, sortable: false, editable: this.isAdmin, width: 200 },
				{ field: "city", headerName: "City", headerEditable: false, sortable: true, editable: this.isAdmin, width: 200 },
				{ field: "age", headerName: "Age", headerEditable: false, sortable: true, editable: this.isAdmin, width: 100 },
				{ field: "education", headerName: "Education", headerEditable: false, sortable: false, editable: this.isAdmin, width: 250 },
				{ field: "eng_level", headerName: "English level", headerEditable: false, sortable: true, editable: this.isAdmin, width: 250 },
			]
		}
	},
	methods: {
		async onCellEdit(event: { uniqIdentifier: string, data: AppUser }) {
			await updateUserByID(event.uniqIdentifier, event.data);
			this.courseDetailsStore.updatedGroupOrResult();
		},
	}
};
</script>
  
<style lang="postcss" scoped>
.group__container {
	@apply w-full overflow-x-auto shadow-lg bg-stone-50 border-primary-100 border-2 rounded-md p-14
}

.group__header {
	@apply text-xl text-gray-700 mb-5
}
</style>
  