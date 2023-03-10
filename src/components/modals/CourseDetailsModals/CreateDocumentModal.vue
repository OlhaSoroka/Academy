<template>
	<BaseModal ref="newDocument" :header="'Add new document'" @isClosed="clearInputs()">
		<template #body>
			<form>
				<Form>
					<BaseInput v-model="name" label="Document Name" additionalRules="required|min:3|max:69" name="document_name" />
					<BaseInput v-model="link" type="Link" label="Document Link" rules="required" name="document_link" />
				</Form>
				<div class="flex justify-between mt-5">
					<div class="mx-2">
						<BaseButton :variant="'btn_blue_outlined'" @click="confirmAdding(currentRouteName)"
							:disabled="!(name.length && link.length)">
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
import { useUserStore } from "../../../store/user";
import { useCoursesStore } from "../../../store/courses";
import { useCourseDetailsStore } from "../../../store/course-details.store";
import { defineComponent } from "vue";
import BaseModal from "../../baseComponents/BaseModal.vue";
import BaseButton from "../../baseComponents/BaseButton.vue";
import BaseInput from "../../baseComponents/BaseInput.vue";
import { createDocument } from "../../../api/document";
import { Document } from "../../../api/models/documents.model";
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
	emits:['documentAdded'],
	computed: {
		...mapStores(useUserStore, useCoursesStore, useCourseDetailsStore ),
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
	components: { BaseModal, BaseButton, BaseInput, Form }
});
</script>
  