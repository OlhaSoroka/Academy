<template>
	<div class="dropdown__container" v-focus @focusout="closePopup" tabindex="1">
		<div class="dropdown__item" v-for="link in links" :key="link.name"
			@click="onLinkClick(link.name, link.isLogout)">
			<span>{{ link.label }}</span>
		</div>
	</div>
</template>
<script lang="ts">
import { ROUTE_NAMES } from '../../models/router.model'
import { mapStores } from "pinia";
import { useUserStore } from '../../store/user';
export default {
	data() {
		return {
			links: [
				{ label: 'Profile', name: ROUTE_NAMES.PROFILE, isLogout: false },
				{ label: 'Log Out', name: ROUTE_NAMES.LOGIN, isLogout: true }
			]
		};
	},
	computed: {
		...mapStores(useUserStore),
	},
	directives: {
		focus: {
			mounted: (el) => el.focus(),
		}
	},
	methods: {
		async onLinkClick(linkName: string, isLogout: boolean) {
			if (isLogout) {
				this.closePopup();
				await this.userStore.logoutUser();
			} else {
				this.closePopup();
				this.$router.push({ name: linkName })
			}
		},
		closePopup(): void {
			this.$emit("linkClicked");
		},
	},
}
</script>
<style lang="scss">
.dropdown__container {
	@apply w-[210px] border border-primary-700 bg-white focus-within:outline-none
}

.dropdown__item {
	@apply h-1/2 flex p-3 hover:bg-primary-200 cursor-pointer
}
</style>

