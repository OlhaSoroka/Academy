<template>
  <div style="overflow-x: auto">
    <table
      style="width: 100%"
      class="border-2 border-slate-200 text-sm"
    >
      <tr> 
        <th
          v-for="column in columnDefs"
          :key="column.field"
          class="border-2 border-slate-200 text-primary-700"
          :class="{ 'bg-primary-300 text-white': column.solid }"
        >
          <div
            class="min-w-[120px] min-h-[50px] flex justify-center items-center "
            :style="{ width: column.width + 'px' }"
          >
            {{ column.headerName }}
          </div>
        </th>
      </tr>
      <tr
        v-for="(row, rowIndex) in rowData"
        :key="rowIndex"
        class="hover:bg-primary-200"
      >
        <td
          v-for="(column, columnIndex) in columnDefs"
          :key="column.field"
          class="border-b-2 border-slate-200"
        >
          <div
            
            class="min-h-[50px] flex justify-center items-center"
            @click="onCellClick(rowIndex, columnIndex, column.editable)"
          >
            <input
              v-if="isCellActive(rowIndex, columnIndex)"
              class="min-h-[50px] w-full block py-1 px-2 shadow border-2 rounded border-primary-400 focus-visible:outline-none"
              type="text"
              :value="row[column.field]"
            >
            <div
              v-else
            >
              {{ row[column.field] }}
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    columnDefs: {
      type: Array,
      default: null,
    },
    rowData: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      activeCell: null,
    }
  },
  computed: {

  },
  methods: {
    onCellClick(rowIndex, columnIndex, isEditable) {
      if (isEditable) {
        this.activeCell = `${rowIndex}${columnIndex}`;
      }
    },
    isCellActive(rowIndex, columnIndex) {
      return this.activeCell === `${rowIndex}${columnIndex}`;
    }
  }
};
</script>
<style lang="scss" scoped>

</style>