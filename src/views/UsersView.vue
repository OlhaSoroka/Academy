<template>
  <div class="users__container">
    <div class="users__topbar_container">
      <div>
        <h2 class="users__header">
          Users Dashboard
        </h2>
        <h3 class="users__subheader">
          Users list of InventorSoft Academy
        </h3>
      </div>
      <div v-if="isManager || isAdmin">
        <BaseButton
          :loading="usersLoadingStatus"
          @click.prevent="openCreateModal"
        >
          Add new user
        </BaseButton>
      </div>
    </div>
    <div v-if="isUser">
      <div v-if="users">
        <div class="users-table-container">
          <BaseTable
            :table-data="{
              headingData: headersUser,
              bodyData: users,
            }"
            :edit-btns="false"
            :is-data-loading="usersLoadingStatus"
            :delete-btns="false"
          />
        </div>
      </div>
    </div>
    <div
      v-else-if="isManager"
      class="ManagerMembersView"
    >
      <div v-if="users">
        <div class="users-table-container">
          <BaseTable
            :table-data="{
              headingData: headersAdmin,
              bodyData: users,
            }"
            :edit-btns="true"
            :is-data-loading="usersLoadingStatus"
            :delete-btns="true"
            @edit="openEditModal"
            @delete="openDeleteModal"
          />
        </div>
      </div>
      <UserEditModal
        :is-opened-user-edit-modal="isEditModalOpen"
        :target-user-value="targetUser"
        :user-inputs-value="adminUserEditInputs"
      />
      <UserCreateModal
        :is-opened-user-create-modal="isCreateModalOpen"
        :user-inputs-value="adminUserCreateInputs"
      />
      <BaseDeleteModal
        :toggle-modal="isDeleteModalOpen"
        :target-value="targetUser.fullName"
        @delete="submitDelete"
      />
    </div>
    <div v-else-if="isAdmin">
      <div v-if="users">
        <div class="users-table-container">
          <BaseTable
            :table-data="{
              headingData: headersAdmin,
              bodyData: users,
            }"
            :edit-btns="true"
            :is-data-loading="usersLoadingStatus"
            :delete-btns="true"
            @edit="openEditModal"
            @delete="openDeleteModal"
          />
        </div>
      </div>
      <UserEditModal
        :is-opened-user-edit-modal="isEditModalOpen"
        :target-user-value="targetUser"
        :user-inputs-value="adminUserEditInputs"
      />
      <UserCreateModal
        :is-opened-user-create-modal="isCreateModalOpen"
        :user-inputs-value="adminUserCreateInputs"
      />
      <BaseDeleteModal
        :toggle-modal="isDeleteModalOpen"
        :target-value="targetUser.fullName"
        @delete="submitDelete"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  USER_ROLE,
  MANAGER_ROLE,
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
      targetUser: {
        id: null,
        fullName: "",
        email: "",
        course: "",
        initialScore: "",
      },
      adminUserEditInputs: [
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
          label: "Initial Score",
          model: "initialScore",
          type: "number",
          placeholder: "Enter initial score",
        },
      ],
      adminUserCreateInputs: [
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
        {
          label: "Initial Score",
          model: "initialScore",
          type: "number",
          placeholder: "Enter initial score",
        },
      ],
      headersUser: [
        { fullName: "Full Name" },
        { email: "Email" },
        { course: "Course" },
      ],
      headersAdmin: [
        { fullName: "Full Name" },
        { email: "Email" },
        { course: "Course" },
        { initialScore: "Initial Score" }
      ],
    };
  },
  computed: {
    ...mapGetters("users", ["usersLoadingStatus", "users"]),
    ...mapGetters("user", ["user"]),
    isUser() {
      if (this.user) {
        return this.user.role === USER_ROLE;
      } else {
        return false;
      }
    },
    isManager() {
      if (this.user) {
        return this.user.role === MANAGER_ROLE;
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
    },
  },
  async mounted() {
    await this.fetchUsers();
  },
  methods: {
    ...mapActions("users", ["fetchUsers", "deleteUser"]),
    openEditModal(id) {
      this.targetUser = JSON.parse(
        JSON.stringify(this.users.find((e) => e.id === id))
      );
      this.isEditModalOpen = !this.isEditModalOpen;
    },
    openCreateModal() {
      this.isCreateModalOpen = !this.isCreateModalOpen;
    },
    openDeleteModal(id) {
      this.targetUser = this.users.find((e) => e.id === id);
      this.isDeleteModalOpen = !this.isDeleteModalOpen;
    },
    submitDelete() {
      this.deleteUser(this.targetUser.id);
    },
  },
};
</script>
<style lang="postcss" scoped>
.users__container {
  @apply w-full p-10 mx-auto;
}
.users-table-container {
  @apply w-full border-2 border-stone-200 shadow-md rounded-md mt-5 p-5;
}
.users__topbar_container {
  @apply w-full flex justify-between items-center;
}
.users__header {
  @apply font-semibold text-lg text-start text-sky-700;
}
.users__subheader {
  @apply mt-2 font-normal text-stone-400;
}
</style>
