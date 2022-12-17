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
                <template v-if="!shouldShowSearchedRows">
                  <div v-if="sortBy === column.field">
                    <span v-if="activeSort === 'asc'">
                      <ArrowDownIcon />
                    </span>
                    <span v-if="activeSort === 'desc'" class="rotate-180">
                      <ArrowUpIcon />
                    </span>
                  </div>
                </template>
                <div v-if="shouldShowSearchIcon(column)" class="flex justify-center items-center relative">
                  <SearchIcon @click="onSearchClick(column.field)" />
                  <SearchMenu v-show="isSearchActive(column.field)" @applySearch="applySearch($event)"
                    @resetSearch="resetSearch" :searchedValue="searchValue" />
                </div>
              </div>
            </div>
          </div>
        </th>
      </tr>
      <tr v-for="(row, rowIndex) in (shouldShowSearchedRows ? searchedRows : rows)" :key="rowIndex" class="table_row">
        <td v-for="(column, columnIndex) in columnDefs" :key="column.field" class="table_row_item">
          <div v-if="!column.actionColumn" class="table_cell" :class="column.editable && 'cursor-pointer'" 
            @click.stop="onCellClick(rowIndex, columnIndex, column)">
            <input v-if="isCellActive(rowIndex, columnIndex) && !column.dropdown" v-focus class="table_cell_input"
              :type="column.date ? 'date' : 'text'" :value="row[column.field]"
              @focusout="onFocusOut($event, row, column.field)"
              @keypress.enter="onEnterPress($event, row, column.field)" />
            <div v-if="!isCellActive(rowIndex, columnIndex)" class="over text-ellipsis p-2"
              :style="{ width: column.width + 'px' }">
              <span v-if="!column.image">
                {{ row[column.field] }}
              </span>
              <div v-if="column.image"><img :src= "row[column.field]" alt="uer_profile_photo" class="w-12 h-12 flex rounded-full mx-auto"></div>
              <button class="border border-primary-500 text-primary-500 rounded p-1 ml-1"
                v-if="column.link && row[column.field]" @click.stop="onLinkClick(row[column.field])">
                <LinkIcon></LinkIcon>
              </button>
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
            <div v-if="column.homework" >
              <BaseButton @click="onCellClick(rowIndex, columnIndex, column)" variant="btn_blue_outlined">
                <HomeworkIcon />
              </BaseButton>
            </div>
            <div v-if="column.delete" class="ml-1">
              <BaseButton @click="onDeleteClick(rowIndex)" variant="btn_blue_outlined" >
                <DeleteIcon/>
              </BaseButton>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <BaseDeleteModal v-if="rowData[rowToDeleteIndex]" :toggle-modal="isModalOpen"
      :target-value="rowData[rowToDeleteIndex][columnDefs[0].field]" @delete="onDeleteRow(rowToDeleteIndex)" />
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
import HomeworkIcon from "./icons/HomeworkIcon.vue";
import BaseDeleteModal from "./BaseDeleteModal.vue";
import LinkIcon from "././icons/LinkIcon.vue"
import SearchIcon from "././icons/SearchIcon.vue"
import SearchMenu from "./SearchMenu.vue";

interface IColumnDefs {
  field: string,
  headerName: string,
  headerEditable?: boolean,
  sortable: boolean,
  editable: boolean,
  width: number,
  solid?: boolean,
  link?: boolean,
  date?: boolean,
  actionColumn?: boolean;
  delete?: boolean;
  filter?: boolean;
  image? :boolean;
  homework?: boolean;
  dropdown?: boolean;
  options?: SelectItem[];
  checkAuthor?: boolean;
  currentUserId?: string;
}

export default defineComponent({
  components: {
    ArrowDownIcon,
    ArrowUpIcon,
    EditIcon,
    BaseButton,
    DeleteIcon,
    HomeworkIcon,
    BaseDeleteModal,
    LinkIcon,
    SearchIcon,
    SearchMenu
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
      activeCell: null as string | null,
      activeSort: null as string | null,
      sortBy: "" as string,
      rows: [] as any[],
      searchedRows: [] as any[],
      shouldShowSearchMenu: false,
      shouldShowSearchedRows: false,
      searchBy: null as string | null,
      searchValue: null as string | null,
      activeHeader: null as string | null,
      isUpdateProcessing: false,
      isModalOpen: false,
      rowToDeleteIndex: 0,

    };
  },
  watch: {
    rowData() {
      this.rows = [...this.rowData];
      this.searchedRows = this.rows.filter((row) => {
        if (row[this.searchBy as any]) {
          const rowValue = row[this.searchBy as any].toLowerCase();
          return rowValue.includes(this.searchValue)
        }
        return false
      });
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
    isAuthor(column: IColumnDefs, rowIndex: number): boolean {
      return column.checkAuthor! && this.rows[rowIndex].authorId === column.currentUserId
    },
    onLinkClick(link: string) {
      window.open(link, '_blank')?.focus();
    },
    onCellClick(rowIndex: number, columnIndex: number, column: IColumnDefs) {
      if (column.editable || this.isAuthor(column, rowIndex)) {
        this.activeCell = `${rowIndex}${columnIndex}`;
        return
      }
      this.$emit('rowClick', this.rows[rowIndex][this.uniqIdentifier])
    },
    onDeleteClick(rowIndex: number) {
      this.rowToDeleteIndex = rowIndex;
      this.isModalOpen = !this.isModalOpen;
    },
    onDeleteRow(rowIndex: number) {
      this.$emit('deleteRow', this.rows[rowIndex][this.uniqIdentifier])
      this.rowToDeleteIndex = 0;
    },
    isCellActive(rowIndex: number, columnIndex: number) {
      return this.activeCell === `${rowIndex}${columnIndex}`;
    },
    onSearchClick(column: string) {
      this.shouldShowSearchMenu = true;
      this.searchBy = column;
    },
    isSearchActive(column: string) {
      return this.shouldShowSearchMenu && this.searchBy === column;
    },
    applySearch(value: string) {
      this.searchValue = value.toLowerCase().trim();
      this.searchedRows = this.rows.filter((row) => {
        if (row[this.searchBy as any]) {
          const rowValue = row[this.searchBy as any].toLowerCase();
          return rowValue.includes(this.searchValue)
        }
        return false
      });
      this.shouldShowSearchedRows = true;
      this.shouldShowSearchMenu = false;
    },
    resetSearch(value: string) {
      this.searchValue = value;
      this.shouldShowSearchedRows = false;
      this.shouldShowSearchMenu = false;
      this.searchBy = null;
      setTimeout(() => {
        this.searchValue = null;
      }, 0)
    },
    shouldShowSearchIcon(column: IColumnDefs) {
      return (!this.searchBy && column.filter) || (this.searchBy && this.searchBy === column.field)
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
  @apply border-2 border-slate-200 text-start text-primary-700;
}

.table_header--solid {
  @apply bg-primary-300 text-white;
}

.table_header_cell {
  @apply m-auto flex min-h-[50px] min-w-[20px] items-center justify-start ml-3;
}

.table_row {
  @apply hover:bg-primary-200 cursor-pointer;
}

.table_row_item {
  @apply border-b-2 border-slate-200;
}

.table_cell {
  @apply flex min-h-[50px] items-center justify-start text-start ml-3;
  overflow-wrap: break-word
}
.table_cell_centered {
  @apply flex min-h-[50px] items-center justify-center text-center ml-3;
  overflow-wrap: break-word
}
.table_cell_input {
  @apply block min-h-[50px] w-full rounded border-2 border-primary-400 py-1 px-2 shadow focus-visible:outline-none;
}

.text-wrap {
  overflow-wrap: break-word;
}
</style>
