<template>
	<div class="search-menu border-primary-700 bg-white w-[210px] border p-3 absolute top-4 left-5 z-50" tabindex="1">
		<div class="search-menu">Search:</div>
		<input v-focus type="text" v-model="searchValue" @focusout="onFocusOut"
			class="search-menu border border-slate-300 w-full rounded-md mt-3 text-neutral-900 font-normal focus-within:outline-none">
		<div class="search-menu flex justify-center items-center mt-2">
			<BaseButton :variant="'btn_blue_outlined'" class="search-menu h-1 mr-2" @click="applySearch()">Apply
			</BaseButton>
			<BaseButton :variant="'btn_red_outlined'" class="search-menu h-1" @click="resetSearch()">Reset</BaseButton>
		</div>
	</div>
</template>
<script lang="ts">
import { PropType } from 'vue';
import BaseButton from './BaseButton.vue';
export default {
	components: {
		BaseButton
	},
	props: {
		searchedValue: {
			type: String as PropType<string | null>
		},
	},
	watch: {
		searchedValue(next): void {
			if (next === null) {
				this.searchValue = next
			}
		}
	},
	data(): {
		searchValue: string | null
	} {
		return {
			searchValue: "",
		}
	},
	directives: {
		focus: {
			updated: (el) => {
				setTimeout(() => {
					el.focus()
				}, 0)
			}
		}
	},
	methods: {
		applySearch() {	
			this.$emit("applySearch", this.searchValue);
		},
		resetSearch() {
			this.$emit("resetSearch", this.searchValue)
		},
		onFocusOut(event: any): void {
			if (!event.relatedTarget || !(event.relatedTarget as HTMLElement)?.classList?.contains('search-menu')) {
				this.resetSearch();
			}
		}
	},
}
</script>