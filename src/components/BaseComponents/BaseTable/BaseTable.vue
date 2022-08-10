<template>
  <table
    v-if="!isDataLoading"
    class="BaseTable"
  >
    <thead class="table-head">
      <!-- if props logo is true we`ll add column with logos-->
      <BaseTableRow :props-data="1">
        <td v-if="logo" />
        <th
          v-for="[key, value] in getEntriesFromArray(
            getTablePart(tableData, 'head')
          )"
          :key="key"
          class="app-table-header__th"
          @click="sortTable(key)"
        >
          <!-- make the header from props headerData-->
          <span>
            {{ value }}
          </span>
          <!-- arrows which visualize the current sort state-->
          <BaseArrowDown v-if="key === sort.value && !sort.sortDirection" />
          <BaseArrowUp v-if="key === sort.value && sort.sortDirection" />
        </th>
      </BaseTableRow>
    </thead>
    <tbody
      v-if="!!tableData.bodyData.length"
      class="table-tbody"
    >
      <BaseTableRow
        v-for="item in getTablePart(tableData, 'body')"
        :key="item.id"
        :editable="editBtns"
        :deletable="deleteBtns"
        :viewed="viewBtns"
        @delete="onDelete(item.id)"
        @edit="onEdit(item.id)"
        @view="onView(item.id)"
      >
        <!-- fill the logo column if logo flag is true-->
        <td v-if="logo">
          <img
            :src="logoUrl(item)"
            alt="image"
            width="40"
          >
        </td>
        <!-- fill the row according to the header-->
        <td
          v-for="(prop, index) in getEntriesFromArray(
            getTablePart(tableData, 'head')
          )"
          :key="index"
        >
          {{ item[prop[0]] }}
        </td>
      </BaseTableRow>
    </tbody>
    <tr v-else>
      <td colspan="145">
        <h2 class="text-red-500 text-xl">No data there...</h2>
      </td>
    </tr>

  </table>

  <!-- if data is loading -->
  <BaseSpinner v-else />
</template>

<script>
import BaseTableRow from "../../UI/BaseTable/BaseTableRow.vue";
import BaseSpinner from "../BaseSpinner/BaseSpinner.vue";
import BaseArrowDown from "../BaseIcons/BaseArrowDown.vue";
import BaseArrowUp from "../BaseIcons/BaseArrowUp.vue";
export default {
  components: {
    BaseTableRow,
    BaseSpinner,
    BaseArrowDown,
    BaseArrowUp,
  },
  /* 
  isDataLoading - flag of loading data
  editBtns - flag (does table needs a edit buttons)
  deleteBtns - flag (does table needs a delete buttons)
  viewBtns - flag (does table needs a view buttons)
  logo - flag (does table has fields with logos)
  */
  props: {
    tableData: {
      required: true,
      type: Object,
    },
    /* 
        tableData : {
            headingData : [{},...],
            headingData - [{name O f Prop In Object : name That Should be on page }, ...]
            example : [{'fullname':' Повне ім'я }]

            bodyData : [{} , ... ]
            bodyData - data to rows
        }
    */
    isDataLoading: {
      required: true,
      type: Boolean,
    },
    editBtns: {
      required: true,
      type: Boolean,
    },
    deleteBtns: {
      required: true,
      type: Boolean,
    },
    viewBtns: {
      required: false,
      type: Boolean,
    },
    logo: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /*
      table only able to sort by 1 column and a-z || z-a ways
      */
      sort: {
        value: null,
        sortDirection: null, // null || true || false
      },
      items: [],
    };
  },
  updated() {
    this.items = this.tableData["bodyData"];
  },
  methods: {
    onEdit(id) {
      this.$emit("edit", id);
    },
    onDelete(id) {
      this.$emit("delete", id);
    },
    onView(id) {
      this.$emit('view', id)
    },
    getEntriesFromArray(array) {
      const res = array.reduce(
        (acc, el) => [...acc, Object.entries(el)[0]],
        []
      );
      return res;
    },
    sortTable(newValue) {
      if (this.sort.value === newValue) {
        this.$set(this.sort, "sortDirection", !this.sort.sortDirection);
      } else {
        this.$set(this.sort, "value", newValue);
        this.$set(this.sort, "sortDirection", true);
      }
      this.items.sort((a, b) => {
        const prop1 = a[this.sort.value];
        const prop2 = b[this.sort.value];
        if (this.sort.sortDirection) {
          if (typeof prop1 === "string") return prop1.localeCompare(prop2);
          if (typeof prop1 === "number") return +prop1 - +prop2;
        } else {
          if (typeof prop1 === "string") return prop2.localeCompare(prop1);
          if (typeof prop1 === "number") return +prop2 - +prop1;
        }
      });
    },
    logoUrl(obj) {
      const keys = Object.keys(obj);
      const urlKey = keys.filter((el) => el.toLowerCase().includes("url"))[0];
      return obj[urlKey];
    },
    getTablePart(object, part) {
      //part can = "body" || "head"
      const entries = Object.entries(object);
      const index = part === "body" ? 1 : 0;
      const headingEntry = entries[index];
      const value = headingEntry[1];
      return value;
    },
  },
};
</script>
<style lang="postcss">
.BaseTable {
  @apply w-full;
}
</style>
