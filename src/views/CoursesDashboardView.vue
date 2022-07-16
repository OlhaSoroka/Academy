<template>
  <div>
    CoursesDashboardView
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
  </div>
</template>
<script>
import BaseButton from "../components/BaseButton.vue";
import { COURSE_DETAILS } from "../constants/routes.constant";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      COURSE_DETAILS,
    };
  },
  computed: {
    ...mapGetters(["sortedCourses"]),
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
