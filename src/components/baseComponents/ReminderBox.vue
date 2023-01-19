<template>
	<div class="flex-grow reminders__container">
		<div class="">
			<div class="">
				<div>
					<div class="reminders__header"><span class="border border-solid border-primary-700 p-4 rounded-md ml-3 bg-primary-100">Reminders</span></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import NotificationItem from "../baseComponents/NotificationItem.vue"
export default {
	components: {
		NotificationItem
	}

}
</script>
<style lang="css" scoped>
/* .navigation__container {
	@apply  p-14;
} */
.reminders__container {
	@apply border-2 border-stone-300 rounded-md m-8 ml-4 shadow-md bg-stone-50 p-10;
}
.reminders__header {
	@apply font-semibold text-lg text-primary-700 h-14 text-start;
}
</style>