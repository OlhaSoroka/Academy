<template>
    <tr class="h-11 border-slate-400">
        <slot>
        </slot>
        <td
            v-if="deleteable"
            class="
            text-red-700 
            cursor-pointer 
            hover:bg-red-50
            "
            @click="deleteThisRow"
        >
            delete
        </td>
        <td
            v-if="editable"
            class="
            text-blue-700 
            cursor-pointer
            hover:bg-blue-50

            "
            @click="editThisRow"
        >
            edit
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        propsData: Number,
        deleteable: Boolean,
        editable: Boolean,
    },
    methods: {
        deleteThisRow() {
            this.$emit("deleteHandler", this.propsData)
        },
        editThisRow() {
            this.$emit("editHandler", this.propsData)
        }
    }
}
</script>

<style lang="scss" >
</style>