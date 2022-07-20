<template>
  <div>
    <div v-if="usersModel" 
    class="AdminMemberView">
      <h1>Admin Member view</h1>
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
    <AdminMemberEditModal
      :toggleOpenedAdminMemberEditModal="toggleOpenedAdminMemberEditModal"
      :targetUserValue="targetUser"
    />
    <AdminMemberCreateModal
      :toggleOpenedAdminMemberCreateModal="toggleOpenedAdminMemberCreateModal"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import BaseTable from "../components/UI/BaseTable/BaseTable";
import BaseButton from "../components/BaseButton";
import AdminMemberCreateModal from "../components/AdminMemberCreateModal";
import AdminMemberEditModal from "../components/AdminMemberEditModal";

export default {
  name: "AdminMembersView",
  components: {
    BaseTable,
    BaseButton,
    AdminMemberCreateModal,
    AdminMemberEditModal,
  },
  computed: {
    ...mapGetters(["usersLoadingStatus", "users"]),
  },
  methods: {
    ...mapActions(["fetchUsers", "deleteUser"]),
    async adminMemberFetchUsers() {
      await this.fetchUsers();
      if (this.users) {
        this.usersModel = this.users.filter((e) => e.role === "user");
      }
    },
    openAdminMemberEditModal(id) {
      this.targetUser = this.users.find((e) => e.id === id);
      this.toggleOpenedAdminMemberEditModal =
        !this.toggleOpenedAdminMemberEditModal;
    },
    openAdminMemberCreateModal() {
      this.toggleOpenedAdminMemberCreateModal =
        !this.toggleOpenedAdminMemberCreateModal;
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
      toggleOpenedAdminMemberCreateModal: false,
      toggleOpenedAdminMemberEditModal: false,
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
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  padding: 10px;
}

button {
  border: 3px solid;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
}
</style>