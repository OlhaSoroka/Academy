<template>
    <div class="mentor__container">
        <div class="flex justify-between items-center mb-6">
            <h1 class="mentor__header">Mentors Dashboard</h1>
            <div>
                <BaseButton :variant="'btn_blue'" @click="addStudent">Add new mentor</BaseButton>
            </div>
        </div>
        <div class="mentor_widget">
			<BaseTableEditable :column-defs="columnDefs" :row-data="mentorStore.mentors" uniq-identifier="id"
				/>
		</div>
        <UserCreateModal :toggle-modal="isAddCourseModalOpen" :role="'mentor'" :header="'Add new mentor'">
        </UserCreateModal>
    </div>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import UserCreateModal from '../components/modals/UserCreateModal.vue';
import BaseButton from '../components/baseComponents/BaseButton.vue';
import { useMentorStore } from '../store/mentors';
import BaseTableEditable from '../components/baseComponents/BaseTableEditable.vue';


export default {
    components: { UserCreateModal, BaseButton, BaseTableEditable },
    mounted() {
		this.mentorStore.fetchMentors();
	},
    data() {
        return {
            isAddCourseModalOpen: false,
            columnDefs: [
				{ field: "fullName", headerName: "Name", sortable: true, editable: false, minWidth: 150, width: 200 },
                { field: "email", headerName: "Email", sortable: true, editable: false, minWidth: 150, width: 200 },
				{ field: "course", headerName: "Course", sortable: true, editable: false, minWidth: 150, width: 200 },
				{ field: "", headerName: "", sortable: false, editable: false, width: 120, actionColumn: true, delete: true },
			],
        };
    },
    methods: {
        addStudent() {
            this.isAddCourseModalOpen = !this.isAddCourseModalOpen;
        }
    },
    computed: {
        ...mapStores(useMentorStore),
    }
    
}
</script>
<style lang="css" scoped>
.mentor__container {
    @apply p-10 bg-primary-100 min-h-full
}

.mentor__header {
    @apply font-semibold text-lg text-start text-primary-700;
}
.mentor_widget {
    @apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full
}
</style>