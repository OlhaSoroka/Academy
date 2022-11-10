<template>
	<BaseModal ref="newMaterial" :header="'Add new material'" @isClosed="clearInputs()">
		<template #body>
			<Form @submit.prevent="confirmAdding(currentRouteName)">
				<div class="flex justify-center flex-col mt-7 gap-10">
					<div class="mx-1">
						<BaseInput v-model="name" label="Material Name" rules="required" name="material_name" />
						<BaseInput v-model="link" type="Link" label="Material Link" rules="required"
							name="material_link" />
					</div>
					<div class="mx-1 flex justify-around">
						<BaseButton variant="btn_red" @click="cancelModal" buttonType="reset">
							Cancelі
						</BaseButton>
						<BaseButton :disabled="!(name.length && link.length)" buttonType="submit">
							Add
						</BaseButton>
					</div>
				</div>
			</Form>

		</template>
	</BaseModal>
</template>
  
<script lang="ts">
import { mapStores } from "pinia";
import { useUserStore } from "../../../store/user";
import { useCoursesStore } from "../../../store/courses";
import { defineComponent } from "vue";
import BaseModal from "../../baseComponents/BaseModal.vue";
import BaseButton from "../../baseComponents/BaseButton.vue";
import BaseInput from "../../baseComponents/BaseInput.vue";
import { createMaterial } from "../../../api/materials";
import { Material } from "../../../api/models/material.model";
import { uuidv4 } from "@firebase/util";
import { Form } from 'vee-validate'


export default defineComponent({
	props: {
		toggleModal: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			name: "",
			link: "",
		};
	},
	computed: {
		...mapStores(useUserStore, useCoursesStore),
		currentRouteName() {
			const fullPath = this.$router.currentRoute.value.path;
			const pathArray = fullPath.split("/");
			const id = pathArray[pathArray.length - 1];
			return id;
		},
	},
	watch: {
		toggleModal() {
			(this.$refs.newMaterial as typeof BaseModal).openModal();
		},
	},
	methods: {
		clearInputs() {
			this.name = "";
			this.link = "";
		},
		cancelModal() {
			(this.$refs.newMaterial as typeof BaseModal).closeModal();
			this.clearInputs();
		},
		async confirmAdding(courseId: string) {
			const material = new Material(uuidv4(), courseId);
			material.name = this.name;
			material.link = this.link;
			await createMaterial(material);
			this.$emit('materialAdded');
			(this.$refs.newMaterial as typeof BaseModal).closeModal();
			this.clearInputs();
		},
	},
	components: { BaseModal, BaseButton, BaseInput, Form }
});
</script>
  