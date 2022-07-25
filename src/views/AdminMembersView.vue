<template>
  <div>
    <div v-if="usersModel" 
    class="AdminMemberView">
      <BaseTable
        :table-data="{
          headingData: headers,
          bodyData: usersModel,
        }"
        :edit-btns="true"
        :is-data-loading="usersLoadingStatus"
        :delete-btns="true"
        @on-edit="openAdminMemberEditModal"
        @on-delete="deteleteUserButton"
      />
      <BaseButton
        :loading="usersLoadingStatus"
        @click.prevent="openAdminMemberCreateModal"
      >
        Create new user
      </BaseButton>
    </div>
    <UserEditModal
      :isOpenedUserEditModal="isEditModalOpen"
      :targetUserValue="targetUser"
    />
    <UserCreateModal
      :isOpenedUserCreateModal="isCreateModalOpen"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import BaseTable from "../components/UI/BaseTable/BaseTable";
import BaseButton from "../components/BaseButton";
import UserCreateModal from "../components/UserCreateModal";
import UserEditModal from "../components/UserEditModal";

export default {
  name: "AdminMembersView",
  components: {
    BaseTable,
    BaseButton,
    UserCreateModal,
    UserEditModal,
  },
  computed: {
    ...mapGetters("users", ["usersLoadingStatus", "users"]),
  },
  methods: {
    ...mapActions("users", ["fetchUsers", "deleteUser"]),
    async adminMemberFetchUsers() {
      try {
        await this.fetchUsers();
        if (this.users) {
          this.usersModel = this.users.filter((e) => e.role === "user");
        }
      }catch (error) {
        console.log(error.message);
      }
    },
    openAdminMemberEditModal(id) {
      this.targetUser = this.users.find((e) => e.id === id);
      this.isEditModalOpen = !this.isEditModalOpen;
    },
    openAdminMemberCreateModal() {
      this.isCreateModalOpen = !this.isCreateModalOpen;
    },
    async deteleteUserButton(id) {
      await this.deleteUser(id);
      this.adminMemberFetchUsers();
    },
  },
  mounted() {
    this.adminMemberFetchUsers();
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
      },
      usersModel: [],
      headers: [{ fullName: "Name" }, { email: "Email" }, { course: "Course" }],
    };
  },
};
</script>
<style scoped>
.AdminMemberView {
  @apply flex flex-col flex-wrap content-center p-4;
}
button {
  @apply p-2 m-auto max-w-[15%] rounded-xl border-r-4 border-b-4 hover:border-t-4;
}
</style>