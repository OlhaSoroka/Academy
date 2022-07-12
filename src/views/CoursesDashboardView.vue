<template>
  <div>
    CoursesDashboardView
    <BaseButton
      @click="
        $router.push({
          name: 'courses-details',
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
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    BaseButton,
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
