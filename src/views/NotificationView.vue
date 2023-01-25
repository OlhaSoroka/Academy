<template>
	<div class="p-10 bg-primary-100 min-h-full">
		<div class="font-semibold text-lg text-start text-primary-700 mb-5">Notifications</div>
		<div v-if="userStore.isAdmin||userStore.isMentor" class="flex justify-center items-center">
			<UpdateBox></UpdateBox>
		</div>
		<div v-else class="flex">
			<UpdateBox ></UpdateBox>
			<ReminderBox v-if="userStore.isStudent"></ReminderBox>
		</div>
	</div>
</template>
<script lang="ts">
import UpdateBox from "../components/baseComponents/UpdateBox.vue";
import ReminderBox from "../components/baseComponents/ReminderBox.vue";
import { mapStores } from "pinia";
import { useUserStore } from "../store/user";

export default {
	components: {
		UpdateBox,
		ReminderBox
	},
	computed: {
		...mapStores(useUserStore)
	}
}

</script>

<style lang="css" scoped>
.notification_admin {
	@apply justify-center 
}


</style>