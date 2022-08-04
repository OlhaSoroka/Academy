<template>
  <BaseModal
    ref="newApplicantModal"
    :header="'Confirm delete'"
  >
    <template #body>
      <div class="flex justify-center mt-7">
        <div class="mx-1">
          <select v-model="newUser">
            <option
              v-for="(user) in usersWithoutApplicants"
              :key="user.id"
              :value="user.id"
            >
              {{ user.fullName }}
            </option>
          </select>
        </div>
        <div class="mx-1">
          <BaseButton @click="confirmAdding({ id: currentRouteName, course: currentCourse })">
            Add
          </BaseButton>
          <BaseButton @click="cancelModal">
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
            newUser: 'Choose the user'
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
        usersWithoutApplicants() {
            return this.users.filter(user => {
                const { applicants } = this.currentCourse
                return !applicants.some(applicant => applicant.id === user.id)
            })
        },
        currentCourse() {
            return this.getCourseById(this.currentRouteName)
        }
    },
    watch: {
        toggleModal() {
            this.$refs.newApplicantModal.openModal();
        },
    },

    async mounted() {
        this.fetchUsers()
    },

    methods: {
        ...mapActions("courses", ["addNewApplicant", 'getCourses']),
        ...mapActions('users', ['fetchUsers']),
        cancelModal() {
            this.$refs.newApplicantModal.closeModal();
        },
        confirmAdding({ id, course }) {
            const currentUser = this.users.find(el => el.id === this.newUser)
            const updatedCourse = JSON.parse(JSON.stringify(course))
            updatedCourse.applicants.push(currentUser)
            this.addNewApplicant({ id, course: updatedCourse })
                .then(() => {
                    this.getCourses()
                })
                .then(() => {
                    this.$refs.newApplicantModal.closeModal();
                })
        }
    },
};
</script>
