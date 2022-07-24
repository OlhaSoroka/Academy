<template>
  <tr class="h-11 border-slate-400">
    <slot />
    <td
      v-if="deletable"
      class="text-red-700 cursor-pointer hover:bg-red-50"
      @click="deleteRow"
    >
      delete
    </td>
    <td
      v-if="editable"
      class="text-blue-700 cursor-pointer hover:bg-blue-50"
      @click="editRow"
    >
      edit
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    propsData: {
      type: [String, Number],
      required: true,
    },
<<<<<<< HEAD
    methods: {
        deleteRow() {
            this.$emit("delete", this.propsData)
        },
        editRow() {
          this.$emit("edit", this.propsData)
          //console.log(this.propsData, 'data')
        }
    }
}
=======
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
  },
  methods: {
    deleteRow() {
      this.$emit("delete", this.propsData);
    },
    editRow() {
      this.$emit("edit", this.propsData);
    },
  },
};
>>>>>>> 074b5b18a8ba9732bd837f3d7161fd234344300e
</script>

<style lang="scss" >
</style>