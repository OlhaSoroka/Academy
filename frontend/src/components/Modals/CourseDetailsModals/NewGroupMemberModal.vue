<template>
  <BaseModal
    ref="newGroupMemberModal"
    :header="'Add new group member'"
    @isClosed="clearInputs()"
  >
    <template #body>
      <div class="flex justify-center flex-col mt-7 gap-10">
        <div class="mx-1 flex flex-col items-center">
          <label
            v-if="getApplicants.length"
            for="applicants"
            class="select__label"
          >Select the applicant, to become a member of group</label>
          <label
            v-else
            for="applicants"
            class="select__label"
          >No applicants to add to course group
          </label>
          <select
            id="applicants"
            v-model="newGroupMember"
            :disabled="!getApplicants.length"
            class="select__group_mentor"
          >
            <option
              v-for="user in getApplicants"
              :key="user.id"
              :value="user.id"
            >
              {{ user.fullName }}
            </option>
          </select>
        </div>
        <div class="mx-1 flex justify-around">
          <BaseButton
            variant="btn_red"
            @click="cancelModal"
          >
            Cancel
          </BaseButton>
          <BaseButton
            :disabled="!newGroupMember.length"
            @click="
              confirmAdding({ id: id, course: currentCourse })
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
    mentor: {
      type: Object,
      default: null,
    },
    id: {
      type: Number,
      default: null,
    }
  },
  data() {
    return {
      newGroupMember: "",
    };
  },
  computed: {
    ...mapGetters("students", ["students"]),
    ...mapGetters("courses", ["getCourseById"]),
    getApplicants() {
      return this.currentCourse.applicants.filter((applicant) => {
        return !this.currentCourse.group.some(
          (groupMember) => groupMember.id === applicant.id
        );
      });
    },
    currentCourse() {
      return this.getCourseById(this.id);
    },
  },
  watch: {
    toggleModal() {
      this.$refs.newGroupMemberModal.openModal();
    },
  },
  async mounted() {
    this.fetchStudents();
  },
  methods: {
    ...mapActions("courses", ["updateCourse", "getCourses"]),
    ...mapActions("students", ["fetchStudents"]),
    clearInputs() {
      this.newGroupMember = "";
    },
    cancelModal() {
      this.$refs.newGroupMemberModal.closeModal();
      this.clearInputs();
    },
    confirmAdding({ id, course }) {
      const currentUser = this.students.find(
        (el) => el.id === this.newGroupMember
      );
      const updatedCourse = JSON.parse(JSON.stringify(course));
      updatedCourse.group.push(currentUser);
      updatedCourse.homework_results.push({
        students_name: currentUser.fullName, 
        id: currentUser.id, 
        hw1: 0,
        hw1repo: "",
        hw2: 0,
        hw2repo: "",
        hw3: 0,
        hw3repo: "",
        hw4: 0,
        hw4repo: "",
        hw5: 0,
        hw5repo: "",
        hw6: 0,
        hw6repo: "",
        hw7: 0,
        hw7repo: "",
        hw8: 0,
        hw8repo: "",
        hw9: 0,
        hw9repo: "",
        hw10: 0,
        hw10repo: "",
        hw11: 0,
        hw11repo: "",
        total: 0
        });
      this.updateCourse({ id, course: updatedCourse })
        .then(async () => {
          await this.getCourses();
        })
        .then(() => {
          this.$refs.newGroupMemberModal.closeModal();
        })
        .finally(() => this.clearInputs());
    },
  },
};
</script>
<style lang="postcss" scoped>




.select__group_mentor {
  @apply block p-1 m-1 w-64 ml-1 border-2 border-primary-700 rounded-md text-base font-mono placeholder:text-slate-400 hover:bg-stone-50 focus:drop-shadow-xl focus:bg-stone-50 focus:border-primary-700 focus:outline-none focus:text-cyan-900 disabled:bg-gray-50 disabled:border-gray-300;

}
.select__label {
  @apply block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400;
}
</style>