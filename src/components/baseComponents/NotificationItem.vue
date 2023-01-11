<template>
	<div v-if="update">
		<div class="navigation__container">
			<div v-if="isCreateType" class="navigation__text">
				Create
			</div>
			<div v-else class="navigation__text">
				<h1 class="text-primary-700 font-semibold">{{ notificationHeader }} changed</h1>
				<div>{{ update.authorId }} made update in {{ update.courseId }} course ({{ notificationHeader }}
					widget).
				</div>
				<div>{{ notificationField }} was changed from {{ update.oldValue }} to {{ update.newValue }}</div>
				<div>Updated at: {{ update.createdAt }}</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">

import { PropType } from 'vue';
import { Update, UpdateType } from '../../api/models/update.model';
import { FIELD_TO_LABEL_MAPPER } from '../widgets/update-widget/fieldToLabelMapper';
export default {
	components: {
	},
	computed: {
		notificationHeader() {
			if (this.update) {
				return this.update.category[0].toLocaleUpperCase() + this.update.category.slice(1, this.update.category.length)
			}
		},
		notificationField() {
			if (this.update) {
				return FIELD_TO_LABEL_MAPPER[this.update.field!][0].toUpperCase() + FIELD_TO_LABEL_MAPPER[this.update.field!].slice(1, this.update.category.length)
			}
		},
		isCreateType(): boolean {
			return this.update!.type === UpdateType.CREATE;
		}
	},
	props: {
		update: {
			type: Object as PropType<Update>
		},
	}

}
</script>
<style lang="css" scoped>
.navigation__container {
	@apply shadow-md bg-stone-50 border border-primary-700 rounded-md p-5 m-3;
}

.navigation__text {
	@apply text-base text-gray-800
}
</style>