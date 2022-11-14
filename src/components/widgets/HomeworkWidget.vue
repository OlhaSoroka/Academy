<template>
	<div class="homework__container">
		<div class="flex align-middle justify-between">
			<div class="homework__header">
				Vue
			</div>
		</div>


		<div class="mt-4">
			<BaseTableEditable :column-defs="columnDefs" :row-data="[]" :uniq-identifier="uniqIdentifier"
				@cellValueChanged="onCellEdit($event)" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LectureHomework } from '../../api/models/homework.model';
import BaseTableEditable from '../baseComponents/BaseTableEditable.vue';
export default defineComponent({
    data() {
        return {
            uniqIdentifier: "id",
            columnDefs: [
                { field: "student", headerName: "Lecture", sortable: true, editable: true, width: 300 },
                { field: "rate", headerName: "Rate", sortable: true, editable: true, width: 300 },
                { field: "link", headerName: "Link", sortable: true, editable: true, width: 300 },
                { field: "comment", headerName: "Comment", sortable: true, editable: true, width: 300 },
                { field: "date", headerName: "Date", sortable: true, editable: true, width: 300 },
            ]
        };
    },
    methods: {
        onCellEdit(event: {
            uniqIdentifier: string;
            data: LectureHomework;
        }) { }
    },
    components: { BaseTableEditable }
})
</script>