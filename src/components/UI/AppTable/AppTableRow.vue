<template>
    <tr class="h-11 border-slate-400">
        <slot>
        </slot>
        <td
            v-if="deleteable || false"
            class="text-red-700 cursor-pointer hover:bg-red-50"
            @click="deleteRow"
        >
            delete
        </td>
        <td
            v-if="editable || false"
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
        propsData: String,
        deleteable: Boolean,
        editable: Boolean,
    },
    methods: {
        deleteRow() {
            this.$emit("onDelete", this.propsData)
        },
        editRow() {
            this.$emit("onEdit", this.propsData)
        }
    }
}
</script>

<style lang="scss" >
</style>