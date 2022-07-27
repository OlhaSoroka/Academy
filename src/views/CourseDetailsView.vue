<template>
  <div>
    <div v-if="course">
      <BaseTable
        :table-data="{
          headingData: headers,
          bodyData: [course],
        }"
        :edit-btns="false"
        :is-data-loading="loadingStatus"
        :delete-btns="false"
      />
    </div>
    <div v-else>
      <h3>No courses</h3>
    </div>
    <BaseButton variant="btn_black" 
    @click="getBackCourseDetailsView"
      >Back</BaseButton
    >
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseTable from "../components/UI/BaseTable/BaseTable.vue";
import BaseButton from "../components/BaseButton";

export default {
  name: "CourseDetailsView",
  props: {
    id: {
      type: [String, Number],
      required: true,
    }
  },
  components: {
    BaseTable,
    BaseButton,
  },
  data() {
    return {
      headers: [
        { name: "Course Name" },
        { date: "Date" },
        { status: "Status" },
      ],
    };
  },
  methods: {
    ...mapActions(["getCourses"]),
    getBackCourseDetailsView() {
      this.$router.back();
    },
  },
  computed: {
    ...mapGetters(["loadingStatus", "courseById"]),
    course() {
      return this.courseById(this.$route.params.id);
    },
  },
  mounted() {
    this.getCourses();
  },
};
</script>
<style scoped>
button {
  @apply max-w-xs;
}
</style>

