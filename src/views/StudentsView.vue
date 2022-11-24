<template>
    <div class="students__container">
        <div class="students___header_container">
            <div class="flex items-center">
                <h1 class="students__header mr-3">Students Dashboard
                </h1>
                <Spinner v-if="studentStore.isStudentLoading" />
            </div>
            <div>
                <BaseButton v-if="userStore.isAdmin" :variant="'btn_blue'" @click="addStudent">Add new student
                </BaseButton>
            </div>
        </div>
        <div class="students_widget">
            <BaseTableEditable :column-defs="columnDefs" :row-data="studentStore.allStudents" uniq-identifier="id"
                @deleteRow="onStudentDelete($event)" @cellValueChanged="onStudentEdit($event)" />
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
import { useUserStore } from '../store/user';
import Spinner from '../components/baseComponents/spinner/Spinner.vue';
import { useCoursesStore } from '../store/courses';
import { SelectItem } from '../models/options.model';
import { AppUser } from '../api/models/user.model';

export default {
    components: { UserCreateModal, BaseButton, BaseTableEditable, Spinner },

    mounted() {
        this.studentStore.fetchStudents();
        this.coursesStore.fetchCourses();
    },
    data(): {
        columnDefs: any,
        isAddStudentModalOpen: boolean,

    } {
        return {
            isAddStudentModalOpen: false,
            columnDefs: []
        };
    },
    methods: {
        addStudent() {
            this.isAddStudentModalOpen = !this.isAddStudentModalOpen;
        },
        async onStudentDelete(studentId: string) {
            this.studentStore.deleteStudent(studentId);
        },
        async onStudentEdit(event: { uniqIdentifier: string, data: AppUser }) {
            this.studentStore.updateStudentCourse(event.data, event.data.course!);
            this.studentStore.fetchStudents();
        },
    },
    computed: {
        ...mapStores(useStudentStore, useUserStore, useCoursesStore),
        columnDefs() {
            const courseDropdownOptions: SelectItem[] = this.coursesStore.allCourses.map(course => {
                return {
                    label: course.name,
                    value: course.id
                }
            })

            if (this.userStore.isStudent) {
                return [
                    { field: "fullName", headerName: "Name", sortable: true, editable: false, minWidth: 150, width: 200 },
                    { field: "email", headerName: "Email", sortable: true, editable: false, minWidth: 150, width: 200 },
                    { field: "course", headerName: "Course", sortable: true, editable: false, minWidth: 150, width: 200 },
                ]
            }
            if (this.userStore.isAdmin || this.userStore.isMentor) {
                return [
                    { field: "fullName", headerName: "Name", sortable: true, editable: false, minWidth: 150, width: 200 },
                    { field: "email", headerName: "Email", sortable: true, editable: false, minWidth: 150, width: 200 },
                    { field: "course", headerName: "Course", sortable: true, editable: true, dropdown: true, options: courseDropdownOptions, minWidth: 150, width: 200 },
                    { field: "", headerName: "", sortable: false, editable: false, width: 120, actionColumn: true, delete: true },
                ]
            }
            return []
        }
    }

}
</script>
<style lang="scss" scoped>
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