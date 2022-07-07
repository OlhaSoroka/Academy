<template>
    <tr class="h-11 border-slate-400">
        <slot>
        </slot>
        <td
            v-if="deleteable"
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
            type: String,
            required: true,
        },
        deleteable: {
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
            this.$emit("delete", this.propsData)
        },
        editRow() {
            this.$emit("edit", this.propsData)
        }
    }
}
</script>

<style lang="scss" >
</style>