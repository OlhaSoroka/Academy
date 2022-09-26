<template>
  <table
    v-if="!isDataLoading"
    class="BaseTable border-none"
  >
    <thead class="table-head">
      <!-- if props logo is true we`ll add column with logos-->
      <BaseTableRow :props-data="1">
        <td v-if="logo" />
        <th
          v-for="[key, value] in getEntriesFromArray(getTablePart(tableData, 'head'))"
          :key="key"
          :class="setHeaderNumClass(value)"
          @click="sortTable(key)"
        >
          <!-- make the header from props headerData-->
          <span :class="{ 'pr-[20px]': key !== sort.value }">
            {{ value }}
            <BaseArrowDown v-show="key === sort.value && !sort.sortDirection" />
            <BaseArrowUp v-show="key === sort.value && sort.sortDirection" />
          </span>
          <!-- arrows which visualize the current sort state-->
        </th>
      </BaseTableRow>
    </thead>
    <tbody
      v-if="!!tableData.bodyData.length"
      class="table-tbody"
    >
      <BaseTableRow
        v-for="item in getTablePart(tableData, 'body')"
        :key="item.id"
        :editable="editBtns"
        :deletable="deleteBtns"
        :viewed="viewBtns"
        @delete="onDelete(item.id)"
        @edit="onEdit(item.id)"
        @view="onView(item.id)"
      >
        <!-- fill the logo column if logo flag is true-->
        <td v-if="logo">
          <img
            :src="logoUrl(item)"
            alt="image"
            width="40"
          >
        </td>
        <!-- fill the row according to the header-->
        <td
          v-for="(prop, index) in getEntriesFromArray(getTablePart(tableData, 'head'))"
          :key="index"
          :class="setNumClass(checkTableData(item[prop[0]]))"
        >
          <BaseTooltip
            v-if="typeof item[prop[0]] === 'string' && item[prop[0]].match(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)"
            :text="(item[prop[0]])"
          >
            <a  
              target="”_blank”"
              :href="item[prop[0]]"
            > 
              {{ typeof item[prop[0]] === "string" ? `${item[prop[0]].slice(0, 25)}...` : item[prop[0]] }}
            </a>
          </BaseTooltip>
          <BaseTooltip
            v-else-if="typeof item[prop[0]] === 'string' && item[prop[0]].length > 25"
            :text="(item[prop[0]])"
          >
            {{
              typeof item[prop[0]] === "string" ? `${item[prop[0]].slice(0, 25)}...` : item[prop[0]]
            }}
          </BaseTooltip>
          <span v-else>{{ item[prop[0]] }}</span>
        </td>
      </BaseTableRow>
    </tbody>
    <tr v-else>
      <td colspan="145">
        <h2 class="text-xl opacity-80">
          No data...
        </h2>
      </td>
    </tr>
  </table>

  <!-- if data is loading -->
  <BaseSpinner v-else />
</template>

<script>
import BaseTableRow from '../../UI/BaseTable/BaseTableRow.vue';
import BaseSpinner from '../BaseSpinner/BaseSpinner.vue';
import BaseArrowDown from '../BaseIcons/BaseArrowDown.vue';
import BaseArrowUp from '../BaseIcons/BaseArrowUp.vue';
import BaseTooltip from '../BaseTooltip/BaseTooltip.vue';
export default {
	components: {
		BaseTableRow,
		BaseSpinner,
		BaseArrowDown,
		BaseArrowUp,
		BaseTooltip
	},
	/* 
  isDataLoading - flag of loading data
  editBtns - flag (does table needs a edit buttons)
  deleteBtns - flag (does table needs a delete buttons)
  viewBtns - flag (does table needs a view buttons)
  logo - flag (does table has fields with logos)
  */
	props: {
		tableData: {
			required: true,
			type: Object,
		},
		/* 
		tableData : {
			headingData : [{},...],
			headingData - [{name O f Prop In Object : name That Should be on page }, ...]
			example : [{'fullname':' Повне ім'я }]

			bodyData : [{} , ... ]
			bodyData - data to rows
		}
	*/
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
		viewBtns: {
			required: false,
			type: Boolean,
		},
		logo: {
			required: false,
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			/*
	  table only able to sort by 1 column and a-z || z-a ways
	  */
			sort: {
				value: null,
				sortDirection: null, // null || true || false
			},
			items: [],
			baseTableHeaderStyles: "app-table-header__th text-primary-800"
		};
	},
	updated() {
		this.items = this.tableData['bodyData'];
	},
	methods: {
		onEdit(id) {
			this.$emit('edit', id);
		},
		onDelete(id) {
			this.$emit('delete', id);
		},
		onView(id) {
			this.$emit('view', id);
		},
		getEntriesFromArray(array) {
			const res = array.reduce((acc, el) => [...acc, Object.entries(el)[0]], []);
			return res;
		},
		sortTable(newValue) {
			if (this.sort.value === newValue) {
				this.$set(this.sort, 'sortDirection', !this.sort.sortDirection);
			} else {
				this.$set(this.sort, 'value', newValue);
				this.$set(this.sort, 'sortDirection', true);
			}
			this.items.sort((a, b) => {
				const prop1 = a[this.sort.value];
				const prop2 = b[this.sort.value];
				if (this.sort.sortDirection) {
					if (typeof prop1 === 'string') return prop1.localeCompare(prop2);
					if (typeof prop1 === 'number') return +prop1 - +prop2;
				} else {
					if (typeof prop1 === 'string') return prop2.localeCompare(prop1);
					if (typeof prop1 === 'number') return +prop2 - +prop1;
				}
			});
		},
		logoUrl(obj) {
			const keys = Object.keys(obj);
			const urlKey = keys.filter((el) => el.toLowerCase().includes('url'))[0];
			return obj[urlKey];
		},
		getTablePart(object, part) {
			//part can = "body" || "head"
			const entries = Object.entries(object);
			const index = part === 'body' ? 1 : 0;
			const headingEntry = entries[index];
			const value = headingEntry[1];
			return value;
		},
		checkTableData(data) {
			return this.isDataString(data) || this.isDataNumber(data) ? data : 'Invalid Data';
		},
		isDataString(data) {
			return typeof data === 'string';
		},
		isDataNumber(data) {
			return typeof data === 'number';
		},
		setNumClass(value) {
			if (!isNaN(value)) {
				return "text-right pr-[20px]"
			} else {
				return "text-start"
			}
		},
		setHeaderNumClass(value) {
			if (value.toLowerCase().includes("score") || value.toLowerCase().includes("result") || value.toLowerCase().includes("hw") || value.toLowerCase().includes("total")) {
				return `${this.baseTableHeaderStyles} text-right`
			} else {
				return `${this.baseTableHeaderStyles} text-start`
			}
		}
	},
};
</script>
<style lang="postcss">
.BaseTable {
	@apply w-full;
}
</style>
