<template>
  <div class="h-full w-full overflow-hidden">
    <div
      class="
        w-fit
        absolute
        mt-[50vh]
        -translate-y-1/2
        ml-[40vw]
        -translate-x-1/2
      "
    >
      <h1>ERROR 404: Page Not Found</h1>
      <h2>
        Looks like you've followed a broken link or entered a URL that doesn't
        exist on this site.
      </h2>
      <h2>
        You can back to
        <BaseButton
          class="max-w-fit"
          @click="goToCourses"
        >
          Courses
        </BaseButton>
      </h2>
    </div>
  </div>
</template>

<script>
import { COURSE_DASHBOARD } from "../constants/routes.constant";
import BaseButton from "../components/BaseComponents/BaseButton.vue";

export default {
  components: {
    BaseButton,
  },
  methods: {
    goToCourses() {
      this.$router.push({ name: COURSE_DASHBOARD });
    },
  },
};
</script>
