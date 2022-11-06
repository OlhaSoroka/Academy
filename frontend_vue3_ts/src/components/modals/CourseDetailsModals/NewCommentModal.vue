<template>
	<BaseModal ref="addCommentModal" :header="'Add comment'" @isClosed="clearInputs()">
		<template #body>
			<div>
				<div class="flex items-center flex-col mt-4">
					<div class="mt-2">
						<textarea v-model="comments" class="border" cols="45" rows="3" />
					</div>
					<div class="mx-1 flex gap-20">
						<BaseButton variant="btn_red" @click="cancel" button-type="reset">
							Cancel
						</BaseButton>
						<BaseButton :disabled="!isFormValid()" button-type="submit" @click="submit">
							Add
						</BaseButton>
					</div>
				</div>
			</div>
		</template>
	</BaseModal>
</template>
  
<script lang="ts">
import { mapStores } from "pinia";
import { useUserStore } from "../../../store/user";
import { useCoursesStore } from "../../../store/courses";
import BaseButton from "../../baseComponents/BaseButton.vue";
import BaseModal from "../../baseComponents/BaseModal.vue";
import { Form } from "vee-validate";


export default {
	components: { BaseModal, BaseButton, Form },
	props: {
		toggleModal: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			comments: "",
		};
	},
	computed: {
		...mapStores(useUserStore, useCoursesStore)
	},
	watch: {
		toggleModal() {
			(this.$refs.addCommentModal as typeof BaseModal).openModal();
		},
	},
	methods: {
		clearInputs() {
			this.comments = "";
		},
		isFormValid(): boolean {
			return this.comments !== "";
		},
		submit() {
			const currentCourse = this.coursesStore.getCourseById(this.$route.params.id as string);
			const currentUser = this.userStore.currentUser;
			if (currentCourse && currentUser) {
				currentCourse.comments.push({
					id: Date.now(),
					message: this.comments,
					createdAt: new Date().toLocaleDateString(),
					author: currentUser.fullName,
					author_id: currentUser.id,
					author_email: currentUser.email,
				});
				const payload = {
					currentItemUpdate: currentCourse,
					id: this.$route.params.id as string,
				};
				this.coursesStore.addNewComment(payload);
				this.clearInputs();
				(this.$refs.addCommentModal as typeof BaseModal).closeModal();
			}

		},
		cancel() {
			this.clearInputs();
			(this.$refs.addCommentModal as typeof BaseModal).closeModal();
		},
	},
};
</script>
  