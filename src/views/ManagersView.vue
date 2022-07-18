/* eslint-disable no-console *
<template>
  <div class="w-2/3 mt-10 mx-auto flex flex-col justify-start items-start">
    <div class="w-full flex justify-between items-center">
      <div>
        <h2 class="font-semibold text-start text-sky-700">
          Managers Dashboard
        </h2>
        <h3 class="mt-2 font-normal text-stone-400">
          Managers list of InventorSoft Academy
        </h3>
      </div>
      <div>
        <BaseButton
          variant="btn_blue"
          @click="addNewManager"
        >
          Add new manager
        </BaseButton>
      </div>
    </div>
    <div class="w-full border-2 border-stone-200 shadow-md rounded-md mt-5">
      <BaseTable
        :table-data="{
          headingData: [{ fullName: 'Fullname' }, { email: 'Email' }],
          bodyData: managers,
        }"
        :edit-btns="true"
        :is-data-loading="isManagersLoading"
        :delete-btns="true"
        @delete="deleteModal($event)"
        @edit="handleEditManager($event)"
      />
    </div>
    <BaseModal
      ref="newManagerModal"
      :header="'Add new manager'"
    >
      <template #body>
        <div class="mt-1">
          <BaseInput
            v-model="newManagerFullname"
            type="text"
            label="Fullname"
            placeholder="Olha Soroka"
          />
          <BaseInput
            v-model="newManagerEmail"
            type="email"
            label="Email"
            vid="email"
            placeholder="aaa@gmail.com"
          />
          <BaseInput
            v-model="newManagerPassword"
            type="password"
            label="Password"
            vid="password"
            placeholder="qwe123"
          />
          <div class="flex justify-center mt-5">
            <div class="mx-1">
              <BaseButton @click="submitAddNewManager">
                Submit
              </BaseButton>
            </div>
            <div class="mx-1">
              <BaseButton
                :variant="'btn_red'"
                @click="cancelAddNewManager"
              >
                Cancel
              </BaseButton>
            </div>
          </div>
        </div>
      </template>
    </BaseModal>
    <BaseModal
      ref="deleteModal"
      :header="'Confirm delete'"
    >
      <template #body>
        <div>Do you really want to delete this user?</div>
        <div class="flex justify-center mt-7">
          <div class="mx-1">
            <BaseButton
              :variant="'btn_red'"
              @click="handleDeleteManager(idToDelete)"
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
  </div>
</template>
<script>
import BaseTable from '@/components/UI/BaseTable/BaseTable.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseModal from '@/components/BaseModal.vue';
import BaseInput from '@/components/BaseInput.vue';
import { mapActions, mapGetters } from 'vuex';
import { MANAGER_ROLE } from '@/constants/roles.constant';

export default {
	components: {
		BaseTable,
		BaseButton,
		BaseModal,
		BaseInput,
	},
	data() {
		return {
			newManagerFullname: '',
			newManagerEmail: '',
			newManagerPassword: '',
			idToDelete: null,
		};
	},
	computed: {
		...mapGetters('managers', ['managers', 'isManagersLoading']),
		isAddNewManagerFormValid() {
			// eslint-disable-next-line no-console
			return this.newManagerFullname && this.newManagerEmail && this.newManagerPassword;
		},
	},
	async mounted() {
		await this.fetchManagers();
	},
	methods: {
		...mapActions('managers', ['fetchManagers', 'createManager', 'deleteManager']),
		addNewManager() {
			this.$refs.newManagerModal.openModal();
		},
		submitAddNewManager() {
			const manager = {
				email: this.newManagerEmail,
				fullName: this.newManagerFullname,
				password: this.newManagerPassword,
				role: MANAGER_ROLE,
			};
			this.createManager(manager);
			this.$refs.newManagerModal.closeModal();
		},
		cancelAddNewManager() {
			this.$refs.newManagerModal.closeModal();
		},
		handleDeleteManager(id) {
			this.deleteManager(id);
			this.idToDelete = null;
      this.$refs.deleteModal.closeModal();
		},
		deleteModal(id) {
			this.idToDelete = id;
			this.$refs.deleteModal.openModal();
     
		},
		cancelModal() {
			this.$refs.deleteModal.closeModal();
		},
	},
};
</script>

<style></style>
