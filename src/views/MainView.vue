<template>
	<div class="flex">
		<TheNavigationMenu :is-open="isOpen"></TheNavigationMenu>
		<div class="h-screen w-full overflow-auto">
			<TheTopbarComponent @onNavigationMenuToggle="toggleNavigationMenu" />
			<RouterView />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheNavigationMenu from "../components/TheNavigationMenu.vue";
import TheTopbarComponent from "../components/TheTopbarComponent.vue";
import DropdownMenu from "../components/baseComponents/DropdownMenu.vue";
import { ROUTE_NAMES } from '../models/router.model';

export default defineComponent({
	components: { TheNavigationMenu, TheTopbarComponent, DropdownMenu },
	data() {
		return {
			isOpen: true,
		}
	},
	methods: {
		toggleNavigationMenu() {
			this.isOpen = !this.isOpen;
		},
	},
});
</script>