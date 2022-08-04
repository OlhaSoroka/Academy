<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(addEvent)">
      <div class="add-event-forn">
        <BaseInput
          v-model="courseToAdd.name"
          type="text"
          label="Course Name"
          placeholder="Course Name"
        />
        <BaseInput
          v-model="courseToAdd.date"
          type="date"
          label="Date"
        />
        <div class="add-event-button">
          <BaseButton
            variant="btn_green"
            type="submit"
            @click="addEvent"
          >
            Add
          </BaseButton>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import BaseButton from "@/components/BaseComponents/BaseButton.vue";
import BaseInput from "@/components/BaseComponents/BaseInput";
import { mapGetters, mapActions } from "vuex"
export default {
  name: "AddEventForm",
  components: { BaseInput, BaseButton, ValidationObserver },
  data() {
    return {
      courseToAdd: {
        id: 0,
        name: "",
        date: "",
      },
    }
  },
  computed: {
    ...mapGetters('courses', ["courses"])
  },
  methods: {
    ...mapActions('courses', ["addCourseToState"]),
    addEvent() {
      let newCourse = { ...this.courseToAdd }
      const { name, date } = newCourse;
      if (name !== "" && date !== "") {
        if (this.courses.length > 0) {
          const ids = this.courses.map(course => {
            return course.id;
          });
          newCourse.id = Math.max(...ids) + 1;
        } else {
          newCourse.id = 1;
        }
        this.courseToAdd.name = "";
        this.courseToAdd.date = "";

        newCourse = {
          ...newCourse,
          applicants: [],
          comments: [],
          docs_link: '',
          group: [],
          homework: [],
          results: [],
          status: "in future",
        }
        // console.log(newCourse);
        this.addCourseToState(newCourse)
      }
    }
  }
};
</script>

<style>
.add-event-forn {
  @apply m-2 flex justify-center;
}

.add-event-button {
  @apply mt-6;
}
</style>