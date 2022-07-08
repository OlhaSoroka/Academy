<template>
    <table
        class="BaseTable"
        v-if="!isDataLoading"
    >
        <thead class="table-head">
            <!-- if props logo is true we`ll add column with logos-->
            <BaseTableRow :props-data="1">
                <td v-if="logo">
                </td>
                <th
                    v-for="[key, value] in getEntriesFromArray(headerData)"
                    :key="key"
                    @click="sortTable(key)"
                    class="app-table-header__th"
                >
                    <!-- make the header from props headerData-->
                    <span>
                        {{ value }}
                    </span>
                    <!-- arrows which visualize the current sort state-->
                    <BaseArrowDown v-if="key === sort.value && sort.countOfClick % 2 == 0" />
                    <BaseArrowUp v-if="key === sort.value && sort.countOfClick % 2 !== 0" />
                </th>
            </BaseTableRow>
        </thead>
        <tbody class="table-tbody">
            <BaseTableRow
                v-for="(item) in tableData"
                :key="item.id"
                :props-data="item.id"
                :editable="editBtns"
                :deletable="deleteBtns"
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
            </BaseTableRow>
        </tbody>
    </table>
    <!-- if data is loading -->
    <BaseSpinner v-else />
</template>
 
<script>
import BaseTableRow from './BaseTableRow.vue'
import BaseSpinner from '../BaseSpinner/BaseSpinner.vue';
import BaseArrowDown from '../BaseIcons/BaseArrowDown.vue';
import BaseArrowUp from '../BaseIcons/BaseArrowUp.vue';
export default {
    components: {
        BaseTableRow,
        BaseSpinner,
        BaseArrowDown,
        BaseArrowUp
    },
    /*
    headerData - data that visialize columns names in heading
    tableData - data to rows
    isDataLoading - flag of loading data
    editBtns - flag (does table needs a edit buttons)
    deleteBtns - flag (does table needs a delete buttons)
    logo - flag (does table has fields with logos)
    */
    props: {
        tableData: {
            required: true,
            type: Array,
        },
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
        headerData: {
            required: true,
            type: Array,
        },
        logo: {
            required: false,
            type: Boolean,
            default: false
        },
    },
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
            this.$emit("edit", id)
        },
        onDelete(id) {
            this.$emit('delete', id)
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
<!-- <style lang="scss">
.app-table {
    @apply rounded-2x shadow-lg w-11/12 m-auto;

    &-header__th {
        @apply select-none;
    }
}
</style> -->