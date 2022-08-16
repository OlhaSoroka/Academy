<template>
  <BaseModal
    ref="newApplicantModal"
    :header="'Add new applicant'"
    @isClosed="clearInputs()"
  >
    <template #body>
      <div class="flex justify-center flex-col mt-7 gap-10">
        <div class="mx-1">
          <label
            v-if="usersWithoutApplicants.length"
            for="applicants"
            class="select__label"
          >Select the user, to become an applicant</label>
          <label
            v-else
            for="applicants"
            class="select__label"
          >No users to apply to this course</label>
          <select
            id="applicants"
            v-model="newApplicant"
            :disabled="!usersWithoutApplicants.length"
            class="select__applicants"
          >
            <option
              v-for="user in usersWithoutApplicants"
              :key="user.id"
              :value="user.id"
            >
              {{ user.fullName }}
            </option>
          </select>
        </div>
        <div class="mx-1 flex gap-10">
          <BaseButton
            variant="btn_red"
            @click="cancelModal"
          >
            Cancel
          </BaseButton>
          <BaseButton
            :disabled="!newApplicant.length"
            @click="
              confirmAdding({ id: currentRouteName, course: currentCourse })
            "
          >
            Add
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseButton from "@/components/BaseComponents/BaseButton.vue";
import BaseModal from "@/components/BaseComponents/BaseModal.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { BaseButton, BaseModal },
  props: {
    toggleModal: {
      type: Boolean,
      default: false,
    },
    manager: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      newApplicant: "",
    };
  },
  computed: {
    ...mapGetters("users", ["users"]),
    ...mapGetters("courses", ["getCourseById"]),
    currentRouteName() {
      const fullPath = this.$router.history.current.path;
      const pathArray = fullPath.split("/");
      const id = pathArray[pathArray.length - 1];
      return id;
    },
    usersWithoutApplicants() {
      return this.users.filter((user) => {
        const { applicants } = this.currentCourse;
        return !applicants.some((applicant) => applicant.id === user.id);
      });
    },
    currentCourse() {
      return this.getCourseById(this.currentRouteName);
    },
  },
  watch: {
    toggleModal() {
      this.$refs.newApplicantModal.openModal();
    },
  },
  async mounted() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions("courses", ["updateCourse", "getCourses"]),
    ...mapActions("users", ["fetchUsers"]),
    clearInputs() {
      this.newApplicant = "";
    },
    cancelModal() {
      this.$refs.newApplicantModal.closeModal();
      this.clearInputs();
    },
    confirmAdding({ id, course }) {
      const currentUser = this.users.find((el) => el.id === this.newApplicant);
      const updatedCourse = JSON.parse(JSON.stringify(course));
      updatedCourse.applicants.push(currentUser);
      this.updateCourse({ id, course: updatedCourse })
        .then(async () => {
          await this.getCourses();
        })
        .then(() => {
          this.$refs.newApplicantModal.closeModal();
        })
        .finally(() => this.clearInputs());
    },
  },
};
</script>

<style lang="postcss" scoped>



.select__applicants {
  @apply block p-1 m-1 w-64 ml-1 border-2 border-sky-700 rounded-md text-base font-mono placeholder:text-slate-400 hover:bg-stone-50 focus:drop-shadow-xl focus:bg-stone-50 focus:border-sky-700 focus:outline-none focus:text-cyan-900 disabled:bg-gray-50 disabled:border-gray-300;
}

.select__label {
  @apply block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400;
}
</style>