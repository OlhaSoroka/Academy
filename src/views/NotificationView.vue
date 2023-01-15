<template>
	<div class="p-10 bg-primary-100 min-h-full">
		<div class="font-semibold text-lg text-start text-primary-700">Notifications</div>
		<div class="flex">
			<UpdateBox></UpdateBox>
			<ReminderBox></ReminderBox>
		</div>
	</div>

</template>
<script lang="ts">
import UpdateBox from "../components/baseComponents/UpdateBox.vue";
import ReminderBox from "../components/baseComponents/ReminderBox.vue";

export default {
	components: {
		UpdateBox,
		ReminderBox
	}
}

</script>