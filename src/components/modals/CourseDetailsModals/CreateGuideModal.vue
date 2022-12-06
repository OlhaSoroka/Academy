<template>
	<BaseModal ref="newGuide" :header="'Add new guide'" @isClosed="clearInputs()">
		<template #body>
			<form>
				<div >
					<BaseInput v-model="link" type="Guide link" label="Guide link" rules="required" name="guide_link" />
					<div class="ml-1 block text-base font-semibold mt-1 mb-1">Guide role</div>
					<select v-model="role" class="guide__select mt-2">
						<option value="" disabled selected>Select role</option>
						<option v-for="option in guidesOptions" :key="option.value" :value="option.value">{{
								option.label
						}}
						</option>
					</select>
				</div>
				<div class="flex justify-between mt-5">
					<div class="mx-2">
						<BaseButton :disabled="isFormDisabled" :variant="'btn_blue_outlined'" @click="confirmAdding()">
							Add
						</BaseButton>
					</div>
					<div class="mx-2">
						<BaseButton :variant="'btn_red_outlined'" @click="cancelModal">
							Cancel
						</BaseButton>
					</div>
				</div>
			</form>
		</template>
	</BaseModal>
</template>
  
<script lang="ts">
import { mapStores } from "pinia";
import { useGuideStore } from "../../../store/guides";
import { defineComponent, PropType } from "vue";
import BaseModal from "../../baseComponents/BaseModal.vue";
import BaseButton from "../../baseComponents/BaseButton.vue";
import BaseInput from "../../baseComponents/BaseInput.vue";
import { uuidv4 } from "@firebase/util";
import { Form } from 'vee-validate'
import { Guide } from "../../../api/models/guide.model";
import { SelectItem } from "../../../models/options.model";
import { ROLES } from "../../../models/router.model";


export default defineComponent({
	props: {
		toggleModal: {
			type: Boolean,
			default: false,
		},
		guidesOptions: {
			type: Array as PropType<SelectItem[]>,
		},
	},
	data(): {
		role: string,
		link: string
	} {
		return {
			role: "",
			link: "",
		};
	},
	computed: {
		...mapStores(useGuideStore),
		currentRouteName() {
			return this.$route.params.id as string
		},
		isFormDisabled(): boolean {
			return !this.role || !this.link
		}
	},
	watch: {
		toggleModal() {
			(this.$refs.newGuide as typeof BaseModal).openModal();
		},
	},
	methods: {
		clearInputs() {
			this.role = "";
			this.link = "";
		},
		cancelModal() {
			(this.$refs.newGuide as typeof BaseModal).closeModal();
			this.clearInputs();
		},
		async confirmAdding() {
			const guide = new Guide(uuidv4(), this.role as ROLES);
			guide.name = "New guide";
			guide.link = this.link;
			this.guideStore.createGuide(guide);
			this.$emit('guideAdded');
			(this.$refs.newGuide as typeof BaseModal).closeModal();
			this.clearInputs();
		},
	},
	components: { BaseModal, BaseButton, BaseInput, Form }
});
</script>

<style lang="css" scoped>
.guide__select {
	@apply  p-1 w-full border-2 border-primary-600 rounded-sm text-base font-mono placeholder:text-slate-400 hover:bg-stone-50 focus:drop-shadow-xl focus:bg-stone-50 focus:border-primary-700 focus:outline-none focus:text-slate-900;
}
</style>
  