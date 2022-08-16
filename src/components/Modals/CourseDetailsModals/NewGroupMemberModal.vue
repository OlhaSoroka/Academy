<template>
  <BaseModal
    ref="newGroupMemberModal"
    :header="'Add new group member'"
    @isClosed="clearInputs()"
  >
    <template #body>
      <div class="flex justify-center flex-col mt-7 gap-10">
        <div class="mx-1">
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
            class="select__group_manager"
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
        <div class="mx-1 flex gap-10">
          <BaseButton
            variant="btn_red"
            @click="cancelModal"
          >
            Cancel
          </BaseButton>
          <BaseButton
            :disabled="!newGroupMember.length"
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
      newGroupMember: "",
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
    getApplicants() {
      return this.currentCourse.applicants.filter((applicant) => {
        return !this.currentCourse.group.some(
          (groupMember) => groupMember.id === applicant.id
        );
      });
    },
    currentCourse() {
      return this.getCourseById(this.currentRouteName);
    },
  },
  watch: {
    toggleModal() {
      this.$refs.newGroupMemberModal.openModal();
    },
  },
  async mounted() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions("courses", ["updateCourse", "getCourses"]),
    ...mapActions("users", ["fetchUsers"]),
    clearInputs() {
      this.newGroupMember = "";
    },
    cancelModal() {
      this.$refs.newGroupMemberModal.closeModal();
      this.clearInputs();
    },
    confirmAdding({ id, course }) {
      const currentUser = this.users.find(
        (el) => el.id === this.newGroupMember
      );
      const updatedCourse = JSON.parse(JSON.stringify(course));
      updatedCourse.group.push(currentUser);
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


.select__group_manager {
  @apply block p-1 m-1 w-64 ml-1 border-2 border-sky-700 rounded-md text-base font-mono placeholder:text-slate-400 hover:bg-stone-50 focus:drop-shadow-xl focus:bg-stone-50 focus:border-sky-700 focus:outline-none focus:text-cyan-900 disabled:bg-slate-400 disabled:border-gray-600;
}
.select__label {
  @apply block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400;
}
</style>