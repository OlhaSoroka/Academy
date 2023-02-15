<template>
	<BaseModal ref="addCommentModal" :header="'Add comment'" @isClosed="clearInputs()">
		<template #body>
			<div>
				<div class="flex items-center flex-col mt-4">
					<div class="mt-2">
						<textarea v-model="message" class="border" cols="45" rows="3" />
					</div>
					<div class="flex justify-between mt-5">
						<div class="mx-2">
							<BaseButton :variant="'btn_blue_outlined'" :disabled="!isFormValid()" button-type="submit"
								@click="submit(currentRouteName)">
								Add
							</BaseButton>
						</div>
						<div class="mx-2">
							<BaseButton :variant="'btn_red_outlined'" @click="cancel" button-type="reset">
								Cancel
							</BaseButton>
						</div>
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
import { useCourseDetailsStore } from "../../../store/course-details.store";
import BaseButton from "../../baseComponents/BaseButton.vue";
import BaseModal from "../../baseComponents/BaseModal.vue";
import { Form } from "vee-validate";
import { uuidv4 } from "@firebase/util";
import { Comment } from "../../../api/models/comment.model";
import { createComment } from "../../../api/comments";


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
			message: "",
		};
	},
	emits:['commentsAdded'],
	computed: {
		...mapStores(useUserStore, useCoursesStore, useCourseDetailsStore),
		currentRouteName() {
			return this.$route.params.id as string
		},
		currentUserId() {
			return this.userStore.currentUser?.id
		}
	},
	watch: {
		toggleModal() {
			(this.$refs.addCommentModal as typeof BaseModal).openModal();
		},
	},
	methods: {
		clearInputs() {
			this.message = "";
		},
		isFormValid(): boolean {
			return this.message !== "";
		},
		async submit(courseId: string) {
			const comment = new Comment(uuidv4(), this.currentUserId!, courseId);
			comment.message = this.message;
			comment.createdAt = Date.now()
			await createComment(comment);
			this.courseDetailsStore.createComment(comment);
			this.$emit('commentsAdded');
			(this.$refs.addCommentModal as typeof BaseModal).closeModal();
			this.clearInputs();

		},
		cancel() {
			this.clearInputs();
			(this.$refs.addCommentModal as typeof BaseModal).closeModal();
		},
	},
};
</script>
  