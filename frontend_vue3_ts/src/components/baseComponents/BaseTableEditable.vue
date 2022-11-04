<template>
  <div style="overflow-x: auto">
    <table style="width: 100%" class="table">
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
            />
            <div v-else class="flex">
              <div :class="column.sortable && 'cursor-pointer'" class="flex">
                <div class="p-1" @click="sortByColumn(column)">
                  {{ column.headerName }}
                </div>
                <div v-if="column.headerEditable">
                  <div class="p-1" @click="onHeaderEdit(column)">
                    <BaseEditIcon />
                  </div>
                </div>
                <div v-if="sortBy === column.field">
                  <span v-if="activeSort === 'asc'"><BaseArrowDown /></span>
                  <span v-if="activeSort === 'desc'" class="rotate-180"
                    ><BaseArrowUp
                  /></span>
                </div>
              </div>
            </div>
          </div>
        </th>
      </tr>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="table_row">
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
            />
            <div
              v-else
              class="over text-ellipsis p-2"
              :class="!column.link && 'pointer-events-none'"
              :style="{ width: column.width + 'px' }"
            >
              <a v-if="column.link" :href="row[column.field]">{{
                row[column.field]
              }}</a>
              <div v-else>
                {{ row[column.field] }}
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
/* import BaseArrowDown from "../components/BaseComponents/BaseIcons/BaseArrowDown.vue";
import BaseArrowUp from "../components/BaseComponents/BaseIcons/BaseArrowUp.vue";
import BaseEditIcon from "../components/BaseComponents/BaseIcons/BaseEditIcon.vue"; */
import { defineComponent, ref } from "vue";
import { PropType } from "vue";

interface IColumnDefs{
  field: string,
  headerName: string,
  headerEditable?: boolean,
  sortable: boolean,
  editable: boolean,
  width:number,
  solid?: boolean,
  link?: string
}

interface IRowData {
    [key: string]: string
}

const cellInput = ref<Array<HTMLInputElement> | null>(null)

export default defineComponent({
  components: {
/*     BaseArrowDown,
    BaseArrowUp,
    BaseEditIcon, */
  },
  props: {
    columnDefs: {
      type: Array as PropType<IColumnDefs[]> | null,
      default: null,
    },
    rowData: {
      type: Array as PropType<IRowData[]> | null,
      default: null,
    },
    uniqIdentifier: {
      type: String || null,
      default: null,
    },
  },
  data() {
    return {
      activeCell: null as String | null,
      activeSort: null as String | null,
      sortBy: "" as String,
      rows: [] as IRowData[],
      activeHeader: null as String | null,
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
    onCellClick(rowIndex:number, columnIndex:number, isEditable:boolean) {
      if (isEditable) {
        this.activeCell = `${rowIndex}${columnIndex}`;
        const cellInput = ref();
        const focusInput = () => {
           return cellInput.value.focus()
        }
        setTimeout(() => {
          focusInput}, 50);
      }
    },
    isCellActive(rowIndex:number, columnIndex:number) {
      return this.activeCell === `${rowIndex}${columnIndex}`;
    },
    onFocusOut(event:any, row:IRowData, field:string) {
      this.emitCellUpdate(event, row, field);
      this.activeCell = null;
    },
    onEnterPress(event:any, row:IRowData, field:string) {
      this.emitCellUpdate(event, row, field);
      this.activeCell = null;
    },
    emitCellUpdate(event:any, row:IRowData, field:string) {
      const newValue = event.target.value;
      this.$emit("cellValueChanged", {
        newValue,
        uniqIdentifier: row[this.uniqIdentifier],
        colDef: { field },
      });
    },
    sortByColumn(column:IColumnDefs) {
      if (column.sortable) {
        this.setNextSort(column.field);
        this.rows.sort(this.compare);
      }
    },
    onHeaderEdit(column:IColumnDefs) {
      this.activeHeader = column.field;
      setTimeout(() => {
          this.$refs.headerInput[0]?.focus();
        }, 50);
    },
    isHederActive(column:IColumnDefs) {
      return this.activeHeader === column.field;
    },
    onHeaderFocusOut(event:any, field:string) {
      this.emitHeaderUpdate(event, field);
      this.activeHeader = null;
    },
    onHeaderEnterPress(event:any, field:string) {
      this.emitHeaderUpdate(event, field);
      this.activeHeader = null;
    },
    emitHeaderUpdate(event:any, field:string) {
      const newHeaderName = event.target.value;
      this.$emit("headerNameChanged", {
        newHeaderName,
        field,
      });
    },
    setNextSort(field:string) {
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
    isNumber(value:string | number) {
      return typeof value === 'number';
    },
    compare(a:IRowData, b:IRowData):number {
      if (this.activeSort === "asc") {
        if (this.isNumber(a[`${this.sortBy}`]) > this.isNumber(b[`${this.sortBy}`])) {
          return -1;
        }
        if (this.isNumber(b[`${this.sortBy}`]) > this.isNumber(a[`${this.sortBy}`])) {
          return 1;
        }
      }
      if (this.activeSort === "desc") {
        if (this.isNumber(a[`${this.sortBy}`]) < this.isNumber(b[`${this.sortBy}`])) {
          return -1;
        }
        if (this.isNumber(b[`${this.sortBy}`]) < this.isNumber(a[`${this.sortBy}`])) {
          return 1;
        }
      }
      if (this.activeSort === null) {
        this.rows = [...this.rowData];
      }
      return 0
    },
  },
});
</script>
<style lang="postcss" scoped>
.table {
  @apply border-2 border-slate-200 text-sm;
}
.table_header {
  @apply border-2 border-slate-200 text-center text-primary-700;
}
.table_header--solid {
  @apply bg-primary-300 text-white;
}
.table_header_cell {
  @apply m-auto flex min-h-[50px] min-w-[120px] items-center justify-center;
}
.table_row {
  @apply hover:bg-primary-200;
}
.table_row_item {
  @apply border-b-2 border-slate-200;
}
.table_cell {
  @apply flex min-h-[50px] items-center justify-center text-center;
}
.table_cell_input {
  @apply block min-h-[50px] w-full rounded border-2 border-primary-400 py-1 px-2 shadow focus-visible:outline-none;
}
.text-wrap {
  overflow-wrap: break-word;
}
</style>
