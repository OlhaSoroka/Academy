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
        :default-col-def="defaultColDef"
        @cellValueChanged="onCellEdit($event)"
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
      { field: "email" ,headerName: "Email", sortable: true, editable: false ,minWidth: 150, width:200 }
    ]
    }
    if (this.isAdmin ||this.isMentor) {
      this.columnDefs=[
      { field: "fullName",  headerName: "Name", sortable: true, editable: this.isAdmin , width:200},
      { field: "email" ,headerName: "Email", sortable: true, editable: false , width:200 },
      { field: "phone" ,headerName: "Phone", sortable: true, editable: this.isAdmin , width:200 },
      { field: "city" ,headerName: "City", sortable: true, editable: this.isAdmin , width:200 },
      { field: "age" ,headerName: "Age", sortable: true, editable: this.isAdmin , width:200 },
      { field: "education" ,headerName: "Education",  sortable: true, editable: this.isAdmin , width:250 },
      { field: "eng_level" ,headerName: "English level", sortable: true, editable: this.isAdmin , width:250 },
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

</style>
