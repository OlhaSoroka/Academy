<template>
  <div class="flex justify-center flex-col">
    <h2>Courses Dashboard View</h2>
    <BaseTable
      :table-data="{
        headingData: headers,
        bodyData: courses,
      }"
      :edit-btns="true"
      :is-data-loading="loadingStatus"
      :delete-btns="false"
      @on-edit="goToCourse"
    />
    <AddEventForm v-show="showAddCourseForm" />
    <BaseButton 
      variant="btn_green" 
      :loading="usersLoadingStatus"
      @click="showAddCourseForm = !showAddCourseForm"
    >
      {{showAddCourseForm ? "x" :"Add new course"}}
    </BaseButton>
  </div>
</template>

<script>
import AddEventForm from "@/components/AddEventForm.vue";
import BaseButton from "../components/BaseButton";
import { mapActions, mapGetters } from "vuex";
import BaseTable from "../components/UI/BaseTable/BaseTable.vue";

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
    goToCourse(id){
      this.router.push(`/${id}`)
    }
  },
};
</script>

<style>

</style>
