<template>
  <div class="flex justify-center flex-col w-2/3 mt-10 mx-auto">
    <h2 class="font-semibold text-lg text-start text-sky-700">
      Courses Dashboard 
    </h2>
    <h3 class="mt-2 font-normal text-stone-400 text-start">
      Courses list of InventorSoft Academy
    </h3>
    <div class="w-full border-2 border-stone-200 shadow-md rounded-md mt-5 p-5">
      <BaseTable
        :table-data="{
          headingData: headers,
          bodyData: courses,
        }"
        :edit-btns="false"
        :is-data-loading="loadingStatus"
        :delete-btns="false"
      />
    </div>
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

<style></style>
