<template>
	<AppTable
		:tableData="tableData"
		:is-data-loading="isLoading"
		:header-data="headingData"
		@onDelete="deleteRow"
		@onEdit="editRow"
		:delete-btns="true"
		:edit-btns="true"
		:logo="true"
	/>
</template>

<script>
import AppTable from '../../components/UI/AppTable/AppTable.vue'
export default {
	components: {
		AppTable,
	},
	data() {
		return {
			tableData: [],
			isLoading: false,
			headingData: [
				{ "fullName": "Полное имя" },
				{ "role": "Роль" },
				{ "email": "E-mail" },
				{ "initialScore": "Какой-то номер" },
				{ "course": "Курс" },
			],
		}
	},
	methods: {
		deleteRow(id) {
			this.tableData = this.tableData.filter(el => el.id !== id)
		},
		editRow(id) {
			console.log(id);
		},
	},
	mounted() {
		this.isLoading = true
		fetch('https://inventorsoft-vue-2022-users.herokuapp.com/firebase/get-all-users')
			.then(response => response.json())
			.then(data => this.tableData = data)
			.finally(() => this.isLoading = false
			)
	}
};
</script>

<style>
</style>
