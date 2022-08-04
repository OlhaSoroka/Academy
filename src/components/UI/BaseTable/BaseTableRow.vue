<template>
  <tr class="h-11 border-slate-400">
    <slot />
    <td
      v-if="deletable"
      class="text-red-700 cursor-pointer hover:bg-red-50 duration-500 rounded-sm text-center pl-0"
      @click="deleteRow"
    >
      delete
    </td>
    <td
      v-if="editable"
      class="text-blue-700 cursor-pointer hover:bg-blue-50 duration-500 rounded-sm text-center pl-0"
      @click="editRow"
    >
      edit
    </td>
    <td
      v-if="viewed"
      class="text-green-700 cursor-pointer hover:bg-blue-50 duration-500 rounded-sm text-center pl-0"
      @click="viewRow"
    >
      Details
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    deletable: {
      type: Boolean,
      required: false,
      default: false,
    },
    editable: {
      type: Boolean,
      required: false,
      default: false,
    },
    viewed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    deleteRow() {
      this.$emit("delete");
    },
    editRow() {
      this.$emit("edit");
    },
    viewRow() {
      this.$emit("view");
    },
  },
};
</script>

<style lang="scss" >
tr > td {
  @apply text-left pl-1;
}
</style>