<template>

    <table
        class="
    rounded-2xl	
    shadow-lg
    w-11/12
    table-auto
    m-auto"
        v-if="!isDataLoading"
    >
        <thead class="table-head">
            <slot name="table-head"></slot>
        </thead>

        <tbody>
            <AppTableRow
                v-for="item in tableData"
                :key="item.id"
                @editHandler="onEdit"
                @deleteHandler="onDelete"
                :propsData="item.id"
                :deleteable="true"
                :editable="true"
            >
                <td class="flex flex-row items-center justify-between">
                    <img
                        :src="item.avatarUrl"
                        alt=""
                        width="50"
                    >{{ item.fullName }}
                </td>
                <td>{{ item.email }}</td>
                <td>{{ item.initialScore }}</td>
                <td>{{ item.role }}</td>
                <td>{{ item.course }}</td>
            </AppTableRow>
        </tbody>

    </table>

    <AppPreloader v-else />

</template>

<script>
import AppTableRow from './AppTableRow.vue'
import AppPreloader from '../Preloader/AppPreloader.vue';
export default {
    components: {
        AppTableRow,
        AppPreloader
    },
    props: ['tableData', 'isDataLoading'],
    methods: {
        onEdit(id) {
            console.log(id + " Start editing");
        },
        onDelete(id) {
            console.log(id + " Start deleting");
        }
    },
}
</script>

<style  lang="scss">
</style>