<template>
	<div class="flex-grow notification__container">
		<div class="">
			<div class="">
				<div class="">
					<div class="navigation__header">Updates</div>
					<!-- <div class="flex justify-center items-center ">
						<div>
							<BaseButton variant="btn_blue_outlined" class="mr-1 ">All</BaseButton>
						</div>
						<div>
							<BaseButton variant="btn_blue_outlined" class="mr-1">Main Info</BaseButton>
						</div>
						<div>
							<BaseButton variant="btn_blue_outlined" class="mr-1">Groups</BaseButton>
						</div>
						<div>
							<BaseButton variant="btn_blue_outlined" class="mr-1">Lectures</BaseButton>
						</div>
						<div>
							<BaseButton variant="btn_blue_outlined" class="mr-1">Documents</BaseButton>
						</div>
						<div>
							<BaseButton variant="btn_blue_outlined" class="mr-1">Materials</BaseButton>
						</div>
						<div>
							<BaseButton variant="btn_blue_outlined" class="mr-1">Comments</BaseButton>
						</div>
					</div> -->
					<div>
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

		</div>
	</div>
</template>
<script lang="ts">
import BaseButton from './BaseButton.vue';
import NotificationItem from './NotificationItem.vue'
export default {
	components: {
		BaseButton,
		NotificationItem
	}

}
</script>
<style lang="css" scoped>
.notification__container {
	@apply border-2 border-stone-300 rounded-md m-8 mr-4 shadow-md bg-stone-50 p-10; 
}

.navigation__header {
	@apply font-semibold text-lg text-primary-700 h-14 text-start;
}
.navigation__header {
	@apply font-semibold text-lg text-primary-700 h-14 text-start;
}
</style>