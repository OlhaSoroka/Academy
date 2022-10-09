<template>
  <div>
    <div class="flex justify-between">
      <div class="text-xl text-gray-700 mb-5">Homework</div>
    </div>
    <div>
      <BaseTableEditable
        style="min-height: 400px"
        :column-defs="columnDefs"
        :row-data="rowData"
        uniq-identifier="email"
        @cellValueChanged="onCellEdit($event)"
      />
    </div>
  </div>
</template>
<script>
import BaseTableEditable from "./BaseTableEditable.vue";
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
  beforeMount() {
    this.columnDefs = [
      {
        field: "name",
        headerName: "Name",
        sortable: false,
        editable: false,
        width: 200,
      },
      {
        field: "date",
        headerName: "Date",
        sortable: false,
        editable: false,
        width: 150,
      },
    ];
	console.log(this.course);
	this.rowData = this.course.homework_results[0]?.homework;
  },
  
};
</script>
