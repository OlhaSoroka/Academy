<template> 
	<div class="w-full overflow-x-auto  shadow-lg bg-stone-50 border-primary-100 border-2 rounded-md p-14">
		<div class="flex justify-between">
			<div class="text-xl text-gray-700 mb-5">
				Group
			</div>
		</div>
		<div>
			<BaseTableEditable :column-defs="columnDefs" :row-data="rowData"
				:uniq-identifier="uniqIdentifier" @cellValueChanged="onCellEdit($event)"
				@headerNameChanged="onHeaderEdit($event)" />
		</div>
	</div>
</template>
  
<script lang="ts">
import { ROLES } from "../../models/router.model";
import BaseTableEditable from "../baseComponents/BaseTableEditable.vue";
import { mapStores } from 'pinia';
import { useUserStore } from '../../store/user';
import { getStudentsByCourse } from "../../api/user";
import { PropType } from "vue";
import { Course } from "../../api/models/course.model";
export default {
	components: {
		BaseTableEditable
	},
	props: {
		currentCourse:{
			type: Object as PropType<Course>
		}
	},
	data(): {
		columnDefs: any,
		rowData: any,
		uniqIdentifier: any,
	} {
		return {
			columnDefs: [],
			rowData: [],
			uniqIdentifier: 'id',
		};
	},
	computed: {
		...mapStores(useUserStore),
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
	async mounted() {
		const students = await getStudentsByCourse(this.currentCourse!.id);
		this.rowData = students;
	},
	methods: {
		async onCellEdit(event: any) {
			// const updatedMember = this.group.find((item) => item[this.uniqIdentifier] === event.uniqIdentifier);
			// const updateIndex = this.group.findIndex((item) => item[this.uniqIdentifier] === event.uniqIdentifier);
			// updatedMember[event.colDef.field] = event.newValue;
			// this.group.splice(updateIndex, 1, updatedMember);
			// this.rowData = this.group;
			// await updateCourseById(this.course.id, {...this.course, group: this.group});
		},
		async onHeaderEdit(event: any) {
			// // Handle header edit logic here
			// // Remove after demo:
			// this.columnDefs = this.columnDefs.map(column => { 
			//     if (column.field === event.field) {
			//       column.headerName = event.newHeaderName;
			//       return column
			//     }
			//     return column
			//   })
		}

	}
};
</script>
  
<style lang="scss">

</style>
  