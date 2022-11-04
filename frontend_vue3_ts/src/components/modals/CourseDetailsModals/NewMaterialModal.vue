<template>
	<BaseModal ref="newMaterial" :header="'Add new material'" @isClosed="clearInputs()">
		<template #body>
			<div class="flex justify-center flex-col mt-7 gap-10">
				<div class="mx-1">
					<BaseInput v-model="name" label="Material Name" rules="required" name="material_name" />
					<BaseInput v-model="link" type="Link" label="Material Link" rules="required" name="material_link" />
				</div>
				<div class="mx-1 flex justify-around">
					<BaseButton variant="btn_red" @click="cancelModal">
						Cancel
					</BaseButton>
					<BaseButton :disabled="!(name.length && link.length)" @click="
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
import { Course } from "../../../api/models/course.model";
import BaseModal from "../../baseComponents/BaseModal.vue";
import BaseButton from "../../baseComponents/BaseButton.vue";
import BaseInput from "../../baseComponents/BaseInput.vue";


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
			link: "",
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
				return course;
			}
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
		async confirmAdding({ id, course }: {
			id: string;
			course?: Course;
		}) {
			if (course) {
				course.materials.push({
					id: `${this.name}  (${this.userStore.user?.fullName})`,
					name: `${this.name}`,
					link: this.link,
				});
				this.coursesStore.updateCourse({ id, course: course });
				await this.coursesStore.getCourses();
				(this.$refs.newMaterial as typeof BaseModal).closeModal();
				this.clearInputs();
			}
		},
	},
	components: { BaseModal, BaseButton, BaseInput }
});
</script>
  