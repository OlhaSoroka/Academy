<template>
  <div class="flex justify-center flex-col">
    <BaseTable
      class="text-center"
      :table-data="{
        headingData: headers,
        bodyData: courses,
      }"
      :edit-btns="false"
      :is-data-loading="loadingStatus"
      :delete-btns="false"
      :view-btns="true"
      @view="goToCourseDetails"
    />
    <BaseButton @click="goToCourseDetails(sortedCourses[0].id)"> 
      Details 
    </BaseButton>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseTable from "../components/BaseComponents/BaseTable/BaseTable.vue";
import BaseButton from "../components/BaseComponents/BaseButton.vue";
import { COURSE_DETAILS } from "../constants/routes.constant";

export default {
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
    goToCourseDetails(id) {
      this.$router.push({ name: COURSE_DETAILS, params: { id: id } });
    },
  },
};
</script>
