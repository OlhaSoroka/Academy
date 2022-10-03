<template>
  <div>
    <div class="flex justify-between">
      <div class="text-xl text-gray-700 mb-5">Homework</div>
    </div>
    <div>
      <HomeworkTableEditable
        style="min-height: 400px"
        :column-defs="columnDefs"
        :row-data="rowData"
        @cellValueChanged="onCellEdit($event)"
      />
    </div>
  </div>
</template>
  
<script>/* 
import { updateCourseById } from "@/api/course"; */
import { ADMIN_ROLE, MENTOR_ROLE } from "@/constants/roles.constant";
import HomeworkTableEditable from "./HomeworkTableEditable.vue";
import { mapGetters } from 'vuex';

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
    };
  },
  computed: {
    ...mapGetters('user', ['user']),
    homework_results() {
      return this.course.homework_results;
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
      this.rowData = this.course.homework_results;
    }
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
    ]
    this.rowData = this.course.homework_results;
  },
  methods: {
    async onCellEdit(event) {
      const updatedMember = this.homework_results[event.rowIndex].homework/* .find(
        (_, index) => index === event.rowIndex
      ); */
      console.log(updatedMember)
      updatedMember[event.field] = event.newValue;
      /* updatedMember.start_total = +updatedMember.multiple_choice + +updatedMember.tech_task;
      updatedMember.middle_total = +updatedMember.start_total + +updatedMember.eng_test; */

      /* this.homework_results.splice(event.rowIndex, 1, updatedMember);
      this.rowData =  this.homework_results;
      await updateCourseById(this.course.id, {
        ...this.course,
        homework_results: this.homework_results,
      }); */
    },
  },
  homeworkName(){
    return this.course.homework_results.homework[0].name
  }
};
</script>
  
  <style lang="scss">

.total-col {
  background-color: #aecde9!important;
  color: white !important;
}

</style>
  