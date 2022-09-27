<template>
  <div style="overflow-x: auto">
    <table
      style="width: 100%"
      class="border-2 border-slate-200"
    >
      <tr>
        <th
          v-for="column in columnDefs"
          :key="column.field"
          class="border-2 border-slate-200 text-primary-700"
          :class="{ 'bg-primary-300 text-white': column.solid }"
        >
          <div
            class="min-w-[120px] min-h-[50px] flex justify-center items-center"
            :style="{ width: column.width + 'px' }"
          >
            {{ column.headerName }}
          </div>
        </th>
      </tr>
      <tr
        v-for="(row, index) in rowData"
        :key="index"
        class="hover:bg-primary-200"
      >
        <td
          v-for="column in columnDefs"
          :key="column.field"
          class="border-b-2 border-slate-200"
        >
          <div
           
		
            class="min-h-[50px] flex justify-center items-center"
          >
            <div v-if="true">
              {{ row[column.field] }}
            </div>
            <input
              v-else
              class="b"
              type="text"
            >
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
};
</script>
<style lang="scss" scoped>
.table_column {
  @apply border-2 border-gray-400 min-h-max;
}
.total_column {
  @apply bg-red-400;
}
</style>