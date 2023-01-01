<template>
	<div class="m-28">
		<div class="navigation__container">
			<div class="navigation__header">Notifications</div>
			<div>
				<div class="flex justify-center items-center pr-32 pl-32 ">
					<div>
						<BaseButton variant="btn_blue_outlined" class="mr-3">All</BaseButton>
					</div>
					<div>
						<BaseButton variant="btn_blue_outlined" class="mr-3">Main Info</BaseButton>
					</div>
					<div>
						<BaseButton variant="btn_blue_outlined" class="mr-3">Groups</BaseButton>
					</div>
					<div>
						<BaseButton variant="btn_blue_outlined" class="mr-3">Lectures</BaseButton>
					</div>
					<div>
						<BaseButton variant="btn_blue_outlined" class="mr-3">Documents</BaseButton>
					</div>
					<div>
						<BaseButton variant="btn_blue_outlined" class="mr-3">Materials</BaseButton>
					</div>
					<div>
						<BaseButton variant="btn_blue_outlined" class="mr-3">Comments</BaseButton>
					</div>
				</div>
				<div>TODAY</div>
				<NotificationItem></NotificationItem>
				<NotificationItem></NotificationItem>
				<NotificationItem></NotificationItem>
				<NotificationItem></NotificationItem>
				<div>YESTERDAY</div>
				<NotificationItem></NotificationItem>
				<NotificationItem></NotificationItem>
				<NotificationItem></NotificationItem>
				<NotificationItem></NotificationItem>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import BaseButton from './BaseButton.vue';
import NotificationItem from '../../components/baseComponents/NotificationItem.vue'
export default {
components: {
	BaseButton,
	NotificationItem
}

}
</script>
<style lang="css" scoped>
.navigation__container {
	@apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full;
}

.navigation__header {
	@apply font-semibold text-lg text-start text-primary-700;
}
</style>