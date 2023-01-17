<template>
	<div class="flex-grow notification__container">
		<div class="" v-if="updateStore.updates">
			<div class="">
				<div class="">
					<div class="navigation__header">Updates</div>
					<div>
						<NotificationItem v-for="update in updateStore.updates" :key="update.id" :update="update">
						</NotificationItem>
					</div>
				</div>
				<div class="flex justify-center items-center">
					<button v-if="isNextDisabled"
						@click="updateStore.fetchPrevPage()" class="bg-red-500 text-white">Prev</button>
					<button v-if="!isPrevDisabled" @click="updateStore.fetchNextPage()"
						class="bg-blue-500 text-white">Next</button>
				</div>
			</div>

		</div>
	</div>
</template>
<script lang="ts">
import { useUpdateStore } from '../../store/update';
import BaseButton from './BaseButton.vue';
import NotificationItem from './NotificationItem.vue';
import { mapStores } from 'pinia'
export default {
	components: {
		BaseButton,
		NotificationItem
	},
	computed: {
		...mapStores(useUpdateStore),
		isNextDisabled(): boolean {
			return this.updateStore.firstUpdate?.id !== this.updateStore.updates[0]?.id
		},
		isPrevDisabled(): boolean {
			return this.updateStore.isLastPage
		}
	},
	beforeMount() {
		this.updateStore.fetchUpdates()
	},

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