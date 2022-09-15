<template>
  <BaseModal
    ref="newGroupMemberModal"
    :header="'Add new group result'"
    @isClosed="clearInputs()"
  >
    <template #body>
      <div class="flex justify-center flex-col mt-7 gap-10">
        <div class="w-[256px] mx-1 flex flex-col">
          <label
            v-if="getGroup.length"
            for="applicants"
            class="select__label"
          >Select a member of group, whose result you want to add
          </label>
          <label
            v-else
            for="applicants"
            class="select__label"
          >All group members have results added
          </label>

          <select
            id="applicants"
            v-model="newApplicant"
            :disabled="!getGroup.length"
            class="select__resuls"
          >
            <option
              v-for="user in getGroup"
              :key="user.id"
              :value="user.id"
            >
              {{ user.fullName }}
            </option>
          </select>
          <BaseInput
            v-model="score"
            class="mt-5"
            :type="'number'"
            :vid="'Result'"
            :disabled="!getGroup.length"
            placeholder="Type score here..."
          />
        </div>
        <div class="mx-1 flex justify-around">
          <BaseButton
            variant="btn_red"
            @click="cancelModal"
          >
            Cancel
          </BaseButton>
          <BaseButton
            :disabled="!(newApplicant.length && score.length && score >= 0)"
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
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
export default {
  components: { BaseButton, BaseModal, BaseInput },
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
      newApplicant: "",
      score: "",
    };
  },
  computed: {
    ...mapGetters("students", ["students"]),
    ...mapGetters("courses", ["getCourseById"]),
    getGroup() {
      return this.currentCourse.group.filter((groupMember) => {
        return !this.currentCourse.results.some(
          (resulter) => resulter.id === groupMember.id
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
      this.newApplicant = "";
      this.score = "";
    },
    cancelModal() {
      this.$refs.newGroupMemberModal.closeModal();
      this.clearInputs();
    },
    confirmAdding({ id, course }) {
      const currentUser = this.students.find((el) => el.id === this.newApplicant);
      const updatedCourse = JSON.parse(JSON.stringify(course));
      updatedCourse.results.push({ ...currentUser, score: this.score });
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




.select__resuls {
  @apply block p-1 h-9 m-1 w-64 ml-1 border-2 border-primary-700 rounded-md text-base font-mono placeholder:text-slate-400 hover:bg-stone-50 focus:drop-shadow-xl focus:bg-stone-50 focus:border-primary-700 focus:outline-none focus:text-cyan-900 disabled:bg-gray-50 disabled:border-gray-300;
}
.select__label {
  @apply block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400;
}
</style>
