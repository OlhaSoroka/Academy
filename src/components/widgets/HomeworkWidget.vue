<template>
    <div class="homework__container">
        <div class="flex align-middle justify-between">
            <div class="flex items-center">
                <h2 class="homework__header mr-3">
                    <div>{{ lecture }}</div>
                </h2>
                <Spinner v-if="courseDetailsStore.homeworkWidgetLoading" />
            </div>
        </div>
        <div class="mt-4">
            <BaseTableEditable :column-defs="columnDefs" :row-data="students" :uniq-identifier="uniqIdentifier"
                @cellValueChanged="onCellEdit($event)" />
        </div>
    </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import { updateHomeworkById } from '../../api/homework';
import { getCoursesHomeworks } from '../../api/homework';
import { StudentHomework } from '../../api/models/homework.model';
import { updateStudentExitResult } from '../../api/exit_results';
import { useCourseDetailsStore } from '../../store/course-details.store';
import { useUserStore } from '../../store/user';
import BaseTableEditable from '../baseComponents/BaseTableEditable.vue';
import { UpdateEvent } from '../../api/models/update.model';
export default defineComponent({
    data(): {
        columnDefs: any,
        uniqIdentifier: any,

    } {
        return {
            uniqIdentifier: "id",
            columnDefs: []
        };
    },
    beforeMount() {
        if (this.userStore.isStudent) {
            this.columnDefs = [
                { field: "student", headerName: "Student", sortable: true, editable: false, width: 300 },
                { field: "rate", headerName: "Rate", sortable: true, editable: false, centered:true, width: 160 },
                { field: "link", headerName: "Link", sortable: true, editable: true, link: true, width: 300 },
                { field: "date", headerName: "Completion date", sortable: true, editable: false, width: 150, date: true }
            ]
        }
        if (this.userStore.isAdmin || this.userStore.isMentor) {
            this.columnDefs = [
                { field: "student", headerName: "Student", sortable: true, editable: false,filter:true, width: 300 },
                { field: "rate", headerName: "Rate", sortable: true, editable: true, centered:true, width: 160 },
                { field: "link", headerName: "Link", sortable: true, editable: true, link: true, width: 300 },
                { field: "comment", headerName: "Comment", sortable: true, editable: true, width: 300 },
                { field: "date", headerName: "Completion date", sortable: true, editable: true, width: 150, date: true },
            ]
        }
    },
    computed: {
        ...mapStores(useCourseDetailsStore, useUserStore),
        students(): StudentHomework[] {
            if (this.userStore.isStudent) {
                return this.courseDetailsStore.selectedHomework!.students.filter(student => student.studentId === this.userStore.currentUser?.id)
            }
            return this.courseDetailsStore.selectedHomework!.students;
        },
        lecture(): string {
            return this.courseDetailsStore.selectedHomework!.lecture!;
        },

    },
    methods: {
        async onCellEdit(event: UpdateEvent<StudentHomework>) {
            console.log({event});
            
            // TODO: move this method to store
            const lectureHomework = {
                id: this.courseDetailsStore.selectedHomework!.id,
                courseId: this.courseDetailsStore.selectedHomework!.courseId,
                lectureId: this.courseDetailsStore.selectedHomework!.lectureId,
                students: this.courseDetailsStore.selectedHomework!.students.map((student) => {
                    if (student.studentId === event.data.studentId) {
                        if (student.link !== event.data.link) {
                            event.data.date = new Date(Date.now())
                                .toISOString()
                                .split("T")[0]
                        }
                        return event.data
                    }
                    return student
                }),
                asObject() {
                    return { ...this } as any
                }
            }
            await updateHomeworkById(this.courseDetailsStore.selectedHomework!.id, lectureHomework);
            const courseHomeworks = await getCoursesHomeworks(this.courseDetailsStore.selectedHomework!.courseId);
            let studentRateSummary = 0;
            for (const homework of courseHomeworks) {
                const studentToUpdate = homework.students.find(student => student.studentId === event.data.studentId);
                if (studentToUpdate) {
                    studentRateSummary = studentRateSummary + Number(studentToUpdate.rate);
                }
            }
            const resultToUpdate = {
                average_homework_score: `${studentRateSummary / courseHomeworks.length}`
            };
            await updateStudentExitResult(event.data.studentId, resultToUpdate);
            this.courseDetailsStore.selectLecture(this.courseDetailsStore.selectedHomework!.lectureId);
            this.courseDetailsStore.updatedGroupOrResult();
        }
    },
    components: { BaseTableEditable }
})
</script>

<style lang="scss">
.homework__container {
    @apply shadow-md bg-stone-50 border border-primary-300 rounded-md p-14 w-full mt-8;
}

.homework__header {
    @apply text-xl text-primary-700 mb-5 font-bold;
}
</style>