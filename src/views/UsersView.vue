<template>
  <div>
    <div v-if="isUser" 
    class="UserMembersView">
      <div v-if="usersModel" 
      class="UsersView">
        <BaseTable
          :table-data="{
            headingData: headersUser,
            bodyData: usersModel,
          }"
          :edit-btns="false"
          :is-data-loading="usersLoadingStatus"
          :delete-btns="false"
        />
      </div>
    </div>
    <div v-else-if="isManager" 
    class="ManagerMembersView">
      <div v-if="usersModel" 
      class="UsersView">
        <BaseTable
          :table-data="{
            headingData: headersManager,
            bodyData: usersModel,
          }"
          :edit-btns="true"
          :is-data-loading="usersLoadingStatus"
          :delete-btns="true"
          @on-edit="openUsersViewEditModal"
          @on-delete="deteleteUserButton"
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
        :fetchEditedUser="UsersViewFetchUsers"
        :userInputsValue="managerUserEditInputs"
      />
      <UserCreateModal
        :isOpenedUserCreateModal="isCreateModalOpen"
        :fetchCreatedUser="UsersViewFetchUsers"
        :userInputsValue="managerUserCreateInputs"
      />
    </div>
    <div v-else-if="isAdmin" 
    class="AdminMembersView">
      <div v-if="usersModel" 
      class="UsersView">
        <BaseTable
          :table-data="{
            headingData: headersAdmin,
            bodyData: usersModel,
          }"
          :edit-btns="true"
          :is-data-loading="usersLoadingStatus"
          :delete-btns="true"
          @on-edit="openUsersViewEditModal"
          @on-delete="deteleteUserButton"
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
        :fetchEditedUser="UsersViewFetchUsers"
        :userInputsValue="adminUserEditInputs"
      />
      <UserCreateModal
        :isOpenedUserCreateModal="isCreateModalOpen"
        :fetchCreatedUser="UsersViewFetchUsers"
        :userInputsValue="adminUserCreateInputs"
      />
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
    ...mapGetters("users", ["usersLoadingStatus", "users"]),
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
    async UsersViewFetchUsers() {
      try {
        await this.fetchUsers();
        if (this.users) {
          this.usersModel = this.users.filter((e) => e.role === "user");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    openUsersViewEditModal(id) {
      this.targetUser = this.users.find((e) => e.id === id);
      this.isEditModalOpen = !this.isEditModalOpen;
    },
    openUsersViewCreateModal() {
      this.isCreateModalOpen = !this.isCreateModalOpen;
    },
    async deteleteUserButton(id) {
      await this.deleteUser(id);
      this.UsersViewFetchUsers();
    },
  },
  mounted() {
    this.UsersViewFetchUsers();
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
      usersModel: [],
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