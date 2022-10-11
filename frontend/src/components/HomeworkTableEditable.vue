<template>
  <div style="overflow-x: auto">
    <table
      v-if="rows.length"
      v-click-outside-table
      style="width: 100%"
      class="table"
    >
      <tr class="table_row">
        <th 
          class="table_header cursor-pointer"
          @click="onHeaderClick('students_name')"
        >
          <div class="table_header_cell">
            <div>
              Name
            </div>
            <div v-if="sortBy === 'students_name'">
              <span v-if="activeSort === 'asc'"><BaseArrowDown /></span>
              <span
                v-if="activeSort === 'desc'"
                class="rotate-180"
              ><BaseArrowUp /></span>
            </div>
          </div>
        </th>
        <th 
          v-for="(homework, homeworkIndex) in rows[0].homework"
          :key="homeworkIndex"
          colspan="2"
          class="table_header cursor-pointer"
          id="header"
        >
          <div
            
            @click="onEditableHeaderClick(homework.name, homeworkIndex, true)"
          >
            <input
              v-if="isHeaderActive(homework.name, homeworkIndex)"
              ref="headerInput"
              class="table_cell_input"
              type="text"
              :value="homework.name"
              @focusout="onFocusOutHeader($event, homeworkIndex, 'name')"
              @keypress.enter="onEnterPressHeader($event, homeworkIndex, 'name')"
            > 
            <input
              v-if="isHeaderActive(homework.name, homeworkIndex)"
              ref="headerInput"
              class="table_cell_input"
              type="date"
              :value="homework.date"
              @focusout="onFocusOutHeader($event, homeworkIndex, 'date')"
              @keypress.enter="onEnterPressHeader($event, homeworkIndex, 'date')"
            > 
            <div
              v-else
              class="table_header_cell"
            >
              {{ homework.name }}
            </div>
          </div>
        </th>
        <th 
          class="table_header cursor-pointer"
          @click="onHeaderClick('total')"
        >
          <div class="table_header_cell table_header--solid">
            <div>Total</div>
            <div v-if="sortBy === 'total'">
              <span v-if="activeSort === 'asc'"><BaseArrowDown /></span>
              <span
                v-if="activeSort === 'desc'"
                class="rotate-180"
              ><BaseArrowUp /></span>
            </div>
          </div>
        </th>
      </tr>
      <tr
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        class="table_row"
      >
        <td class="table_row_item">
          <div
            class="p-2 text-ellipsis over"
          >
            {{ row.students_name }}
          </div>
        </td>
        <template
          v-for="(homework, homeworkIndex) in row.homework"  
        >
          <td
            :key="homeworkIndex.toString() + rowIndex.toString()"
            class="table_row_item cursor-pointer"
          >
            <div
              class="table_cell"
              @click="oneClick(rowIndex, homeworkIndex, true, homework.link)"
            >
              <input
                v-if="isCellActive(rowIndex, homeworkIndex)"
                ref="cellInput"
                class="table_cell_input"
                type="text"
                :value="homework.rate"
                @focusout="onFocusOut($event, row.id, homeworkIndex, `rate`)"
                @keypress.enter="onEnterPress($event, row.id, homeworkIndex, `rate`)"
              > 
              <div
                v-else
                class="p-2 text-ellipsis over"
              >
                {{ homework.rate }}
              </div>
            </div>
          </td>
          <td
            :key="homeworkIndex.toString() + rowIndex.toString() + 'link'"
            class="cursor-pointer table_row_item"
          >
            <div
              class="table_cell"
              @click="oneClick(rowIndex, homeworkIndex, true, homework.link)"
            >
              <input
                v-if="isCellActive(rowIndex, homeworkIndex)"
                ref="cellInput"
                class="table_cell_input"
                type="text"
                :value="homework.link"
                @focusout="onFocusOut($event, row.id, homeworkIndex, `link`)"
                @keypress.enter="onEnterPress($event, row.id, homeworkIndex, `link`)"
              > 
              <div
                v-else-if="false"
                class="table_cell max-w-[100px] overflow-hidden"
              >
                {{ homework.link }}
              </div>
            </div>
          </td>
        </template>
        <td class="table_row_item">
          <div
            class="p-2 text-ellipsis over"
          >
            {{ row.total }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import BaseArrowDown from "../components/BaseComponents/BaseIcons/BaseArrowDown.vue";
import BaseArrowUp from "../components/BaseComponents/BaseIcons/BaseArrowUp.vue";
export default {
  components: {
    BaseArrowDown,
    BaseArrowUp,
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
      activeHeader: null,
      clicks: 0,
      timer: null,
      sortBy: null,
      activeSort: null,
      rows: [],
      functionDone: false
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
        this.activeHeader = null;
      }
    },
    onEditableHeaderClick(homeworkName, homeworkIndex, isEditable) {
      if (isEditable) {
      this.activeHeader = `${homeworkName}${homeworkIndex}`} 
      this.activeCell = null;
    },
    isCellActive(rowIndex, columnIndex) {
      return this.activeCell === `${rowIndex}${columnIndex}`;
    },
    isHeaderActive(homeworkName, homeworkIndex){
      return this.activeHeader === `${homeworkName}${homeworkIndex}`
    },
    onClickOutside() {
      this.activeCell = null;
      this.activeHeader = null;
    },
    onFocusOutHeader(event, homeworkIndex, fildName) {
      this.emitHeaderUpdate(event, homeworkIndex, fildName);
      this.activeHeader = null;
    },
    onEnterPressHeader(event, homeworkIndex, fildName) {
      this.emitHeaderUpdate(event, homeworkIndex, fildName);
      this.activeHeader = null;
    },
    emitHeaderUpdate(event, homeworkIndex, fildName){
      const newValue = event.target.value;
      this.$emit("headerValueChanged", {newValue, homeworkIndex, fildName});
    },
    onFocusOut(event, id, homeworkIndex, fildName) {
      this.emitCellUpdate(event, id, homeworkIndex, fildName);
    },
    onEnterPress(event, id, homeworkIndex, fildName) {
      this.emitCellUpdate(event, id, homeworkIndex, fildName);
      this.activeCell = null;
    },
     emitCellUpdate(event, id, homeworkIndex, fildName) {
      const newValue = event.target.value;
      const correctRowIndex = this.rowData.findIndex((item) => item.id === id)
      const data = this.rowData[correctRowIndex].homework[homeworkIndex];
      data[fildName] = newValue;
      this.$emit("cellValueChanged", {data, correctRowIndex, homeworkIndex});
    },
    goToLink(link) {
      if (link) {
        window.open(link, `_blank`)
      }
    },
    oneClick(rowIndex, columnIndex, isEditable, link=null) {
          this.clicks++;
          if (this.clicks === 1) {
            this.timer = setTimeout( () => {
              this.onCellClick(rowIndex, columnIndex, isEditable);
              this.clicks = 0
            }, 300);
          } else {
             clearTimeout(this.timer);  
             this.goToLink(link)
             this.clicks = 0;
          }      
        },
    onHeaderClick(name) {
      if (name) {
        this.setNextSort(name);
        this.rows.sort(this.compare);
      }
    },
    setNextSort(name) {
      if (name !== this.sortBy) {
        this.activeSort = null;
      }
      this.sortBy = name;
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
  @apply hover:bg-primary-200 ;
}
.table_row_item {
  @apply border-b-2 border-slate-200 ;
}
.table_cell {
  @apply min-h-[50px] flex justify-center items-center;
}
.table_cell_input {
  @apply min-w-[100px] w-full block py-1 px-2 shadow border-2 rounded border-primary-400 focus-visible:outline-none;
}
.text-wrap {
  overflow-wrap: break-word;
}
</style>