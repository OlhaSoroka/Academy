<template>
  <div>
    <div 
    class="flex justify-center flex-col">
      <BaseTable
        :table-data="{
          headingData: headers,
          bodyData: courseList,
        }"
        :edit-btns="false"
        :is-data-loading="false"
        :delete-btns="false"
        :view-btns="false"
      />
    </div>
    <BaseButton variant="btn_black" 
    @click="getBackCourseDetailsView">Back</BaseButton>
  </div>
</template>

<script>
import BaseTable from "../components/UI/BaseTable/BaseTable.vue";
import BaseButton from "../components/BaseButton";

export default {
  name: "CourseDetailsView",
  props: {
    id: Number,
    courseList: Object
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
      test: {
        name: "Ilon Mask",
        date: "17/05/2022",
        status: "Not started yet",
      },
    };
  },
  mounted() {
    console.log(this.courseList, 'course list')
  },
  methods: {
    getBackCourseDetailsView() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
</style>

