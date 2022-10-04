<template>
  <div style="overflow-x: auto">
    <table
      v-click-outside-table
      style="width: 100%"
      class="table"
    >
      <tr>
        <th class="table_header">
          <div
            class="table_header_cell"
          >
            Name
          </div>
        </th>
        <th 
          v-for="(homework, homeworkIndex) in rowData[0].homework"
          :key="homeworkIndex"
          colspan="2"
          class="table_header"
        >
          <div
            class="table_header_cell"
          >
            {{ homework.name }}
          </div>
        </th>
        <th class="table_header table_header--solid">
        <div
            class="table_header_cell"
          >
            Total
          </div>
        </th>
      </tr>
      <tr
        v-for="(row, rowIndex) in rowData"
        :key="rowIndex"
        class="table_row"
      >
      <td>
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
          class="table_row_item"
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
              @focusout="onFocusOut($event, rowIndex, homeworkIndex, `rate`)"
              @keypress.enter="onEnterPress($event, rowIndex, homeworkIndex, `rate`)"
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
              @focusout="onFocusOut($event, rowIndex, homeworkIndex, `link`)"
              @keypress.enter="onEnterPress($event, rowIndex, homeworkIndex, `link`)"
            > 
            <div
              v-else-if="false"
              
              class="table_cell max-w-[100px] overflow-hidden"
            >
            {{homework.link}}
            </div>
          </div>
        </td>
        </template>
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
      clicks: 0,
      timer: null
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
    onFocusOut(event, rowIndex, homeworkIndex, fildName) {
      this.emitCellUpdate(event, rowIndex, homeworkIndex, fildName);
    },
    onEnterPress(event, rowIndex, homeworkIndex, fildName) {
      this.emitCellUpdate(event, rowIndex, homeworkIndex, fildName);
      this.activeCell = null;
    },
    emitCellUpdate(event, rowIndex, homeworkIndex, fildName) {
      const newValue = event.target.value;
      const data = this.rowData[rowIndex].homework[homeworkIndex];
      data[fildName] = newValue;
      console.log(data)
      this.$emit("cellValueChanged", {data, rowIndex, homeworkIndex});
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
        }
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