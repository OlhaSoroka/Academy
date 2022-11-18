<template>
    <div class="students__container">
        <div class="students___header_container">
            <h1 class="students__header">Students Dashboard</h1>
            <div>
                <BaseButton :variant="'btn_blue'" @click="addStudent">Add new student</BaseButton>
            </div>
        </div>
        <div class="students_widget">
            <BaseTableEditable :column-defs="columnDefs" :row-data="studentStore.allStudents" uniq-identifier="id" />
        </div>
        <UserCreateModal :toggle-modal="isAddStudentModalOpen" :role="'student'" :header="'Add new student'">
        </UserCreateModal>
    </div>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import UserCreateModal from '../components/modals/UserCreateModal.vue';
import BaseButton from '../components/baseComponents/BaseButton.vue';
import { useStudentStore } from '../store/students';
import BaseTableEditable from '../components/baseComponents/BaseTableEditable.vue';

export default {
    components: { UserCreateModal, BaseButton, BaseTableEditable },
    mounted() {
        this.studentStore.fetchStudents();
    },
    data() {
        return {
            isAddStudentModalOpen: false,
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
            this.isAddStudentModalOpen = !this.isAddStudentModalOpen;
        }
    },
    computed: {
        ...mapStores(useStudentStore),
    }

}
</script>
<style lang="css" scoped>
.students__container {
    @apply p-10 bg-primary-100 min-h-full
}

.students___header_container {
    @apply flex justify-between items-center mb-6
}

.students__header {
    @apply font-semibold text-lg text-start text-primary-700;
}

.students_widget {
    @apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full
}
</style>