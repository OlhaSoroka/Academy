<template>
  <div>
    <div class="flex justify-between">
      <div class="text-xl text-gray-700 mb-5">
        Group
      </div>
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
        field: "fullName",
        headerName: "Fullname",
        sortable: true,
        editable: false,
        width: 200,
      },
      {
        field: "email",
        headerName: "Email",
        sortable: true,
        editable: this.isAdmin,
        width: 150,
      },
    ];
	this.rowData = this.course.group;
  },
};
</script>
  