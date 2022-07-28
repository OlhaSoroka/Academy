<template>
  <div>
    <div v-if="isUser" 
    class="UserMembersView">
      <div v-if="users" 
      class="UsersView">
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
    <div v-else-if="isManager" 
    class="ManagerMembersView">
      <div v-if="users" 
      class="UsersView">
        <BaseTable
          :table-data="{
            headingData: headersManager,
            bodyData: users,
          }"
          :edit-btns="true"
          :is-data-loading="usersLoadingStatus"
          :delete-btns="true"
          @edit="openUsersViewEditModal"
          @delete="deteleteUserButton"
        />
        <BaseButton
          :loading="usersLoadingStatus"
          @click.prevent="openUsersViewCreateModal"
        >
          Create new user
        </BaseButton>
      </div>
      <UserEditModal
        :isOpenedUserEditModal="isEditModalOpen"
        :targetUserValue="targetUser"
        :userInputsValue="managerUserEditInputs"
      />
      <UserCreateModal
        :isOpenedUserCreateModal="isCreateModalOpen"
        :userInputsValue="managerUserCreateInputs"
      />
    </div>
    <div v-else-if="isAdmin" 
    class="AdminMembersView">
      <div v-if="users" 
      class="UsersView">
        <BaseTable
          :table-data="{
            headingData: headersAdmin,
            bodyData: users,
          }"
          :edit-btns="true"
          :is-data-loading="usersLoadingStatus"
          :delete-btns="true"
          @edit="openUsersViewEditModal"
          @delete="deteleteUserButton"
        />
        <BaseButton
          :loading="usersLoadingStatus"
          @click.prevent="openUsersViewCreateModal"
        >
          Create new user
        </BaseButton>
      </div>
      <UserEditModal
        :isOpenedUserEditModal="isEditModalOpen"
        :targetUserValue="targetUser"
        :userInputsValue="adminUserEditInputs"
      />
      <UserCreateModal
        :isOpenedUserCreateModal="isCreateModalOpen"
        :userInputsValue="adminUserCreateInputs"
      />
    </div>
    <div
      v-if="error"
      class="text-red-600 text"
    >
      Error! {{ error }}
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { USER_ROLE, MANAGER_ROLE, ADMIN_ROLE } from "@/constants/roles.constant";
import BaseTable from "../components/UI/BaseTable/BaseTable";
import BaseButton from "../components/BaseButton";
import UserCreateModal from "../components/UserCreateModal";
import UserEditModal from "../components/UserEditModal";

export default {
  name: "UsersView",
  components: {
    BaseTable,
    BaseButton,
    UserCreateModal,
    UserEditModal,
  },
  computed: {
    ...mapGetters("users", ["usersLoadingStatus", "users", "error"]),
    ...mapGetters("user", ["user"]),
    isUser() {
      return this.user.role === USER_ROLE;
    },
    isManager() {
      return this.user.role === MANAGER_ROLE;
    },
    isAdmin() {
      return this.user.role === ADMIN_ROLE;
    },
  },
  methods: {
    ...mapActions("users", ["fetchUsers", "deleteUser"]),
    openUsersViewEditModal(id) {
      this.targetUser = this.users.find((e) => e.id === id);
      this.isEditModalOpen = !this.isEditModalOpen;
    },
    openUsersViewCreateModal() {
      this.isCreateModalOpen = !this.isCreateModalOpen;
    },
    deteleteUserButton(id) {
      this.deleteUser(id);
    },
  },
  async mounted() {
     await this.fetchUsers();
  },
  data() {
    return {
      isCreateModalOpen: false,
      isEditModalOpen: false,
      targetUser: {
        id: null,
        fullName: "",
        email: "",
        course: "",
        initialScore: "",
      },
      managerUserEditInputs: [
        {
          label: "Name",
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
          label: "Course",
          model: "course",
          type: "text",
          placeholder: "Enter course",
        },
        {
          label: "Initial Score",
          model: "initialScore",
          type: "number",
          placeholder: "Enter initial score",
        },
      ],
      managerUserCreateInputs: [
        {
          label: "Name",
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
        },
      ],
      adminUserEditInputs: [
        {
          label: "Name",
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
          label: "Course",
          model: "course",
          type: "text",
          placeholder: "Enter course",
        },
      ],
      adminUserCreateInputs: [
        {
          label: "Name",
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
        },
        {
          label: "Course",
          model: "course",
          type: "text",
          placeholder: "Enter course",
        },
        {
          label: "Initial Score",
          model: "initialScore",
          type: "number",
          placeholder: "Enter initial score",
        },
      ],
      headersUser: [
        { fullName: "Name" },
        { email: "Email" },
        { course: "Course" },
      ],
      headersManager: [
        { fullName: "Name" },
        { email: "Email" },
        { course: "Course" },
        { initialScore: "Initial Score" },
      ],
      headersAdmin: [
        { fullName: "Name" },
        { email: "Email" },
        { course: "Course" },
      ],
    };
  },
};
</script>
<style scoped>
.UsersView {
  @apply flex flex-col flex-wrap content-center p-4;
}
button {
  @apply p-2 m-auto max-w-[15%] rounded-xl border-r-4 border-b-4 hover:border-t-4;
}
</style>