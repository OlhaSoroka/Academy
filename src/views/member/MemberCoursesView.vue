<template>
	<AppTable
		:tableData="arr"
		:is-data-loading="isLoading"
		style="margin-top: 50px;"
	>
		<template v-slot:table-head>
			<AppTableRow
				:deleteable="false"
				:editable="false"
			>
				<td @click="sortTableData('fullName')">Full Name</td>
				<td @click="sortTableData('email')">Email</td>
				<td @click="sortTableData('initialScore')">initialScore</td>
				<td @click="sortTableData('role')">role</td>
				<td @click="sortTableData('course')">course</td>
			</AppTableRow>
		</template>

	</AppTable>
</template>

<script>
import AppTable from '../../components/UI/AppTable/AppTable.vue'
import AppTableRow from '../../components/UI/AppTable/AppTableRow.vue'
export default {
	components: {
		AppTable,
		AppTableRow
	},
	data() {
		return {
			arr: [],
			isLoading: false,
		}
	},
	methods: {
		sortTableData(prop) {
			this.arr = this.arr.sort((a, b) => {
				if (typeof a[prop] == 'number') {
					return a[prop] - b[prop]
				}
				return a[prop].localeCompare(b[prop])
			})
		}
	},
	mounted() {
		this.isLoading = true
		fetch('https://inventorsoft-vue-2022-users.herokuapp.com/firebase/get-all-users')
			.then(response => response.json())
			.then(data => this.arr = data)
			.finally(() => this.isLoading = false
			)
	}
};
</script>

<style>
</style>
