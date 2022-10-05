<template>
  <BaseModal
    ref="HomeworkDeleteModal"
    :header="'Confirm delete'"
  >
    <template #body>
      <div
        v-if="courseItem"
        class="max-w-md"
      >
        <div>
          <label
            for="homework"
            class="block ml-1 text-start"
          >Choice homework witch you want to delete:</label>
          <select
            id="homework"         
            v-model="homeworkForDelete"
            class="select"
          >
            <option
              value=""
              disabled
              selected
            >
              Select Homework
            </option>
            <option
              v-for="item in courseItem.homework_results[0].homework"
              :key="item.id"
              :value="item.name"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex justify-evenly mt-5">
        <div class="mx-2">
          <BaseButton
            :variant="'btn_red'"
            @click="submit(homeworkForDelete)"
          >
            Delete
          </BaseButton>
        </div>
        <div class="mx-2">
          <BaseButton @click="cancel">
            Cancel
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseButton from "@/components/BaseComponents/BaseButton.vue";
import BaseModal from "@/components/BaseComponents/BaseModal.vue";
export default {
  name: "BaseDeleteModal",
  components: { BaseButton, BaseModal },
  props: {
    toggleModal: {
      type: Boolean,
      default: false,
    },
    courseItem: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      homeworkForDelete: null
    };
  },
  watch: {
    toggleModal() {
      this.$refs.HomeworkDeleteModal.openModal();
    },
  },
  methods: {
    submit(homeworkForDelete) {
      this.$emit("delete", homeworkForDelete);
      this.$refs.HomeworkDeleteModal.closeModal();
    },
    cancel() {
      this.$refs.HomeworkDeleteModal.closeModal();
    },
  },
};
</script>
<style scoped lang="postcss">
.select {
  @apply block p-1 m-1 w-full ml-1 border-2 rounded-md border-primary-700 text-base font-mono placeholder:text-slate-400 hover:bg-stone-50 focus:drop-shadow-xl focus:bg-stone-50 focus:border-primary-700 focus:outline-none focus:text-cyan-900 disabled:bg-gray-50 disabled:border-gray-300;
}
</style>
