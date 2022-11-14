<template>
	<BaseModal ref="createLectureModal" :header="'Enter lecture title'" @isClosed="clearInputs()">
		<template #body>
			<div>
				<div class="">
					<div>
						<BaseInput v-model="name" label="Title:" name="lecture_name" />
					</div>
					<div class="mt-4">
						<BaseButton class="mr-2" variant="btn_blue_outlined" :disabled="!isFormValid" @click="submit()">
							Add
						</BaseButton>
						<BaseButton variant="btn_red_outlined" @click="cancel">
							Cancel
						</BaseButton>
					</div>
				</div>
			</div>
		</template>
	</BaseModal>
</template>

<script lang="ts">
import { uuidv4 } from '@firebase/util';
import { Form } from 'vee-validate';
import { defineComponent } from 'vue';
import { createLecture } from '../../../api/lectures';
import { Lecture } from '../../../api/models/lecture.model';
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
	computed: {
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
			await createLecture(lecture);
			this.$emit('lectureCreated');
			(this.$refs.createLectureModal as typeof BaseModal).closeModal();
			this.clearInputs();
		}
	}
})</script>