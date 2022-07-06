<template>
	<AppTable
		:tableData="tableData"
		:is-data-loading="isLoading"
		:header-data="headingData"
		:delete-btns="true"
		:edit-btns="true"
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
				{ "course": "Курс" },
				{ "role": "Роль" },
				{ "initialScore": "хз че-это" },
				{ "fullName": "Полное имя" },
				{ "email": "E-mail" }
			],
		}
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
