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
      :toggleOpenedAdminMemberEditModal="toggleOpenedEditModal"
      :targetUserValue="targetUser"
    />
    <AdminMemberCreateModal
      :toggleOpenedAdminMemberCreateModal="toggleOpenedCreateModal"
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
      this.toggleOpenedEditModal = !this.toggleOpenedEditModal;
    },
    openAdminMemberCreateModal() {
      this.toggleOpenedCreateModal = !this.toggleOpenedCreateModal;
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
      toggleOpenedCreateModal: false,
      toggleOpenedEditModal: false,
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