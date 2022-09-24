<template>
  <div>
    <div class="flex justify-between">
      <div class="text-xl text-gray-700 mb-5">
        Group
      </div>
    </div>
    <div>
      <ag-grid-vue
        style="height: 400px;"
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
import { ADMIN_ROLE, MENTOR_ROLE, STUDENTS_ROLE } from "@/constants/roles.constant";
import { AgGridVue } from "ag-grid-vue";
import { mapGetters } from 'vuex';
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
        suppressMovable: true
      },
    };
  },
  computed: {
    ...mapGetters('user', ['user']),
    group() {
      return this.course.group;
    },
    isAdmin() {
      return this.user.role === ADMIN_ROLE
    },
    isMentor() {
      return this.user.role === MENTOR_ROLE
    },
    isStudent() {
      return this.user.role === STUDENTS_ROLE
    }
  },
  watch: {
    course() {
      this.rowData = this.course.group;
    }
  },
  beforeMount() {
    if (this.isStudent) {
      this.columnDefs = [
      { field: "fullName",  headerName: "Name", sortable: true, filter: true, editable: false ,minWidth: 150, maxWidth: 250, resizable: true},
      { field: "email" ,headerName: "Email", sortable: false, filter: true, editable: false ,minWidth: 150, maxWidth: 250 ,resizable: true}
    ]
    }
    if (this.isAdmin ||this.isMentor) {
      this.columnDefs=[
      { field: "fullName",  headerName: "Name", sortable: true, filter: true, editable: false ,minWidth: 150, maxWidth: 250, resizable: true},
      { field: "email" ,headerName: "Email", sortable: false, filter: true, editable: false ,minWidth: 150, maxWidth: 250 ,resizable: true},
      { field: "phone" ,headerName: "Phone", sortable: false, filter: true, editable: this.isAdmin ,minWidth: 100, maxWidth: 200 ,resizable: true},
      { field: "city" ,headerName: "City", sortable: true, filter: true, editable: this.isAdmin ,minWidth: 100, maxWidth: 200, resizable: true},
      { field: "age" ,headerName: "Age", sortable: false, filter: true, editable: this.isAdmin ,minWidth: 100, maxWidth: 200 ,resizable: true},
      { field: "education" ,headerName: "Education", sortable: true, filter: this.isAdmin, editable: true ,minWidth: 330, maxWidth: 450, resizable: true},
      { field: "eng_level" ,headerName: "English level", sortable: true, filter: true, editable: this.isAdmin ,minWidth: 200, maxWidth: 300 ,resizable: true},
      ]
    }
    this.rowData = this.course.group;
  },
  methods: {
    async onCellEdit(event) {
      const updatedMember = this.group.find((_, index) => index === event.rowIndex);
      updatedMember[event.colDef.field] = event.newValue;
      this.group.splice(event.rowIndex, 1, updatedMember);
      this.rowData = this.group;
      await updateCourseById(this.course.id, {...this.course, group: this.group});
    }
  }
};
</script>

<style lang="scss">
@import "~ag-grid-community/styles/ag-grid.css";
@import "~ag-grid-community/styles/ag-theme-alpine.css";
.ag-theme-alpine {
  --ag-header-foreground-color:#308ee0;
}
.ag-header-cell-label {
   justify-content: center;
}
</style>
