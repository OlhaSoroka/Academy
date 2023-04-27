<template>
	<BaseModal ref="newMaterial" :header="'Add new material'" @isClosed="clearInputs()">
		<template #body>
			<form>
				<Form>
					<div class="w-52">
						<div class="base-input-container">
							<label for="Material name">Material name</label>
							<Field class="base-input" v-model="name" name="Material name" rules="required||min:3||max:69"
								:validate-on-input="true" />
							<div>
								<ErrorMessage class="base-input-error-text" name="Material name" />
							</div>
						</div>
						<div class="base-input-container">
							<label for="Material link">Material link</label>
							<Field class="base-input" v-model="link" name="Material link" rules="required"
								:validate-on-input="true" />
							<div>
								<ErrorMessage class="base-input-error-text" name="Material link" />
							</div>
						</div>
					</div>
				</Form>
				<div class="flex justify-end mt-5">
					<div class="mr-2">
						<BaseButton :variant="'btn_blue_outlined'" @click="confirmAdding(currentRouteName)"
							:disabled="!(name.length && link.length)">
							Add
						</BaseButton>
					</div>
					<div>
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
import { useUserStore } from "../../../store/user";
import { useCoursesStore } from "../../../store/courses";
import { defineComponent } from "vue";
import BaseModal from "../../baseComponents/BaseModal.vue";
import BaseButton from "../../baseComponents/BaseButton.vue";
import { createMaterial } from "../../../api/materials";
import { Material } from "../../../api/models/material.model";
import { uuidv4 } from "@firebase/util";
import { ErrorMessage, Field, Form } from 'vee-validate'
import { useCourseDetailsStore } from "../../../store/course-details.store";



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
	emits: ['materialAdded'],
	computed: {
		...mapStores(useUserStore, useCoursesStore, useCourseDetailsStore),
		currentRouteName() {
			return this.$route.params.id as string
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
			this.courseDetailsStore.createMaterial(material);
			this.$emit('materialAdded');
			(this.$refs.newMaterial as typeof BaseModal).closeModal();
			this.clearInputs();
		},
		submit(e: any) {
			console.log("submit: ", e);
		},
	},
	components: { BaseModal, BaseButton, Form, Field, ErrorMessage }
});
</script>


  