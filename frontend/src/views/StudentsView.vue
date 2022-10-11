<template>
  <div class="users__container">
    <div class="users__topbar_container">
      <div>
        <h2 class="users__header">
          Students Dashboard
        </h2>
        <h3 class="users__subheader">
          Students list of InventorSoft Academy
        </h3>
      </div>
      <div v-if="isMentor || isAdmin">
        <BaseButton
          :loading="studentsLoadingStatus"
          @click.prevent="openCreateModal"
        >
          Add new student
        </BaseButton>
      </div>
    </div>
    <div v-if="isStudent">
      <div v-if="students">
        <div class="users-table-container">
          <BaseTable
            :table-data="{
              headingData: headersStudent,
              bodyData: studentListForStudent(),
            }"
            :edit-btns="false"
            :is-data-loading="studentsLoadingStatus"
            :delete-btns="false"
          />
        </div>
      </div>
    </div>
    <div
      v-else-if="isMentor"
      class="MentorMembersView"
    >
      <div v-if="students">
        <div class="users-table-container">
          <BaseTable
            :table-data="{
              headingData: headersStudentAdminView,
              bodyData: students,
            }"
            :edit-btns="true"
            :is-data-loading="studentsLoadingStatus"
            :delete-btns="true"
            @edit="openEditModal"
            @delete="openDeleteModal"
          />
        </div>
      </div>
      <UserEditModal
        :is-opened-user-edit-modal="isEditModalOpen"
        :target-user-value="targetStudent"
        :user-inputs-value="adminStudentEditInputs"
      />
      <UserCreateModal
        :is-opened-user-create-modal="isCreateModalOpen"
        :user-inputs-value="adminStudentCreateInputs"
      />
      <BaseDeleteModal
        :toggle-modal="isDeleteModalOpen"
        :target-value="targetStudent.fullName"
        @delete="submitDelete"
      />
    </div>
    <div v-else-if="isAdmin">
      <div v-if="students">
        <div class="users-table-container">
          <BaseTable
            :table-data="{
              headingData: headersStudentAdminView,
              bodyData: students,
            }"
            :edit-btns="false"
            :is-data-loading="studentsLoadingStatus"
            :delete-btns="true"
            @edit="openEditModal"
            @delete="openDeleteModal"
          />
        </div>
      </div>
      <UserEditModal
        :is-opened-user-edit-modal="isEditModalOpen"
        :target-user-value="targetStudent"
        :user-inputs-value="adminStudentEditInputs"
      />
      <UserCreateModal
        :is-opened-user-create-modal="isCreateModalOpen"
        :user-inputs-value="adminStudentCreateInputs"
      />
      <BaseDeleteModal
        :toggle-modal="isDeleteModalOpen"
        :target-value="targetStudent.fullName"
        @delete="submitDelete"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  STUDENTS_ROLE,
  MENTOR_ROLE,
  ADMIN_ROLE,
} from "@/constants/roles.constant";
import BaseTable from "../components/BaseComponents/BaseTable/BaseTable";
import BaseButton from "../components/BaseComponents/BaseButton";
import UserCreateModal from "../components/Modals/UserCreateModal";
import UserEditModal from "../components/Modals/UserEditModal";
import BaseDeleteModal from "../components/BaseComponents/BaseDeleteModal";

export default {
  name: "UsersView",
  components: {
    BaseTable,
    BaseButton,
    UserCreateModal,
    UserEditModal,
    BaseDeleteModal,
  },
  data() {
    return {
      isCreateModalOpen: false,
      isEditModalOpen: false,
      isDeleteModalOpen: false,
      targetStudent: {
        id: null,
        fullName: "",
        email: "",
        course: "",
      },
      adminStudentEditInputs: [
      {
          label: "Full Name",
          model: "fullName",
          type: "text",
          placeholder: "Enter name",
        },
        {
          label: "Email",
          model: "email",
          type: "email",
          placeholder: "Enter email",
        },

      ],
      adminStudentCreateInputs: [
        {
          label: "Full Name",
          model: "fullName",
          type: "text",
          placeholder: "Enter name",
        },
        {
          label: "Email",
          model: "email",
          type: "email",
          placeholder: "Enter email",
        },
        {
          label: "Password",
          model: "password",
          type: "password",
          placeholder: "Enter password",
          vid: "password",
        },
        {
          label: "Confirm password",
          model: "confirmpassword",
          type: "password",
          vid: "confirmpassword",
          placeholder: "Confirm password",
        },
      ],
      headersStudent: [
        { fullName: "Full Name" },
        { email: "Email" },
        { course: "Course" },
      ],
      headersStudentAdminView: [
        { fullName: "Full Name" },
        { email: "Email" },
        { course: "Course" }
      ],
    };
  },
  computed: {
    ...mapGetters("students", ["studentsLoadingStatus", "students"]),
    ...mapGetters("user", ["user"]),
    isStudent() {
      if (this.user) {
        return this.user.role === STUDENTS_ROLE;
      } else {
        return false;
      }
    },
    isMentor() {
      if (this.user) {
        return this.user.role === MENTOR_ROLE;
      } else {
        return false;
      }
    },
    isAdmin() {
      if (this.user) {
        return this.user.role === ADMIN_ROLE;
      } else {
        return false;
      }
    }
  },
  async mounted() {
    await this.fetchStudents();
  },
  methods: {
    ...mapActions("students", ["fetchStudents", "deleteStudent"]),
    openEditModal(id) {
      this.targetStudent = JSON.parse(
        JSON.stringify(this.students.find((e) => e.id === id))
      );
      this.isEditModalOpen = !this.isEditModalOpen;
    },
    openCreateModal() {
      this.isCreateModalOpen = !this.isCreateModalOpen;
    },
    openDeleteModal(id) {
      this.targetStudent = this.students.find((e) => e.id === id);
      this.isDeleteModalOpen = !this.isDeleteModalOpen;
    },
    submitDelete() {
      this.deleteStudent(this.targetStudent.id);
    },
    studentListForStudent() {
    return this.students.filter((e) => e.course === this.user.course);
    }
  },
};
</script>
<style lang="postcss" scoped>
.users__container {
  @apply w-full p-10 mx-auto;
}
.users-table-container {
  @apply w-full border-2 border-stone-200 shadow-md rounded-md mt-5 p-5 bg-white;
}
.users__topbar_container {
  @apply w-full flex justify-between items-center;
}
.users__header {
  @apply font-semibold text-lg text-start text-primary-700;
}
.users__subheader {
  @apply mt-2 font-normal text-stone-400;
}
</style>
