<template>
  <div class="flex justify-center flex-col">
    <h2>Courses Dashboard View</h2>
    <BaseTable
      :table-data="{
        headingData: headers,
        bodyData: courses,
      }"
      :edit-btns="false"
      :is-data-loading="loadingStatus"
      :delete-btns="false"
      :view-btns="true"
      @on-view="couserDetaislView"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
      cours: []
    };
  },
  computed: {
    ...mapGetters(["sortedCourses", "loadingStatus", "courses"]),
    courses() {
      return this.sortedCourses;
    },
  },
  mounted() {
    this.getCourses();
  },
  methods: {
    ...mapActions(["getCourses"]),
    couserDetaislView(id) {
      this.cours =  this.courses.find((e) => e.id === id)
      this.$router.push({ name: "courses-details", params: { id: id, courseList: this.cours} });
    },
  },
};
</script>

<style></style>
