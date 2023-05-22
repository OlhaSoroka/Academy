<template>
	<BaseModal ref="createLectureModal" :header="'Enter lecture title'" @isClosed="clearInputs()">
		<template #body>
			<div>
				<div class="">
					<Form>
						<div class="base-input-container w-60">
							<label for="Title" class="input_label">Lecture name</label>
							<Field class="base-input" v-model="name" name="Lecture name" rules="required||min:3||max:69" placeholder="Enter lecture name"
								:validate-on-input="true" />
							<div>
								<ErrorMessage class="base-input-error-text" name="Lecture name" />
							</div>
						</div>
					</Form>
					<div class="flex justify-end mt-5">
						<div class="mr-2">
							<BaseButton variant="btn_blue_outlined" :disabled="!isFormValid" @click="submit()">
								Add
							</BaseButton>
						</div>
						<div>
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
import { ErrorMessage, Field, Form } from 'vee-validate';
import { defineComponent } from 'vue';
import { Lecture } from '../../../api/models/lecture.model';
import { useCourseDetailsStore } from '../../../store/course-details.store';
import BaseButton from '../../baseComponents/BaseButton.vue';
import BaseModal from '../../baseComponents/BaseModal.vue';

export default defineComponent({
	components: { BaseModal, Form, BaseButton, ErrorMessage, Field },
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
	emits: ['lectureCreated'],
	computed: {
		...mapStores(useCourseDetailsStore),
		isFormValid() { return !!this.name },
		courseId() {
			return this.$route.params.id as string
		},
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
})
</script>

<style lang="scss" scoped>
.input_label {
  @apply ml-1 block text-base font-semibold mb-1;
}
</style>