<template>

    <table
        class="rounded-2x shadow-lg w-11/12 m-auto"
        v-if="!isDataLoading"
    >
        <thead class="table-head">

            <!-- if props logo is true we`ll add column with logos-->
            <AppTableRow>
                <td v-if="logo">
                </td>
                <th
                    v-for="[key, value] in getEntriesFromArray(headerData)"
                    :key="key"
                    @click="sortTable(key)"
                    class="select-none"
                >
                    <!-- make the header from props headerData-->
                    <span>
                        {{ value }}
                    </span>

                    <!-- arrows which visualize the current sort state-->
                    <AppArrowDown v-if="key === sort.value && sort.countOfClick % 2 == 0" />
                    <AppArrowUp v-if="key === sort.value && sort.countOfClick % 2 !== 0" />
                </th>
            </AppTableRow>
        </thead>
        <tbody>
            <AppTableRow
                v-for="(item) in tableData"
                :key="item.id"
                :props-data="item.id"
                :editable="editBtns"
                :deleteable="deleteBtns"
                @onDelete="onDelete"
                @onEdit="onEdit"
            >
                <!-- fill the logo column if logo flag is true-->
                <td v-if="logo">
                    <img
                        :src="logoUrl(item)"
                        alt="image"
                        width="40"
                    />

                </td>
                <!-- fill the row according to the header-->
                <td
                    v-for="(prop, index) in getEntriesFromArray(headerData)"
                    :key="index"
                >{{ item[prop[0]] }}</td>
            </AppTableRow>
        </tbody>

    </table>
    <!-- if data is loading -->
    <AppPreloader v-else />

</template>
 
<script>
import AppTableRow from './AppTableRow.vue'
import AppPreloader from '../Preloader/AppPreloader.vue';
import AppArrowDown from '../Icons/AppArrowDown.vue';
import AppArrowUp from '../Icons/AppArrowUp.vue';
export default {
    components: {
        AppTableRow,
        AppPreloader,
        AppArrowDown,
        AppArrowUp
    },
    /*
    headerData - data that visialize columns names in heading
    tableData - data to rows
    isDataLoading - flag of loading data
    editBtns - flag (does table needs a edit buttons)
    deleteBtns - flag (does table needs a delete buttons)
    logo - flag (does table has fields with logos)
    */
    props: ['tableData', 'isDataLoading', 'editBtns', "deleteBtns", "headerData", "logo"],
    data() {
        return {
            /*
            table only able to sort by 1 column and a-z || z-a ways
            */
            sort: {
                value: null,
                countOfClick: 0
            },
            items: [],
        }
    },
    updated() {
        this.items = this.tableData
    },
    methods: {
        onEdit(id) {
            this.$emit("onEdit", id)
        },
        onDelete(id) {
            this.$emit('onDelete', id)
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
            this.items.sort((a, b) => {
                const prop1 = a[this.sort.value];
                const prop2 = b[this.sort.value];
                if (this.sort.countOfClick % 2 !== 0) {
                    if (typeof prop1 === 'string') return prop1.localeCompare(prop2)
                    if (typeof prop1 === 'number') return +prop1 - +prop2
                } else {
                    if (typeof prop1 === 'string') return prop2.localeCompare(prop1)
                    if (typeof prop1 === 'number') return +prop2 - +prop1
                }
            })
        },
        logoUrl(obj) {
            return obj[Object.keys(obj).filter(el => el.toLowerCase().includes('url'))[0]]
        }
    },
}
</script>
