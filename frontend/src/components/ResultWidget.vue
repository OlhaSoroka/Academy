<template>
  <div>
    <div class="flex justify-between">
      <div class="text-xl text-gray-700 mb-5">Result</div>
    </div>
    <div>
      <ag-grid-vue
        style="height: 400px"
        class="ag-theme-alpine"
        :column-defs="columnDefs"
        :row-data="rowData"
        :default-col-def="defaultColDef"
        @cellValueChanged="onCellEdit($event)"
      />
    </div>
  </div>
</template>
  
<script>
import { updateCourseById } from "@/api/course";
import { AgGridVue } from "ag-grid-vue";
export default {
  components: {
    AgGridVue,
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
      defaultColDef: {
        wrapHeaderText: true,
        autoHeaderHeight: true,
      },
    };
  },
  computed: {
    group() {
      return this.course.group;
    },
  },
  beforeMount() {
    this.columnDefs = [
      {
        headerName: "Income Results",
        children: [
          {
            field: "fullName",
            headerName: "Name",
            sortable: true,
            filter: true,
            editable: false,
            minWidth: 150,
            maxWidth: 250,
            resizable: true,
          },
          {
            field: "multiple_choice",
            headerName: "Multiple choice",
            sortable: true,
            filter: true,
            editable: true,
            width: 150,
          },
          {
            field: "tech_task",
            headerName: "Tech Task",
            sortable: true,
            filter: true,
            editable: true,
            width: 100,
          },
          {
            field: "start_total",
            headerName: "Total",
            sortable: true,
            filter: true,
            editable: false,
            width: 100,
          },
          {
            field: "eng_test",
            headerName: "English Test",
            sortable: true,
            filter: true,
            editable: true,
            width: 100,
          },
          {
            field: "middle_total",
            headerName: "Total",
            sortable: true,
            filter: true,
            editable: false,
            width: 100,
          },
          {
            field: "interview_result",
            headerName: "Interview Result",
            sortable: true,
            filter: true,
            editable: true,
            width: 150,
          },
          {
            field: "interviewer_comments",
            headerName: "Interviewer comments",
            sortable: true,
            filter: false,
            editable: true,
            minWidth: 200,
            maxWidth: 450,
            resizable: true,
          },
          {
            field: "hr_interviewer_comments",
            headerName: "HR interviewer comments",
            sortable: true,
            filter: false,
            editable: true,
            minWidth: 200,
            maxWidth: 450,
            resizable: true,
          },
        ],
      },
      {
        headerName: "Final Results",
        children: [
          {
            field: "average_homework_score",
            headerName: "Average homework score",
            sortable: true,
            filter: false,
            editable: true,
            width: 120,
          },
          {
            field: "mentor's_feedback",
            headerName: "Mentor's Feedback",
            sortable: true,
            filter: false,
            editable: true,
            minWidth: 200,
            maxWidth: 450,
            resizable: true,
          },
          {
            field: "exit_tech_interview",
            headerName: "Exit Tech interview",
            sortable: true,
            filter: false,
            editable: true,
            width: 120,
          },
          {
            field: "final_interviewer_comments",
            headerName: "Interviewer comments",
            sortable: true,
            filter: false,
            editable: true,
            minWidth: 200,
            maxWidth: 450,
            resizable: true,
          },
          {
            field: "final_hr_interviewer_comments",
            headerName: "HR Interviewer comment",
            sortable: true,
            filter: false,
            editable: true,
            minWidth: 200,
            maxWidth: 450,
            resizable: true,
          },
          {
            field: "final_english_interviewer_comments",
            headerName: "English Interviewer comment",
            sortable: true,
            filter: false,
            editable: true,
            minWidth: 200,
            maxWidth: 450,
            resizable: true,
          },
        ],
      },
    ];

    this.rowData = this.course.group;
  },
  methods: {
    async onCellEdit(event) {
      const updatedMember = this.group.find(
        (_, index) => index === event.rowIndex
      );
      updatedMember[event.colDef.field] = event.newValue;
      this.group.splice(event.rowIndex, 1, updatedMember);
      await updateCourseById(this.course.id, {
        ...this.course,
        group: this.group,
      });
    },
  },
};
</script>
  
  <style lang="scss">
@import "~ag-grid-community/styles/ag-grid.css";
@import "~ag-grid-community/styles/ag-theme-alpine.css";
.ag-theme-alpine {
  --ag-header-foreground-color: #308ee0;
}
.ag-header-cell-label {
  justify-content: center;
}

</style>
  