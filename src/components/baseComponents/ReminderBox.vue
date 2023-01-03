<template>
	<div class="flex-grow notification__container">
		<div class="">
			<div class="">
				<div>
					<div class="navigation__header">Reminders</div>
					<NotificationItem></NotificationItem>
					<NotificationItem></NotificationItem>
					<NotificationItem></NotificationItem>
					<NotificationItem></NotificationItem>
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
.notification__container {
	@apply border-2 border-stone-300 rounded-md m-8 ml-4 shadow-md bg-stone-50 p-10;
}
.navigation__header {
	@apply font-semibold text-lg text-primary-700 h-14 text-start;
}
</style>