<template>
  <BaseModal
    ref="CourseDeleteModal"
    :header="'Confirm delete'"
  >
    <template #body>
      <div>
        Do you really want to delete
        <span class="font-bold">{{ courseToDelete.name }}</span>?
      </div>
      <div class="flex justify-center mt-7">
        <div class="mx-1">
          <BaseButton
            :variant="'btn_red'"
            @click="submitCourseDeleteButton(courseToDelete.id)"
          >
            Delete
          </BaseButton>
        </div>
        <div class="mx-1">
          <BaseButton @click="cancelCourseDeleteButton">
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
import { mapActions, mapGetters } from "vuex";
export default {
  components: { BaseButton, BaseModal },
  props: {
    isOpenedCourseDeleteModal: {
      type: Boolean,
      default: false,
    },
    courseToDelete: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapGetters(("courses", ["courses"])),
    courses() {
      return this.courses;
    },
  },
  watch: {
    isOpenedCourseDeleteModal() {
      this.$refs.CourseDeleteModal.openModal();
    },
  },
  methods: {
    ...mapActions("courses", ["deleteCourseFromState"]),
    submitCourseDeleteButton(id) {
      this.deleteCourseFromState(id);
      this.$refs.CourseDeleteModal.closeModal();
    },
    cancelCourseDeleteButton() {
      this.$refs.CourseDeleteModal.closeModal();
    },
  },
};
</script>
