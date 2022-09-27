<template>
  <div>
    <div class="flex justify-between">
      <div class="text-xl text-gray-700 mb-5">Results</div>
    </div>
    <div>
      <BaseTableEditable
        style="height: 400px"
        :column-defs="columnDefs"
        :row-data="rowData"
        @cellValueChanged="onCellEdit($event)"
      />
    </div>
  </div>
</template>
  
<script>
import { updateCourseById } from "@/api/course";
import { ADMIN_ROLE, MENTOR_ROLE } from "@/constants/roles.constant";
import BaseTableEditable from "./BaseTableEditable.vue";
import { mapGetters } from 'vuex';

export default {
  components: {
    BaseTableEditable, 
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
    };
  },
  computed: {
    ...mapGetters('user', ['user']),
    results() {
      return this.course.results;
    },
    isAdmin() {
      return this.user.role === ADMIN_ROLE
    },
    isMentor() {
      return this.user.role === MENTOR_ROLE
    }
  },
  watch: {
    course() {
      this.rowData = this.course.results;
    }
  },
  beforeMount() {
    this.columnDefs = [
    {
            field: "fullName",
            headerName: "Name",
            sortable: true,
            editable: false,
            width: 150,
          },
          {
            field: "multiple_choice",
            headerName: "Multiple choice",
            sortable: true,
            editable: this.isAdmin,
            width: 150,
          },
          {
            field: "tech_task",
            headerName: "Tech Task",
            sortable: true,
            editable: this.isAdmin,
            width: 100,
          },
          {
            field: "start_total",
            headerName: "Total",
            sortable: true,
            editable: false,
            width: 100,
            solid: true
          },
          {
            field: "eng_test",
            headerName: "English Test",
            sortable: true,
            editable: this.isAdmin,
            width: 100,
          },
          {
            field: "middle_total",
            headerName: "Total",
            sortable: true,
            editable: false, 
            width: 100,
            solid: true
          },
          {
            field: "interview_result",
            headerName: "Interview Result",
            sortable: true,
            editable: this.isAdmin|| this.isMentor,
            width: 150,
          },
          {
            field: "interviewer_comments",
            headerName: "Interviewer comments",
            sortable: true,
            editable: this.isAdmin|| this.isMentor,
            width: 250,
          },
          {
            field: "hr_interviewer_comments",
            headerName: "HR interviewer comments",
            sortable: true,
            editable:  this.isAdmin,
            width: 250,
          },
          {
            field: "average_homework_score",
            headerName: "Average homework score",
            sortable: true,
            editable: false,
            width: 120,
          },
          {
            field: "mentors_feedback",
            headerName: "Mentor's Feedback",
            sortable: true,
            editable: this.isAdmin|| this.isMentor,
            width: 250,
          },
          {
            field: "exit_tech_interview",
            headerName: "Exit Tech interview",
            sortable: true,
            editable: this.isAdmin|| this.isMentor,
            width: 120,
          },
          {
            field: "final_interviewer_comments",
            headerName: "Interviewer comments",
            sortable: true,
            editable: this.isAdmin|| this.isMentor,
            width: 250,
          },
          {
            field: "final_hr_interviewer_comments",
            headerName: "HR Interviewer comment",
            sortable: true,
            editable: this.isAdmin,
            width: 250,

          },
          {
            field: "final_english_interviewer_comments",
            headerName: "English Interviewer comment",
            sortable: true,
            editable: this.isAdmin,
            width: 250,           
          },
    ];
    this.rowData = this.course.results;
  },
  methods: {
    async onCellEdit(event) {
      const updatedMember = this.results.find(
        (_, index) => index === event.rowIndex
      );
      updatedMember[event.colDef.field] = event.newValue;

      updatedMember.start_total = +updatedMember.multiple_choice + +updatedMember.tech_task;
      updatedMember.middle_total = +updatedMember.start_total + +updatedMember.eng_test;

      this.results.splice(event.rowIndex, 1, updatedMember);
      this.rowData =  this.results;
      await updateCourseById(this.course.id, {
        ...this.course,
        results: this.results,
      });
    },
  },
};
</script>
  
  <style lang="scss">

.total-col {
  background-color: #aecde9!important;
  color: white !important;
}

</style>
  