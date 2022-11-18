<template>
	<BaseModal ref="profileImageModal" :header="'Change profile image'">
		<template #body>
			<div class="flex flex-col items-center text-start mt-5">
				<div v-if="profileImageSrc">
					<img class="h-60 w-auto rounded-md" :src="profileImageSrc">
				</div>
				<div v-else>
					Please select image from your PC
				</div>
				<input v-show="false" ref="fileInput" type="file" @change="onImageSelected($event)">
				<div class="flex justify-between mt-5">
					<div class="mr-3">
						<BaseButton :variant="'btn_blue_outlined'" @click="selectImage">
							Select
						</BaseButton>
					</div>
					<div v-if="profileImageSrc" class="mr-3">
						<BaseButton :variant="'btn_blue_outlined'" @click="submitImage">
							Submit
						</BaseButton>
					</div>
					<div class="">
						<BaseButton :variant="'btn_red_outlined'" @click="cancel">
							Cancel
						</BaseButton>
					</div>
				</div>
			</div>
		</template>
	</BaseModal>
</template>
  
<script lang="ts">
import { mapStores } from "pinia";
import { useUserStore } from "../../store/user";
import BaseButton from "../baseComponents/BaseButton.vue";
import BaseModal from "../baseComponents/BaseModal.vue";

export default {
	components: { BaseButton, BaseModal },
	props: {
		toggleModal: {
			type: Boolean,
			default: false,
		},
	},
	data(): { profileImageSrc: string, file: File | null } {
		return {
			profileImageSrc: "",
			file: null,
		};
	},
	computed: {
		...mapStores(useUserStore)
	},
	watch: {
		toggleModal() {
			(this.$refs.profileImageModal as typeof BaseModal).openModal();
		},
	},
	mounted() { },
	methods: {
		selectImage() {
			(this.$refs.fileInput as HTMLInputElement).click()
		},
		cancel() {
			this.profileImageSrc = "";
			(this.$refs.profileImageModal as typeof BaseModal).closeModal();
		},
		onImageSelected(e: Event) {
			const target = e.target as HTMLInputElement;
			if (target && target.files) {
				this.file = target.files[0];
				const fileReader = new FileReader();
				fileReader.onloadend = () => {
					this.profileImageSrc = fileReader.result as string;
				};
				fileReader.readAsDataURL(this.file);
			}
		},
		submitImage() {
			if (this.file) {
				this.userStore.changeProfileImage(this.file);
				this.profileImageSrc = "";
				this.$emit('onProfileImageChange');
				(this.$refs.profileImageModal as typeof BaseModal).closeModal();
			}
		},
	},
};
</script>
  