<template>

    <table
        class="
    rounded-2xl	
    shadow-lg
    w-11/12
    m-auto"
        v-if="!isDataLoading"
    >
        <thead class="table-head">
            <AppTableRow>
                <th
                    v-for="(item) in getEntriesFromArray(headerData)"
                    :key="item[0]"
                    @click="sortTable(item[0])"
                >{{ item[1] }}</th>
            </AppTableRow>
        </thead>
        <tbody>
            <AppTableRow
                v-for="(item) in items"
                :key="item.id"
                :editable="editBtns"
                :deleteable="deleteBtns"
            >
                <td
                    v-for="(prop, index) in getEntriesFromArray(headerData)"
                    :key="index"
                >{{ item[prop[0]] }}</td>
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
    props: ['tableData', 'isDataLoading', 'editBtns', "deleteBtns", "headerData"],
    data() {
        return {
            sort: {
                value: null,
                countOfClick: 1
            },
            items: []
        }
    },
    updated() {
        this.items = this.tableData;
    },
    methods: {
        onEdit(id) {
            console.log(id + " Start editing");
        },
        onDelete(id) {
            console.log(id + " Start deleting");
        },
        getEntriesFromArray(array) {
            return array.reduce((acc, el) => [...acc, Object.entries(el)[0]], [])
        },
        sortTable(newValue) {
            if (this.sort.value === newValue) {
                this.$set(this.sort, 'countOfClick', this.sort.countOfClick + 1)
            } else {
                this.$set(this.sort, 'value', newValue)
                this.$set(this.sort, 'countOfClick', 1)
            }
            this.items = this.items.sort((a, b) => {
                const prop1 = a[this.sort.value];
                const prop2 = b[this.sort.value];
                if (this.sort.countOfClick % 2 == 0) {
                    if (typeof prop1 === 'string') return prop1.localeCompare(prop2)
                    if (typeof prop1 === 'number') return prop1 - prop2
                } else {
                    if (typeof prop1 === 'string') return prop2.localeCompare(prop1)
                    if (typeof prop1 === 'number') return prop2 - prop1
                }
            })
        }
    },
}
</script>

<style  lang="scss">
</style>