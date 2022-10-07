<template>
  <div>
    <div>
      <HomeworkTableEditable
        style="min-height: 400px"
        :column-defs="columnDefs"
        :row-data="rowData"
        @cellValueChanged="onCellEdit($event)"
        @headerValueChanged="onHeaderEdit($event)"
      />
    </div>
  </div>
</template>
  
<script>
import { updateCourseById } from "@/api/course";
import { ADMIN_ROLE, MENTOR_ROLE } from "@/constants/roles.constant";
import HomeworkTableEditable from "./HomeworkTableEditable.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    HomeworkTableEditable,
  },
  props: {
    course: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      columnDefs: null,
      rowData: null,
      originData: null,
      uniqIdentifier: "id"
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    homework_results() {
      return this.course.homework_results;
    },
    isAdmin() {
      return this.user.role === ADMIN_ROLE;
    },
    isMentor() {
      return this.user.role === MENTOR_ROLE;
    },
  },
  watch: {
    course() {
      this.rowData = this.course.homework_results;
    },
  },
  beforeMount() {
    this.columnDefs = [
      {
        field: "sudentName",
        headerName: "Name",
        sortable: true,
        editable: false,
        width: 150,
      },

      {
        field: "name",
        headerName: "HW1 date",
        sortable: true,
        editable: this.isAdmin,
        width: 100,
      },
      {
        field: "rate",
        headerName: "HW1 rate",
        sortable: true,
        editable: this.isAdmin,
        width: 100,
      },
      {
        field: "link",
        headerName: "HW1 link",
        sortable: true,
        editable: this.isAdmin,
        width: 100,
      },
    ];
    this.rowData = this.course.homework_results;
  },
  methods: {
    async onCellEdit(event) {
      let newCourseData = { ...this.course };
      let homeworkResult = newCourseData.homework_results[event.correctRowIndex];
      let homeworks = homeworkResult.homework;
      homeworks[event.homeworkIndex] = event.data;
      homeworkResult.total = homeworks.reduce(
        (previousValue, currentValue) => +previousValue + +currentValue.rate,
        0
      );
      newCourseData.results = this.recalculateAverageResult(newCourseData);
      await updateCourseById(this.course.id, newCourseData);
    },
    async onHeaderEdit(event) {
      let newCourseData = { ...this.course };
      let homeworkResult = newCourseData.homework_results;
      homeworkResult.forEach((element) => {
        element.homework[event.homeworkIndex].name = event.newValue;
      });
      await updateCourseById(this.course.id, newCourseData);
    },
    recalculateAverageResult(updatedCourse) {
      return updatedCourse.results.map((result, index) => {
        result.average_homework_score = (
          updatedCourse.homework_results[index].homework.reduce((acc, hw) => {
            return (acc += Number(hw.rate));
          }, 0) / updatedCourse.homework_results[index].homework.length
        ).toFixed(2);
        return result;
      });
    },
  },
};
</script>
