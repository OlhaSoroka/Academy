<template>
  <div class="flex justify-center flex-col">
    <BaseTable
      :table-data="{
        headingData: headers,
        bodyData: courses,
      }"
      :edit-btns="false"
      :is-data-loading="loadingStatus"
      :delete-btns="false"
      :view-btns="true"
      @view="goToCourseDetailsView"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { COURSE_DETAILS } from "../constants/routes.constant";
import BaseTable from "../components/UI/BaseTable/BaseTable.vue";

export default {
  components: {
    BaseTable,
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
  computed: {
    ...mapGetters(["sortedCourses", "loadingStatus"]),
    courses() {
      return this.sortedCourses;
    },
  },
  mounted() {
    this.getCourses();
  },
  methods: {
    ...mapActions(["getCourses"]),
    goToCourseDetailsView(id) {
      this.$router.push({ name: COURSE_DETAILS, params: { id: id } });
    },
  },
};
</script>

<style></style>
