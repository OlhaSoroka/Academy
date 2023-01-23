<template>
	<div class="flex-grow update__container ">
		<div class="" v-if="updateStore.updates">
			<div class="">
				<div class="min-h-[800px]">
					<div class="update__header">Updates</div>
					<Spinner v-if="updateStore.updatesLoading" />
					<div class="">
						<NotificationItem v-for="update in updateStore.updates" :key="update.id" :update="update">
						</NotificationItem>
					</div>
				</div>
				<div class="flex justify-center items-center">
					<BaseButton :class="{ update__btn_disabled: isPrevDisabled }" class="mr-5"
						@click="updateStore.fetchPrevPage()"><ArrowUpIcon class="-rotate-90"></ArrowUpIcon></BaseButton>
					<BaseButton :class="{ update__btn_disabled: isNextDisabled }" @click="updateStore.fetchNextPage()">
						<ArrowUpIcon class="rotate-90"></ArrowUpIcon></BaseButton>
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
import ArrowUpIcon from './icons/ArrowUpIcon.vue';
import Spinner from './spinner/Spinner.vue';
export default {
	components: {
    BaseButton,
    NotificationItem,
    ArrowUpIcon,
    Spinner
},
	computed: {
		...mapStores(useUpdateStore),
		isPrevDisabled(): boolean {
			return this.updateStore.firstUpdate?.id === this.updateStore.updates[0]?.id
		},
		isNextDisabled(): boolean {
			return this.updateStore.isLastPage
		}
	},
	beforeMount() {
		this.updateStore.fetchUpdates()
	},

}
</script>
<style lang="css" scoped>
.update__container {
	@apply border-2 border-stone-300 rounded-md shadow-md bg-stone-50 p-8 ;
}

.update__header {
	@apply font-semibold text-lg text-primary-700 text-start border border-solid border-primary-700 p-4 rounded-md bg-primary-100 w-28;
}
.update__btn_disabled {
  @apply opacity-50 pointer-events-none;
}

</style>