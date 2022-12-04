<template>
	<div class=" border-primary-700 bg-white w-[210px] border p-3 absolute top-4 left-5 z-50">
		<div class="">Search:</div>
		<input type="text" v-model="searchValue"
			class="focus-within:outline-none border border-slate-300 rounded-md mt-3 text-neutral-900 font-normal">
		<div class="flex justify-center items-center mt-2">
			<BaseButton :variant="'btn_blue_outlined'" class="h-1 mr-2" @click="applySearch()">Apply</BaseButton>
			<BaseButton :variant="'btn_red_outlined'" class="h-1" @click="resetSearch()">Reset</BaseButton>
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
	methods: {
		applySearch() {
			this.$emit("applySearch", this.searchValue);
		},
		resetSearch() {
			this.$emit("resetSearch")
		}
	}
}
</script>