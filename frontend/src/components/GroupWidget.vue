<template>
  <div>
    <div class="flex justify-between">
      <div class="text-xl text-gray-700 mb-5">
        Group
      </div>
    </div>
    <div>
      <BaseTableEditable
        style="height: 400px;"
        :column-defs="columnDefs"
        :row-data="rowData"
        uniq-identifier="email"
        @cellValueChanged="onCellEdit($event)"
        @headerNameChanged="onHeaderEdit($event)"
      />
    </div>
  </div> 
</template>

<script>
import { updateCourseById } from "@/api/course";
import { ADMIN_ROLE, MENTOR_ROLE, STUDENTS_ROLE } from "@/constants/roles.constant";
import BaseTableEditable from "./BaseTableEditable.vue";
import { mapGetters } from 'vuex';
export default {
  components: {
    BaseTableEditable
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
      uniqIdentifier: "email"
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
      { field: "fullName",  headerName: "Name", sortable: true, editable: this.isAdmin ,width:200 },
      { field: "email" ,headerName: "Email", sortable: true, editable: false ,minWidth: 150, width:20 }
    ]
    }
    if (this.isAdmin ||this.isMentor) {
      this.columnDefs=[
      { field: "fullName",  headerName: "Name", headerEditable: false, sortable: true, editable: this.isAdmin , width:200},
      { field: "email" ,headerName: "Email", headerEditable: false, sortable: true, editable: false , width:250 },
      { field: "phone" ,headerName: "Phone", headerEditable: false, sortable: false, editable: this.isAdmin , width:200 },
      { field: "city" ,headerName: "City",headerEditable: false, sortable: true, editable: this.isAdmin , width:200 },
      { field: "age" ,headerName: "Age", headerEditable: false, sortable: true, editable: this.isAdmin , width:100 },
      { field: "education" ,headerName: "Education", headerEditable: true, sortable: false, editable: this.isAdmin , width:250 },
      { field: "eng_level" ,headerName: "English level", headerEditable: false, sortable: true, editable: this.isAdmin , width:250 },
      ]
    } 
    this.rowData = this.course.group;
  },
  methods: {
    async onCellEdit(event) {
      const updatedMember = this.group.find((item) => item[this.uniqIdentifier] === event.uniqIdentifier);
      const updateIndex = this.group.findIndex((item) => item[this.uniqIdentifier] === event.uniqIdentifier);
      updatedMember[event.colDef.field] = event.newValue;
      this.group.splice(updateIndex, 1, updatedMember);
      this.rowData = this.group;
      await updateCourseById(this.course.id, {...this.course, group: this.group});
    },
    async onHeaderEdit(event) {
      // Handle header edit logic here
      // Remove after demo:
      this.columnDefs = this.columnDefs.map(column => { 
          if (column.field === event.field) {
            column.headerName = event.newHeaderName;
            return column
          }
          return column
        })
    }
  }
};
</script>

<style lang="scss">

</style>
