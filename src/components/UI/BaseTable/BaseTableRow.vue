<template>
  <tr class="row">
    <slot />
    <td
      v-if="deletable"
      @click="deleteRow"
    >
      <div class="flex justify-end w-full">
        <div class="icon__container icon__container--red">
          <BaseDeleteIcon />
        </div>
      </div>
    </td>
    <td
      v-if="editable"
      @click="editRow"
    >
      <div class="flex justify-start w-full">
        <div class="icon__container icon__container--blue">
          <BaseEditIcon />
        </div>
      </div>
    </td>
    <td
      v-if="viewed"
      @click="viewRow"
    >
      <div class="flex justify-center w-full">
        <div class="icon__container icon__container--blue">
          <BaseDetailsIcon />
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import BaseEditIcon from '../../BaseComponents/BaseIcons/BaseEditIcon.vue';
import BaseDeleteIcon from '../../BaseComponents/BaseIcons/BaseDeleteIcon.vue';
import BaseDetailsIcon from '../../BaseComponents/BaseIcons/BaseDetailsIcon.vue';
export default {
	components: {
		BaseEditIcon,
		BaseDeleteIcon,
		BaseDetailsIcon,
	},
	props: {
		deletable: {
			type: Boolean,
			required: false,
			default: false,
		},
		editable: {
			type: Boolean,
			required: false,
			default: false,
		},
		viewed: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		deleteRow() {
			this.$emit('delete');
		},
		editRow() {
			this.$emit('edit');
		},
		viewRow() {
			this.$emit('view');
		},
	},
};
</script>

<style lang="postcss">
.icon__container {
	@apply cursor-pointer w-8 h-8 p-2 rounded-full;
}
.icon__container--red {
	@apply text-red-500  hover:bg-red-50;
}
.icon__container--blue {
	@apply text-sky-700 hover:bg-blue-50;
}
.row {
	@apply border-t-8 border-t-transparent shadow-sm;
}
</style>
