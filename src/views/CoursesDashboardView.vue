<template>
  <div class="courses__container">
    <h2 class="courses__header">
      Courses Dashboard 
    </h2>
    <h3 class="courses__subheader">
      Courses list of InventorSoft Academy
    </h3>
    <div v-if="isUser">
      <div class="courses__table_container">
        <BaseTable
          class="text-center"
          :table-data="{
            headingData: headersUser,
            bodyData: courses,
          }"
          :edit-btns="false"
          :is-data-loading="loadingStatus"
          :delete-btns="false"
          :view-btns="true"
          @view="goToCourseDetails"
        />
      </div>
    </div>
    <div v-else-if="isManagerOrAdmin">
      <div class="courses__table_container">
        <BaseTable
          class="text-center"
          :table-data="{
            headingData: headersManager,
            bodyData: courses,
          }"
          :edit-btns="false"
          :is-data-loading="loadingStatus"
          :delete-btns="true"
          :view-btns="true"
          @delete="deleteCourse"
          @view="goToCourseDetails"
        />
      </div>
      <AddEventForm v-show="showAddCourseForm" />
      <div class="flex justify-evenly items-center mt-3">
        <BaseButton 
          :loading="loadingStatus"
          @click="showAddCourseForm = !showAddCourseForm"
        >
          {{ showAddCourseForm ? "Close" :"Add new course" }}
        </BaseButton>
      </div>
    </div>
    <div v-else>
      <h3>No courses</h3>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseTable from "../components/BaseComponents/BaseTable/BaseTable.vue";
import { COURSE_DETAILS } from "../constants/routes.constant";
import BaseButton from "../components/BaseComponents/BaseButton.vue";
import AddEventForm from "@/components/AddEventForm.vue";
import {
  USER_ROLE,
  MANAGER_ROLE,
  ADMIN_ROLE,
} from "@/constants/roles.constant";

export default {
  components: {
    BaseTable,
    BaseButton,
    AddEventForm
  },
  data() {
    return {
      showAddCourseForm: false,
      headersUser: [
        { name: "Course Name" },
        { date: "Date" },
        { status: "Status" },
      ],
      headersManager: [
        { name: "Course Name" },
        { date: "Date" },
      ],
    };
  },
  computed: {
    ...mapGetters('courses', ["sortedCourses", "loadingStatus"]),
    courses() {
      return this.sortedCourses;
    },
    ...mapGetters("user", ["user"]),
    isUser() {
      return this.user.role === USER_ROLE;
    },
    isManagerOrAdmin() {
      return this.user.role === MANAGER_ROLE || ADMIN_ROLE;
    },
  },
  mounted() {
    this.getCourses();
  },
  methods: {
    ...mapActions('courses', ["getCourses", "deleteCourseFromState"]),
    goToCourseDetails(id) {
      this.$router.push({ name: COURSE_DETAILS, params: { id: id } });
    },
    deleteCourse(id){
      this.deleteCourseFromState(id)
    },
    editCourse(){
      this.showAddCourseForm = !this.showAddCourseForm
    }
  },
};
</script>

<style lang="postcss" scoped>
.courses__container{
 @apply flex justify-center flex-col w-2/3 mt-10 mx-auto;
}
.courses__header{
@apply font-semibold text-lg text-start text-sky-700;
}
.courses__subheader{
@apply mt-2 font-normal text-stone-400 text-start;
}
.courses__table_container{
  @apply w-full border-2 border-stone-200 shadow-md rounded-md mt-5 p-5;
}
button {
  @apply max-w-xs;
}
</style>
