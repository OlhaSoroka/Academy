<template>
  <div style="overflow-x: auto">
    <table
      style="width: 100%"
      class="table"
    >
      <tr>
        <th
          v-for="column in columnDefs"
          :key="column.field"
          class="table_header"
          :class="{ 'table_header--solid': column.solid }"
        >
          <div
            class="table_header_cell"
            :style="{ width: column.width + 'px' }"
          >
            <input
              v-if="isHederActive(column)"
              ref="headerInput"
              type="text"
              class="table_cell_input"
              :value="column.headerName"
              @focusout="onHeaderFocusOut($event, column.field)"
              @keypress.enter="onHeaderEnterPress($event, column.field)"
            >
            <div
              v-else
              class="flex"
            >
              <div
                :class="column.sortable && 'cursor-pointer'"
                class="flex"
              >
                <div
                  class="p-1"
                  @click="sortByColumn(column)"
                >
                  {{ column.headerName }}
                </div>
                <div v-if="column.headerEditable">
                  <div
                    class="p-1"
                    @click="onHeaderEdit(column)"
                  >
                    <BaseEditIcon />
                  </div>
                </div>
                <div v-if="sortBy === column.field">
                  <span v-if="activeSort === 'asc'"><BaseArrowDown /></span>
                  <span
                    v-if="activeSort === 'desc'"
                    class="rotate-180"
                  ><BaseArrowUp /></span>
                </div>
              </div>
            </div>
          </div>
        </th>
      </tr>
      <tr
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        class="table_row"
      >
        <td
          v-for="(column, columnIndex) in columnDefs"
          :key="column.field"
          class="table_row_item"
        >
          <div
            class="table_cell"
            :class="column.editable && 'cursor-pointer'"
            @click="onCellClick(rowIndex, columnIndex, column.editable)"
          >
            <input
              v-if="isCellActive(rowIndex, columnIndex)"
              ref="cellInput"
              class="table_cell_input"
              type="text"
              :value="row[column.field]"
              @focusout="onFocusOut($event, row, column.field)"
              @keypress.enter="onEnterPress($event, row, column.field)"
            >
            <div
              v-else
              class="pointer-events-none p-2 text-ellipsis over"
              :style="{ width: column.width + 'px' }"
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
import BaseArrowDown from "../components/BaseComponents/BaseIcons/BaseArrowDown.vue";
import BaseArrowUp from "../components/BaseComponents/BaseIcons/BaseArrowUp.vue";
import BaseEditIcon from "../components/BaseComponents/BaseIcons/BaseEditIcon.vue";
export default {
  components: {
    BaseArrowDown,
    BaseArrowUp,
    BaseEditIcon,
  },
  props: {
    columnDefs: {
      type: Array,
      default: null,
    },
    rowData: {
      type: Array,
      default: null,
    },
    uniqIdentifier: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      activeCell: null,
      activeSort: null,
      sortBy: null,
      rows: [],
      activeHeader: null,
    };
  },
  watch: {
    rowData() {
      this.rows = [...this.rowData];
      this.rows.sort(this.compare);
    },
  },
  beforeMount() {
    this.rows = [...this.rowData];
  },
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
    onFocusOut(event, row, field) {
      this.emitCellUpdate(event, row, field);
      this.activeCell = null;
    },
    onEnterPress(event, row, field) {
      this.emitCellUpdate(event, row, field);
      this.activeCell = null;
    },
    emitCellUpdate(event, row, field) {
      const newValue = event.target.value;
      this.$emit("cellValueChanged", {
        newValue,
        uniqIdentifier: row[this.uniqIdentifier],
        colDef: { field },
      });
    },
    sortByColumn(column) {
      if (column.sortable) {
        this.setNextSort(column.field);
        this.rows.sort(this.compare);
      }
    },
    onHeaderEdit(column) {
      this.activeHeader = column.field;
      setTimeout(() => {
          this.$refs.headerInput[0]?.focus();
        }, 50);
    },
    isHederActive(column) {
      return this.activeHeader === column.field;
    },
    onHeaderFocusOut(event, field) {
      this.emitHeaderUpdate(event, field);
      this.activeHeader = null;
    },
    onHeaderEnterPress(event, field) {
      this.emitHeaderUpdate(event, field);
      this.activeHeader = null;
    },
    emitHeaderUpdate(event, field) {
      const newHeaderName = event.target.value;
      this.$emit("headerNameChanged", {
        newHeaderName,
        field,
      });
    },
    setNextSort(field) {
      if (field !== this.sortBy) {
        this.activeSort = null;
      }
      this.sortBy = field;

      if (this.activeSort === "asc") {
        this.activeSort = "desc";
        return;
      }
      if (this.activeSort === "desc") {
        this.activeSort = null;
        return;
      }
      if (this.activeSort === null) {
        this.activeSort = "asc";
        return;
      }
    },
    isNumber(value) {
      return parseInt(value) ? +value : value;
    },
    compare(a, b) {
      if (this.activeSort === "asc") {
        if (this.isNumber(a[this.sortBy]) > this.isNumber(b[this.sortBy])) {
          return -1;
        }
        if (this.isNumber(b[this.sortBy]) > this.isNumber(a[this.sortBy])) {
          return 1;
        }
      }
      if (this.activeSort === "desc") {
        if (this.isNumber(a[this.sortBy]) < this.isNumber(b[this.sortBy])) {
          return -1;
        }
        if (this.isNumber(b[this.sortBy]) < this.isNumber(a[this.sortBy])) {
          return 1;
        }
      }
      if (this.activeSort === null) {
        this.rows = [...this.rowData];
      }
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
  @apply hover:bg-primary-200;
}
.table_row_item {
  @apply border-b-2 border-slate-200;
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