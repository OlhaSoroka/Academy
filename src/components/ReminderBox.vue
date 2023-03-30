<template>
	<div class="reminders__container">
		<div>
			<div>
				<span class="reminders__header">Reminders</span>
				<Spinner v-if="remindersStore.isLoading" />
				<div v-if="!remindersStore.shouldShowNavMenuReminder" class="flex justify-center items-center text-start border border-solid border-stone-300 p-5 rounded-md mt-10">There is no reminders for today</div>
				<div v-else class="mt-8">
					<ReminderNotificationItem v-if="remindersStore.isDemoToday"
						innerText="Project demo is scheduled for today"></ReminderNotificationItem>
					<ReminderNotificationItem v-if="remindersStore.isFinalInterviewToday"
						innerText="Final interview is scheduled for today"></ReminderNotificationItem>
					<ReminderNotificationItem v-if="remindersStore.isProjectStartToday"
						innerText="Academy project start is scheduled for today"></ReminderNotificationItem>
					<ReminderNotificationItem v-for="lecture in remindersStore.todaysLectures" :key="lecture.id"
						:innerText="`${lecture.name} lecture is scheduled for today at ${lecture.timeOfLecture}`">
					</ReminderNotificationItem>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { mapStores } from "pinia";
import { defineComponent } from "vue";
import { useRemindersStore } from "../store/reminders";
import ReminderNotificationItem from "./ReminderNotificationItem.vue"
import Spinner from "./Spinner.vue"
export default defineComponent({
	components: {
		ReminderNotificationItem,
		Spinner
	},
	computed: {
		...mapStores(useRemindersStore)
	},
	beforeMount() {
		this.remindersStore.calculateCourseEventsDates();
		this.remindersStore.calculateLecturesStartTime();
	}
});
</script>
<style lang="css" scoped>
.reminders__container {
	@apply border-2 border-stone-300 rounded-md ml-4 shadow-md bg-stone-50 p-8 w-1/2;
}

.reminders__header {
	@apply font-semibold text-lg text-primary-700 text-start border border-solid border-primary-700 p-2 rounded-md bg-primary-100;
}
</style>