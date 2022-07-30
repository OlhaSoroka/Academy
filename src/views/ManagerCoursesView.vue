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
    />
    <AddEventForm v-show="showAddCourseForm" />
    <div class=".manager-courses-buttons">
      <BaseButton
        @click="
          $router.push({
            name: COURSE_DETAILS,
            params: { id: sortedCourses[0].id },
          })
        "
      >
        Details
      </BaseButton>
      <BaseButton 
        variant="btn_green" 
        :loading="loadingStatus"
        @click="showAddCourseForm = !showAddCourseForm"
      >
        {{ showAddCourseForm ? "x" :"Add new course" }}
      </BaseButton>
    </div>
  </div>
</template>

<script>
import AddEventForm from "@/components/AddEventForm.vue";
import BaseButton from "../components/BaseComponents/BaseButton";
import { mapActions, mapGetters } from "vuex";
import BaseTable from "../components/BaseComponents/BaseTable/BaseTable.vue";

export default {
  components: {
    BaseTable, BaseButton, AddEventForm
  },
  data() {
    return {
      showAddCourseForm: false,
      headers: [
        { name: "Course Name" },
        { date: "Date" },
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
  },
};
</script>

<style>

</style>
