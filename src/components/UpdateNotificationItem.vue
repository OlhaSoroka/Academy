<template>
	<div v-if="update">
		<div class="navigation__container">

			<!-- Create -->
			<div v-if="isCreateType" class="navigation__text">
				<h1 class="text-primary-700 font-bold">{{ notificationHeader }} added</h1>
				<div class="">{{ update.authorId }} added a <span class="font-semibold">new {{
					notificationHeader!.toLowerCase()
				}}</span> in <span class="font-semibold">{{ update.courseId }}.</span> Check it!
				</div>
				<div>Created at: {{ update.createdAt }}</div>
			</div>

			<!-- Update with oldValue -->
			<div v-if="isUpdateType && update.oldValue">
				<h1 class="text-primary-700 font-bold">{{ notificationHeader }} changed</h1>
				<div>{{ update.authorId }} made update in <span class="font-semibold">{{ update.courseId }}</span> course ({{ notificationHeader }}
					widget).
				</div>
				<div><span class="font-semibold">{{ notificationField }}</span>  was changed from <span class="font-semibold break-all ">{{
					update.oldValue || 'Empty'
				}}</span> to <span class="font-semibold  break-all">{{ update.newValue }}.</span></div>
				<div>Updated at: {{ update.createdAt }}</div>
			</div>

			<!-- Update without oldValue -->
			<div v-if="isUpdateType && !update.oldValue">
				<h1 class="text-primary-700 font-bold">{{ notificationHeader }} changed</h1>
				<div>{{ update.authorId }} made update in <span class="font-semibold">{{ update.courseId }} </span> course</div>
				<div><span class="font-semibold">{{ notificationField }}</span> was added to <span class="font-semibold">{{ notificationHeader }}
						widget</span>. Check it!</div>
				<div>Updated at: {{ update.createdAt }}</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">

import { defineComponent, PropType } from 'vue';
import { Update, UpdateType } from '../api/models/update.model';
import { FIELD_TO_LABEL_MAPPER } from './widgets/update-widget/fieldToLabelMapper';
export default defineComponent({
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
				return FIELD_TO_LABEL_MAPPER[this.update.field!][0].toUpperCase() + FIELD_TO_LABEL_MAPPER[this.update.field!].slice(1, FIELD_TO_LABEL_MAPPER[this.update.field!].length)
			}
		},
		isCreateType(): boolean {
			return this.update!.type === UpdateType.CREATE;
		},
		isUpdateType(): boolean {
			return this.update!.type === UpdateType.UPDATE;
		}
	},
	props: {
		update: {
			type: Object as PropType<Update>
		},
	}
});
</script>
<style lang="css" scoped>
.navigation__container {
	@apply shadow-md bg-stone-50 border border-primary-700 rounded-md p-5 mt-3;
}

.navigation__text {
	@apply text-base text-gray-800;

}
</style>