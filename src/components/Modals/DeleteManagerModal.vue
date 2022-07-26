<template>
  <BaseModal
    ref="deleteManagerModal"
    :header="'Confirm delete'"
  >
    <template #body>
      <div v-if="manager">
        Do you really want to delete <span class="font-bold">{{ manager.fullName }}</span>?
      </div>
      <div class="flex justify-center mt-7">
        <div class="mx-1">
          <BaseButton
            :variant="'btn_red'"
            @click="handleDeleteManager(manager.id)"
          >
            Delete
          </BaseButton>
        </div>
        <div class="mx-1">
          <BaseButton @click="cancelModal">
            Cancel
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import BaseModal from '@/components/BaseModal.vue';
import { mapActions } from 'vuex';
export default {
	components: { BaseButton, BaseModal },
	props: {
		toggleModal: {
			type: Boolean,
			default: false,
		},
		manager: {
			type: Object,
			default: null
		},
	},
	watch: {
		toggleModal() {
			this.$refs.deleteManagerModal.openModal();
		},
	},
	methods: {
		...mapActions('managers', ['deleteManager']),
		handleDeleteManager(id) {
			this.deleteManager(id);
			this.idToDelete = null;
			this.$refs.deleteManagerModal.closeModal();
		},
		cancelModal() {
			this.$refs.deleteManagerModal.closeModal();
		},
	},
};
</script>
