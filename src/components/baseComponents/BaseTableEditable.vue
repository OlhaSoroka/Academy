<template>
  <div v-if="rows.length === 0" class="w-full flex justify-center">
    <div>No data...</div>
  </div>
  <div v-else style="overflow-x: auto">
    <table style="width: 100%" class="table">
      <tr>
        <th v-for="column in columnDefs" :key="column.field" class="table_header"
          :class="{ 'table_header--solid': column.solid }">
          <div class="table_header_cell" :style="{ width: column.width + 'px' }">
            <input v-if="isHederActive(column)" v-focus type="text" class="table_cell_input" :value="column.headerName"
              @focusout="onHeaderFocusOut($event, column.field)"
              @keypress.enter="onHeaderEnterPress($event, column.field)" />
            <div v-else class="flex">
              <div :class="column.sortable && 'cursor-pointer'" class="flex">
                <div class="p-1" @click="sortByColumn(column)">
                  {{ column.headerName }}
                </div>
                <div v-if="column.headerEditable">
                  <div class="p-1" @click="onHeaderEdit(column)">
                    <EditIcon />
                  </div>
                </div>
                <div v-if="sortBy === column.field">
                  <span v-if="activeSort === 'asc'">
                    <ArrowDownIcon />
                  </span>
                  <span v-if="activeSort === 'desc'" class="rotate-180">
                    <ArrowUpIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </th>
      </tr>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="table_row">
        <td v-for="(column, columnIndex) in columnDefs" :key="column.field" class="table_row_item">
          <div v-if="!column.actionColumn" class="table_cell" :class="column.editable && 'cursor-pointer'"
            @click="onCellClick(rowIndex, columnIndex, column.editable)">
            <input v-if="isCellActive(rowIndex, columnIndex) && !column.dropdown" v-focus class="table_cell_input"
              :type="column.date ? 'date' : 'text'" :value="row[column.field]"
              @focusout="onFocusOut($event, row, column.field)"
              @keypress.enter="onEnterPress($event, row, column.field)" />
            <div v-if="!isCellActive(rowIndex, columnIndex)" class="over text-ellipsis p-2"
              :class="!column.link && 'pointer-events-none'" :style="{ width: column.width + 'px' }">
              <a v-if="column.link" :href="row[column.field]">{{
                  row[column.field]
              }}</a>
              <div v-else>
                {{ row[column.field] }}
              </div>
            </div>
            <div class="w-full h-[50px]" v-if="isCellActive(rowIndex, columnIndex) && column.dropdown">
              <select class="w-full h-full" @focusout="onFocusOut($event, row, column.field)"
                @keypress.enter="onEnterPress($event, row, column.field)">
                <option v-for="option in column.options" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
          <div class="table_cell" v-else>
            <div v-if="column.homework">
              <BaseButton @click="onCellClick(rowIndex, columnIndex, column.editable)" variant="btn_blue_outlined">
                <HomeworkIcon />
              </BaseButton>
            </div>
            <div v-if="column.delete" class="ml-1">
              <BaseButton @click="onDeleteRow(rowIndex)" variant="btn_blue_outlined">
                <DeleteIcon />
              </BaseButton>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import ArrowDownIcon from "../baseComponents/icons/ArrowDownIcon.vue";
import ArrowUpIcon from "../baseComponents/icons/ArrowUpIcon.vue";
import EditIcon from "../baseComponents/icons/EditIcon.vue";
import { defineComponent } from "vue";
import { PropType } from "vue";
import BaseButton from "./BaseButton.vue";
import { SelectItem } from "../../models/options.model";
import DeleteIcon from "./icons/DeleteIcon.vue";
import HomeworkIcon from "./icons/HomeworkIcon.vue"

interface IColumnDefs {
  field: string,
  headerName: string,
  headerEditable?: boolean,
  sortable: boolean,
  editable: boolean,
  width: number,
  solid?: boolean,
  link?: string,
  date?: boolean,
  actionColumn?: boolean;
  delete?: boolean;
  homework?: boolean;
  dropdown?: boolean;
  options?: SelectItem[]
}

export default defineComponent({
  components: {
    ArrowDownIcon,
    ArrowUpIcon,
    EditIcon,
    BaseButton,
    DeleteIcon,
    HomeworkIcon
  },
  props: {
    columnDefs: {
      type: Array as PropType<IColumnDefs[]> | null,
      default: null,
    },
    rowData: {
      type: Array as PropType<any[]> | null,
      default: [],
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
      rows: [] as any[],
      activeHeader: null as String | null,
      isUpdateProcessing: false
    };
  },
  watch: {
    rowData() {
      this.rows = [...this.rowData];
      this.rows.sort(this.compare);
    },
  },
  mounted() {
    this.rows = [...this.rowData];
  },
  directives: {
    focus: {
      mounted: (el) => el.focus()
    }
  },
  methods: {
    onCellClick(rowIndex: number, columnIndex: number, isEditable: boolean) {
      if (isEditable) {
        this.activeCell = `${rowIndex}${columnIndex}`;
        return
      }
      this.$emit('rowClick', this.rows[rowIndex][this.uniqIdentifier])
    },
    onDeleteRow(rowIndex: number) {
      console.log({ rowIndex });

      this.$emit('deleteRow', this.rows[rowIndex][this.uniqIdentifier])
    },
    isCellActive(rowIndex: number, columnIndex: number) {
      return this.activeCell === `${rowIndex}${columnIndex}`;
    },
    onFocusOut(event: any, row: any, field: string) {
      if (this.isUpdateProcessing) {
        return
      }
      this.isUpdateProcessing = true;
      this.emitCellUpdate(event, row, field);
      this.activeCell = null;
    },
    onEnterPress(event: any, row: any, field: string) {
      if (this.isUpdateProcessing) {
        return
      }
      this.isUpdateProcessing = true;
      this.emitCellUpdate(event, row, field);
      this.activeCell = null;
    },
    emitCellUpdate(event: any, row: any, field: string) {
      const newValue = event.target.value;
      const oldValue = row[field];
      if (newValue !== oldValue) {
        this.$emit("cellValueChanged", {
          newValue,
          uniqIdentifier: row[this.uniqIdentifier],
          colDef: { field },
          data: {
            ...row,
            [field]: newValue
          }
        });
      }
      setTimeout(() => { this.isUpdateProcessing = false }, 50)
    },
    sortByColumn(column: IColumnDefs) {
      if (column.sortable) {
        this.setNextSort(column.field);
        this.rows.sort(this.compare);
      }
    },
    onHeaderEdit(column: IColumnDefs) {
      this.activeHeader = column.field;
    },
    isHederActive(column: IColumnDefs) {
      return this.activeHeader === column.field;
    },
    onHeaderFocusOut(event: any, field: string) {
      this.emitHeaderUpdate(event, field);
      this.activeHeader = null;
    },
    onHeaderEnterPress(event: any, field: string) {
      this.emitHeaderUpdate(event, field);
      this.activeHeader = null;
    },
    emitHeaderUpdate(event: any, field: string) {
      const newHeaderName = event.target.value;
      this.$emit("headerNameChanged", {
        newHeaderName,
        field,
      });
    },
    setNextSort(field: string) {
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
    /*     isNumber(value:string) {
          return parseInt(value, 10) ? +value : value;
        }, */
    isNumber(value: string | number) {
      if (+value == value) {
        return +value
      } else return value;
    },
    compare(a: any, b: any): number {
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
      if (typeof this.isNumber(a[`${this.sortBy}`]) === 'string') return a[`${this.sortBy}`].localeCompare(b[`${this.sortBy}`]);
      if (this.activeSort === null) {
        this.rows = [...this.rowData];
      }
      return 0
    },
  },
});
</script>
<style lang="scss" scoped>
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
  @apply m-auto flex min-h-[50px] min-w-[20px] items-center justify-center;
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
