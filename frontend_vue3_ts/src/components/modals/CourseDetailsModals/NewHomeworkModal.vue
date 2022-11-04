<template>
	<BaseModal ref="newHomework" :header="'Add new homework'" @isClosed="clearInputs()">
		<template #body>
			<div class="flex justify-center flex-col mt-7 gap-10">
				<div class="mx-1">
					<BaseInput v-model="name" label="Homework Name" name="homework_name" />
					<BaseInput v-model="date" type="date" label="Date" rules="required" name="homework_date" />
				</div>
				<div class="mx-1 flex justify-around">
					<BaseButton variant="btn_red" @click="cancelModal">
						Cancel
					</BaseButton>
					<BaseButton :disabled="!(date.length && name.length)" @click="
	confirmAdding({ id: currentRouteName, course: currentCourse })
					">
						Add
					</BaseButton>
				</div>
			</div>
		</template>
	</BaseModal>
</template>
  
<script lang="ts">
import { mapStores } from "pinia";
import { useUserStore } from "../../../store/user";
import { useCoursesStore } from "../../../store/courses";
import { defineComponent } from "vue";
import BaseModal from "../../baseComponents/BaseModal.vue";
import BaseInput from "../../baseComponents/BaseInput.vue";
import BaseButton from "../../baseComponents/BaseButton.vue";
import { Course, Homework } from "../../../api/models/course.model";

export default defineComponent({
	props: {
		toggleModal: {
			type: Boolean,
			default: false,
		},
		mentor: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			name: "",
			date: "",
		};
	},
	computed: {
		...mapStores(useUserStore, useCoursesStore),
		currentRouteName() {
			const fullPath = this.$router.currentRoute.value.path;
			console.log(this.$router);
			const pathArray = fullPath.split("/");
			const id = pathArray[pathArray.length - 1];
			return id;
		},
		currentCourse() {
			const course = this.coursesStore.getCourseById(this.currentRouteName);
			if (course) {
				return course
			}
		},
	},
	watch: {
		toggleModal() {
			(this.$refs.newHomework as typeof BaseModal).openModal();
		},
	},
	methods: {
		clearInputs() {
			this.name = "";
		},
		cancelModal() {
			(this.$refs.newHomework as typeof BaseModal).closeModal();
			this.clearInputs();
		},
		async confirmAdding({ id, course }: { id: string, course?: Course }) {
			if (course) {
				const homework: Homework = {
					id: `${this.name}  (${this.userStore.user?.fullName})`,
					name: `${this.name}`,
					date: this.date,
					rate: 0,
					link: ""
				};
				course.homework_results.forEach((result) => result.homework.push(homework));
				await this.coursesStore.updateCourse({ id, course });
				(this.$refs.newHomework as typeof BaseModal).closeModal();
				await this.coursesStore.getCourses();
				this.clearInputs()
			}

		},
	},
	components: { BaseModal, BaseInput, BaseButton }
});
</script>
  