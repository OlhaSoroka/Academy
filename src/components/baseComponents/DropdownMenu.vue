<template> 
	<div class="dropdown__container" @click="onLinkClick" >
		<router-link :to="{ name: PROFILE }">
			<div class="dropdown__item">
				<span>Profile</span>
			</div>
		</router-link>
		<div class="dropdown__item" @click="logout"><span>Log out</span></div>
	</div>
</template>
<script lang="ts">
import { ROUTE_NAMES } from '../../models/router.model'
import { mapStores } from "pinia";
import { useUserStore } from '../../store/user';
export default {
	data() {
		return {
			PROFILE: ROUTE_NAMES.PROFILE,
		};
	},
	computed: {
		...mapStores(useUserStore),
	},
	methods: {
		async logout() {
			await this.userStore.logoutUser();
			this.$emit("linkClicked");
		},
		onLinkClick() {
			this.$emit("linkClicked");
		}
	},
}
</script>
<style lang="scss">
.dropdown__container {
	@apply w-[210px] h-24 border border-primary-700 bg-white
}

.dropdown__item {
	@apply h-1/2 flex p-3 hover:bg-primary-200 cursor-pointer
}
</style>

