<template>
	<div>
		<!-- template how to use the table -->
		<BaseTable
			:table-data="items"
			:edit-btns="true"
			:is-data-loading="false"
			:delete-btns="true"
			:header-data="[
				{ 'email': 'Email' },
				{ 'fullName': 'Имя' },
				{ 'role': 'роль' }
			]"
		/>
		<button @click="getusers">getusers</button>
	</div>
</template>

<script>
import BaseTable from '../../components/UI/BaseTable/BaseTable.vue'
export default {
	components: {
		BaseTable
	},
	omponents: {
		BaseTable
	},
	data() {
		return {
			items: []
		}
	},
	methods: {
		getusers() {
			fetch('https://inventorsoft-vue-2022-users.herokuapp.com/firebase/get-all-users')
				.then(response => response.json())
				.then(data => this.items = data)
		}
	},
};
</script>

<style>
</style>
