<template>
	<BaseModal ref="newDocument" :header="'Add new document'" @isClosed="clearInputs()">
		<template #body>
			<form>
				<Form>
					<div class="w-52">
						<div class="base-input-container">
							<label for="Document name" class="input_label">Document name</label>
							<Field class="base-input" v-model="name" name="Document name" rules="required||min:3||max:69" placeholder="Enter document name"
								:validate-on-input="true" />
							<div>
								<ErrorMessage class="base-input-error-text" name="Document name" />
							</div>
						</div>
						<div class="base-input-container">
							<label for="Document link" class="input_label">Document link</label>
							<Field class="base-input" v-model="link" name="Document link" rules="required" placeholder="Enter document link"
								:validate-on-input="true" />
							<div>
								<ErrorMessage class="base-input-error-text" name="Document link" />
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
import { useCourseDetailsStore } from "../../../store/course-details.store";
import { defineComponent } from "vue";
import BaseModal from "../../baseComponents/BaseModal.vue";
import BaseButton from "../../baseComponents/BaseButton.vue";
import { createDocument } from "../../../api/document";
import { Document } from "../../../api/models/documents.model";
import { uuidv4 } from "@firebase/util";
import { ErrorMessage, Field, Form } from 'vee-validate'


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
	emits: ['documentAdded'],
	computed: {
		...mapStores(useUserStore, useCoursesStore, useCourseDetailsStore),
		currentRouteName() {
			return this.$route.params.id as string
		},
	},
	watch: {
		toggleModal() {
			(this.$refs.newDocument as typeof BaseModal).openModal();
		},
	},
	methods: {
		clearInputs() {
			this.name = "";
			this.link = "";
		},
		cancelModal() {
			(this.$refs.newDocument as typeof BaseModal).closeModal();
			this.clearInputs();
		},
		async confirmAdding(courseId: string) {
			const document = new Document(uuidv4(), courseId);
			document.name = this.name;
			document.link = this.link;
			await createDocument(document);
			this.courseDetailsStore.createDocument(document);
			this.$emit('documentAdded');
			(this.$refs.newDocument as typeof BaseModal).closeModal();
			this.clearInputs();
		},
	},
	components: { BaseModal, BaseButton, Form, Field, ErrorMessage }
});
</script>
  

<style lang="scss" scoped>
.input_label {
  @apply ml-1 block text-base font-semibold mb-1;
}
</style>