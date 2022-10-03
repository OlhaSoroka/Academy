<template>
  <div style="overflow-x: auto">
    <table
      v-click-outside-table
      style="width: 100%"
      class="table"
    >
      <tr>
        <th>
          <div
            class="table_header_cell"
            :style="{ width: 100 + 'px' }"
          >
            Name
          </div>
        </th>
        <th
          v-for="(homework, homeworkIndex) in rowData[0].homework"
          :key="homeworkIndex"
          class="table_header"
          :class="{ 'table_header--solid': true }"
        >
          <div
            class="table_header_cell"
            :style="{ width: 30 + 'px' }"
          >
            {{ homework.name }}
          </div>
          <!-- <div
            class="table_header_cell"
            :style="{ width: 30 + 'px' }"
          >
            Link
          </div> -->
        </th>
      </tr>
      <tr
        v-for="(row, rowIndex) in rowData"
        :key="rowIndex"
        class="table_row"
      >
      <td>
        <div class="pointer-events-none p-2 text-ellipsis over"
              :style="{ width: 100 + 'px' }"
            >
              {{ row.students_name }}
            </div>
      </td>
        <td
          v-for="(homework, homeworkIndex) in row.homework"
          :key="homeworkIndex"
          class="table_row_item"
        >
          <div
            class="table_cell"
            @click="onCellClick(rowIndex, homeworkIndex, true)"
          >
            <input
              v-if="isCellActive(rowIndex, homeworkIndex)"
              ref="cellInput"
              class="table_cell_input"
              type="text"
              :value="homework.rate"
              @focusout="onFocusOut($event, rowIndex, homework.rate)"
              @keypress.enter="onEnterPress($event, rowIndex, homework.rate)"
            > 
            <div
              v-else
              class="pointer-events-none p-2 text-ellipsis over"
              :style="{ width: 30 + 'px' }"
            >
              {{ homework.rate}}
            </div>
          </div>
          <div
            class="table_cell"
            @click="onCellClick(rowIndex, homeworkIndex, true)"
          >
            <input
              v-if="isCellActive(rowIndex, homeworkIndex)"
              ref="cellInput"
              class="table_cell_input"
              type="text"
              :value="homework.link"
              @focusout="onFocusOut($event, rowIndex, homework.link)"
              @keypress.enter="onEnterPress($event, rowIndex, homework.link)"
            > 
            <div
              v-else
              class="pointer-events-none p-2 text-ellipsis over"
              :style="{ width: 30 + 'px' }"
            >
              {{ homework.link}}
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
    };
  },
  computed: {},
  methods: {
    onCellClick(rowIndex, columnIndex, isEditable) {
      if (isEditable) {
        this.activeCell = `${rowIndex}${columnIndex}`;
        setTimeout(() => {
          this.$refs.cellInput[0]?.focus();
        }, 50);
      }
    },
    isCellActive(rowIndex, columnIndex) {
      return this.activeCell === `${rowIndex}${columnIndex}`;
    },
    onClickOutside() {
      this.activeCell = null;
    },
    onFocusOut(event, rowIndex, field) {
      this.emitCellUpdate(event, rowIndex, field);
    },
    onEnterPress(event, rowIndex, field) {
      this.emitCellUpdate(event, rowIndex, field);
      this.activeCell = null;
    },
    emitCellUpdate(event, rowIndex, field) {
      const newValue = event.target.value;
      this.$emit("cellValueChanged", { newValue, rowIndex, field });
    },
  },
};
</script>
<style lang="scss" scoped>
.table {
  @apply border-2 border-slate-200 text-sm;
}
.table_header {
  @apply border-2 border-slate-200 text-primary-700;
}
.table_header--solid {
  @apply bg-primary-300 text-white;
}
.table_header_cell {
  @apply min-w-[120px] min-h-[50px] flex justify-center items-center;
}
.table_row {
  @apply hover:bg-primary-200 ;
}
.table_row_item {
  @apply border-b-2 border-slate-200 ;
}
.table_cell {
  @apply min-h-[50px] flex justify-center items-center;
}
.table_cell_input {
  @apply min-h-[50px] w-full block py-1 px-2 shadow border-2 rounded border-primary-400 focus-visible:outline-none;
}
.text-wrap {
  overflow-wrap: break-word;
}
</style>