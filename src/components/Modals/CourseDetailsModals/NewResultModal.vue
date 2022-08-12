<template>
  <BaseModal
    ref="newGroupMemberModal"
    :header="'Add new group result'"
    @isClosed="clearInputs()"
  >
    <template #body>
      <div class="flex justify-center flex-col mt-7  gap-10">
        <div class="mx-1">
          <label
            for="applicants"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >Select a member of group, whose result you want to add </label>

          <select
            id="applicants"
            v-model="newApplicant"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option
              v-for="(user) in getGroup"
              :key="user.id"
              :value="user.id"
            >
              {{ user.fullName }}
            </option>
          </select>
          <BaseInput
            v-model="score"
            placeholder="Type score here..."
          />
        </div>
        <div class="mx-1 flex gap-10">
          <BaseButton
            :disabled="!newApplicant.length"
            @click="confirmAdding({ id: currentRouteName, course: currentCourse })"
          >
            Add
          </BaseButton>
          <BaseButton
            variant="btn_red"
            @click="cancelModal"
          >
            Cancel
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
    manager: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      newApplicant: '',
      score: ''
    }
  },
  computed: {
    ...mapGetters('users', ['users']),
    ...mapGetters('courses', ['getCourseById']),
    currentRouteName() {
      const fullPath = this.$router.history.current.path
      const pathArray = fullPath.split('/')
      const id = pathArray[pathArray.length - 1]
      return id;
    },
    getGroup() {
      let res = this.currentCourse.group.filter(groupMember => {
        return !this.currentCourse.results.some(resulter => resulter.id === groupMember.id)
      })

      return res


    },
    currentCourse() {
      return this.getCourseById(this.currentRouteName)
    }
  },
  watch: {
    toggleModal() {
      this.$refs.newGroupMemberModal.openModal();
    },
  },

  async mounted() {
    this.fetchUsers()
  },

  methods: {
    ...mapActions("courses", ["updateCourse", 'getCourses']),
    ...mapActions('users', ['fetchUsers']),
    clearInputs() {
      this.newApplicant = ''
      this.score = ''
    },
    cancelModal() {
      this.$refs.newGroupMemberModal.closeModal();
      this.clearInputs()
    },
    confirmAdding({ id, course }) {
      const currentUser = this.users.find(el => el.id === this.newApplicant)
      const updatedCourse = JSON.parse(JSON.stringify(course))
      updatedCourse.results.push({ ...currentUser, score: this.score })
      this.updateCourse({ id, course: updatedCourse })
        .then(async () => {
          await this.getCourses();
        })
        .then(() => {
          this.$refs.newGroupMemberModal.closeModal();
        })
        .finally(() => this.clearInputs()
        )
    }
  },
};
</script>
