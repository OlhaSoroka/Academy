<template>
    <div class="homework__container">
        <div class="flex align-middle justify-between">
            <div class="homework__header flex">
                <div>{{ lecture }}</div>
                <div v-if="courseDetailsStore.homeworkWidgetLoading">...Loading...</div>
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
import { updateStudentResult } from '../../api/results';
import { useCourseDetailsStore } from '../../store/course-details.store';
import BaseTableEditable from '../baseComponents/BaseTableEditable.vue';
export default defineComponent({
    data() {
        return {
            uniqIdentifier: "id",
            columnDefs: [
                { field: "student", headerName: "Student", sortable: true, editable: true, width: 300 },
                { field: "rate", headerName: "Rate", sortable: true, editable: true, width: 160 },
                { field: "link", headerName: "Link", sortable: true, editable: true, width: 300 },
                { field: "comment", headerName: "Comment", sortable: true, editable: true, width: 300 },
                { field: "date", headerName: "Completion date", sortable: true, editable: true, width: 300, date: true },
            ]
        };
    },
    computed: {
        ...mapStores(useCourseDetailsStore),
        students(): StudentHomework[] {
            return this.courseDetailsStore.selectedHomework!.students;
        },
        lecture(): string {
            return this.courseDetailsStore.selectedHomework!.lecture!;
        },

    },
    methods: {
        async onCellEdit(event: {
            uniqIdentifier: string;
            data: StudentHomework;
        }) {
            // TODO: move this method to store
            const homeworkToUpdate = {
                id: this.courseDetailsStore.selectedHomework!.id,
                courseId: this.courseDetailsStore.selectedHomework!.courseId,
                lectureId: this.courseDetailsStore.selectedHomework!.lectureId,
                students: this.courseDetailsStore.selectedHomework!.students.map((student) => {
                    if (student.studentId === event.data.studentId) {
                        return event.data
                    }
                    return student
                }),
                asObject() {
                    return { ...this } as any
                }
            }
            await updateHomeworkById(this.courseDetailsStore.selectedHomework!.id, homeworkToUpdate);
            const courseHomeworks = await getCoursesHomeworks(this.courseDetailsStore.selectedHomework!.courseId);
            let studentRateSummary = 0;
            for (const homework of courseHomeworks) {
                const studentToUpdate = homework.students.find(student => student.studentId === event.data.studentId);
                if (studentToUpdate) {
                    studentRateSummary = studentRateSummary + Number(studentToUpdate.rate);
                }
            }
            const resultToUpdate = {
                average_homework_score: `${studentRateSummary/courseHomeworks.length}`
            };
            await updateStudentResult(event.data.studentId, resultToUpdate);
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