<template>
	<BaseModal ref="createLectureModal" :header="'Enter lecture title'" @isClosed="clearInputs()">
		<template #body>
			<div>
				<div class="">
					<Form>
						<BaseInput v-model="name" label="Title:" additionalRules="required|min:3|max:69" name="lecture_name" type="text"/>
					</Form>
					<div class="flex justify-between mt-5">
						<div class="mx-2">
							<BaseButton variant="btn_blue_outlined" :disabled="!isFormValid" @click="submit()">
								Add
							</BaseButton>
						</div>
						<div class="mx-2">
							<BaseButton variant="btn_red_outlined" @click="cancel">
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
import { uuidv4 } from '@firebase/util';
import { mapStores } from 'pinia';
import { Form } from 'vee-validate';
import { defineComponent } from 'vue';
import { Lecture } from '../../../api/models/lecture.model';
import { useCourseDetailsStore } from '../../../store/course-details.store';
import BaseButton from '../../baseComponents/BaseButton.vue';
import BaseInput from '../../baseComponents/BaseInput.vue';
import BaseModal from '../../baseComponents/BaseModal.vue';

export default defineComponent({
	components: { BaseModal, Form, BaseInput, BaseButton },
	props: {
		toggleModal: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			name: "",
		}
	},
	emits:['lectureCreated'],
	computed: {
		...mapStores(useCourseDetailsStore),
		isFormValid() { return !!this.name },
		courseId() {
			return this.$route.params.id as string
		}
	},
	watch: {
		toggleModal() {
			(this.$refs.createLectureModal as typeof BaseModal).openModal();
		},
	},
	methods: {
		clearInputs() {
			this.name = ""
		},
		cancel() {
			(this.$refs.createLectureModal as typeof BaseModal).closeModal();
			this.clearInputs();
		},
		async submit() {
			const lecture = new Lecture(uuidv4(), this.courseId);
			lecture.name = this.name;
			this.courseDetailsStore.createLecture(lecture);
			this.$emit('lectureCreated');
			(this.$refs.createLectureModal as typeof BaseModal).closeModal();
			this.clearInputs();
		}
	}
})</script>