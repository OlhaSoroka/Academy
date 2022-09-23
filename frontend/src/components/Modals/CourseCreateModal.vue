<template>
  <BaseModal
    ref="courseCreateModal"
    :header="'Add new course'"
    @isClosed="clearInputs()"
  >
    <template #body>
      <ValidationObserver v-slot="{ invalid }">
        <div class="w-72">
          <BaseInput
            v-model="courseToAdd.name"
            type="text"
            label="Course Name"
            placeholder="Course Name"
            rules="required"
          />
          <BaseInput
            v-model="courseToAdd.date"
            type="date"
            label="Date of starting"
            rules="required"
            onkeydown="return false"
          />
          <BaseInput
            v-model="courseToAdd.homework_quantity"
            type="number"
            label="Quantity of homework"
            rules="required"
          />
          <BaseInput
            v-model="courseToAdd.date_project_start"
            type="date"
            label="Date of starting project"
            onkeydown="return false"
          />
          <BaseInput
            v-model="courseToAdd.date_project_demo"
            type="date"
            label="Date of demo"
            onkeydown="return false"
          />
          <BaseInput
            v-model="courseToAdd.date_final_interview"
            type="date"
            label="Date of final interview"
            onkeydown="return false"
          />
          <div class="w-full text-left ml-1">
            <label for="status">Status</label>
          </div>
          <select
            id="status"
            v-model="courseToAdd.status"
            rules="required"
            class="block p-1 m-1 w-full ml-1 border-2 border-primary-700 rounded-md text-base font-mono placeholder:text-slate-400 hover:bg-stone-50 focus:drop-shadow-xl focus:bg-stone-50 focus:border-primary-700 focus:outline-none focus:text-cyan-900"
          >
            <option
              v-for="status in statuses"
              :key="status"
              :value="status"
            >
              {{ status }}
            </option>
          </select>
          <div class="flex justify-evenly mt-5">
            <div class="mx-2">
              <BaseButton
                :disabled="false"
                variant="btn_red"
                @click="canselCourseCreateButton"
              >
                Cancel
              </BaseButton>
            </div>
            <div class="mx-2">
              <BaseButton
                type="submit"
                :disabled="invalid"
                @click="submitCourseCreateButton"
              >
                Create
              </BaseButton>
            </div>
          </div>
        </div>
      </ValidationObserver>
    </template>
  </BaseModal>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import BaseButton from "@/components/BaseComponents/BaseButton.vue";
import BaseInput from "@/components/BaseComponents/BaseInput";
import BaseModal from "@/components/BaseComponents/BaseModal";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CourseCreateModal",
  components: { BaseInput, BaseButton, ValidationObserver, BaseModal },
  props: {
    isOpenedCourseCreateModal: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      courseToAdd: {
        id: 0,
        name: "",
        date: "",
        homework_quantity: 0,
        date_project_start: "",
        date_project_demo: "",
        date_final_interview: "",
        status: "not started",
      },
      statuses: ["not started", "in progress", "finished"],
    };
  },
  computed: {
    ...mapGetters("courses", ["courses"]),
  },
  watch: {
    isOpenedCourseCreateModal() {
      this.$refs.courseCreateModal.openModal();
    },
  },
  methods: {
    ...mapActions("courses", ["createNewCourse"]),
    clearInputs() {
      this.courseToAdd = {
        name: "",
        date: "",
        homework_quantity: 0,
        date_project_start: "",
        date_project_demo: "",
        date_final_interview: "",
        status: "not started",
      };
    },
    submitCourseCreateButton() {
      let newCourse = { ...this.courseToAdd };
      const { name, date, status } = newCourse;
      if (name !== "" && date !== "" && status !== "") {
        if (this.courses.length > 0) {
          const ids = this.courses.map((course) => {
            return course.id;
          });
          newCourse.id = Math.max(...ids) + 1;
        } else {
          newCourse.id = 1;
        }
        newCourse = {
          ...newCourse,
          applicants: [],
          comments: [],
          docs_link: "",
          group: [],
          homework: [],
          homework_results: [],
          results: [],
          materials: [],
        };
        this.createNewCourse(newCourse);
        this.$refs.courseCreateModal.closeModal();
      }
    },
    canselCourseCreateButton() {
      this.$refs.courseCreateModal.closeModal();
      this.clearInputs();
    },
  },
};
</script>