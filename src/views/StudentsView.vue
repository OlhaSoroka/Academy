<template>
    <div class="students__container">
        <div class="students___header_container">
            <div>
                <div class="flex items-center h-16">
                    <h1 class="students__header mr-3">Students Dashboard
                    </h1>
                    <Spinner v-if="studentStore.isStudentLoading" />
                </div>
                <div v-if="userStore.isStudent" class="students__subheader" > Current students of {{ currentStudentCourseName }} </div>
                <div v-if="userStore.isMentor" class="students__subheader" >Current Academy students</div>
                <div v-if="userStore.isAdmin" class="students__subheader">{{ !isArchive ? 'Current Academy students' : 'All Academy students' }}
                </div>
            </div>
            <div>
                <BaseButton v-if="userStore.isAdmin" :variant="'btn_blue'" @click="addStudent">Add new student
                </BaseButton>
            </div>
        </div>
        <div class="students_widget">
            <div v-if="userStore.isAdmin" class="flex justify-end mb-4">
                <div class="flex rounded-lg">
                    <div @click="showActive()"
                        class="py-2 px-6 font-semibold text-slate-400 cursor-pointer border-2 border-slate-400 rounded-lg rounded-r-none hover:bg-primary-100"
                        :class="!isArchive ? 'bg-primary-200 !text-primary-700 !border-primary-700' : 'border-r-0'">
                        Active</div>
                    <div @click="showArchive()"
                        class="py-2 px-6 font-semibold text-slate-400 cursor-pointer border-2 border-slate-400 rounded-lg rounded-l-none hover:bg-primary-100"
                        :class="isArchive ? 'bg-primary-200 !text-primary-700 !border-primary-700' : 'border-l-0'">
                        Archive</div>
                </div>
            </div>
            <div v-if="(userStore.isAdmin || userStore.isMentor)">
                <BaseTableEditable :column-defs="columnDefs"
                    :row-data="isArchive ? studentStore.archiveStudents : studentStore.activeStudents"
                    uniq-identifier="id" @deleteRow="onStudentDelete($event)" @cellValueChanged="onStudentEdit($event)"
                    class="min-h-[230px]" />
            </div>
            <div v-if="userStore.isStudent">
                <BaseTableEditable :column-defs="columnDefs" :row-data="studentStore.studentsFromMyCourse"
                    uniq-identifier="id" @deleteRow="onStudentDelete($event)" @cellValueChanged="onStudentEdit($event)"
                    class="min-h-[230px]" />
            </div>
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
import Spinner from '../components/Spinner.vue';
import { useCoursesStore } from '../store/courses';
import { SelectItem } from '../models/options.model';
import { AppUser, StudentStatus } from '../api/models/user.model';
import { IColumnDefs } from '../api/models/base-table.model';

export default {
    components: { UserCreateModal, BaseButton, BaseTableEditable, Spinner },

    mounted() {
        this.studentStore.fetchStudents();
        this.coursesStore.fetchCourses();
    },
    data(): {
        isAddStudentModalOpen: boolean,
        isArchive: boolean
    } {
        return {
            isAddStudentModalOpen: false,
            isArchive: false
        };
    },
    methods: {
        addStudent() {
            this.isAddStudentModalOpen = !this.isAddStudentModalOpen;
        },
        async onStudentDelete(studentId: string) {
            this.studentStore.deleteStudent(studentId);
        },
        async onStudentEdit(event: { uniqIdentifier: string, data: AppUser, colDef: { field: string } }) {
            if (event.colDef.field === 'course') {
                this.studentStore.updateStudentCourse(event.data, event.data.course!);
            } else {
                this.studentStore.updateStudent(event.data);
            }
            this.studentStore.fetchStudents();
        },
        showActive(): void {
            this.isArchive = false;
        },
        showArchive(): void {
            this.isArchive = true;
        }
    },
    computed: {
        ...mapStores(useStudentStore, useUserStore, useCoursesStore),
        currentStudentCourseName(){
            return this.coursesStore.getCourseById(this.userStore.currentUser!.courseId!)?.name
        },
        columnDefs(): IColumnDefs[] {
            const courseDropdownOptions: SelectItem[] = this.coursesStore.activeCourses.map(course => {
                return {
                    label: course.name,
                    value: course.id
                }
            })

            if (this.userStore.isStudent) {
                return [
                    { field: "avatarUrl", headerName: "", width: 80, centered: true, image: true },
                    { field: "fullName", headerName: "Name", sortable: true, editable: false, minWidth: 150, filter: true, width: 200 },
                    { field: "email", headerName: "Email", sortable: true, editable: false, minWidth: 150, filter: true, width: 200 },
                ]
            }
            if (this.userStore.isAdmin || this.userStore.isMentor) {
                if (this.isArchive) {
                    return [ 
                        { field: "avatarUrl", headerName: "", width: 80, centered: true, image: true, },
                        { field: "fullName", headerName: "Name", sortable: true, editable: false, filter: true, width: 250 },
                        { field: "course", headerName: "Course", sortable: true, editable: false, filter: true, width: 200 },
                        { field: "email", headerName: "Email", sortable: true, editable: false, filter: true, width: 250 },
                        { field: "phone", headerName: "Phone", sortable: false, editable: true, width: 200 },
                        { field: "city", headerName: "City", sortable: true, editable: true, filter: true, width: 200 },
                        { field: "study_period", headerName: "Period of study", sortable: true, editable: true, filter: true, width: 200 },
                        { field: "company", headerName: "Company", sortable: true, editable: true, filter: true, width: 200 },
                        {
                            field: "status", headerName: "Status", sortable: true, editable: true, filter: true, width: 200, dropdown: true,
                            options: [
                                { label: "Is working in another company", value: StudentStatus.ANOTHER_COMPANY },
                                { label: "Interested in work", value: StudentStatus.INTERESTED_IN_WORK },
                                { label: "Left our company", value: StudentStatus.LEFT_OUR_COMPANY },
                                { label: "Our employee", value: StudentStatus.OUR_EMPLOYEE },
                                { label: "Sent letter", value: StudentStatus.SENT_LETTER },
                                { label: "To contact later", value: StudentStatus.TO_CONTACT_LATER },
                            ]
                        },
                        { field: "status_date", headerName: "Status date", sortable: true, editable: true, date: true, filter: true, width: 200 },
                        { field: "comments", headerName: "Comments", sortable: true, editable: true, filter: true, width: 200 },
                        { field: "", headerName: "Delete", sortable: false, editable: false, width: 120, actionColumn: true,centered: true, delete: true ,headerCentered:true },

                    ]
                }
                return [
                    { field: "avatarUrl", headerName: "", width: 80, centered: true, image: true },
                    { field: "fullName", headerName: "Name", sortable: true, editable: false, minWidth: 150, filter: true, width: 200 },
                    { field: "email", headerName: "Email", sortable: true, editable: false, minWidth: 150, filter: true, width: 200 },
                    { field: "course", headerName: "Course", sortable: true, editable: true, dropdown: true, options: courseDropdownOptions, filter: true, width: 200 },
                    { field: "", headerName: "Delete", sortable: false, editable: false, width: 120, centered: true, actionColumn: true, delete: true ,headerCentered:true },
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

.students__subheader {
    @apply mt-2 font-normal text-stone-400 text-start;
}

.students_widget {
    @apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full
}
</style>