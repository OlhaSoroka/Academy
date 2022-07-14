<template>
  <div>
    <div v-if="usersModel"
    class="AdminMemberView">
      <h1>Admin Member view</h1>
      <BaseTable
        :table-data="{
          headingData: this.headers,
          bodyData: this.usersModel,
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
    <BaseModal ref="adminMemberEditModal" 
    :header="'Edit User'">
      <template #body>
        <div class="flex flex-col items-center text-start mt-5">
          <BaseInput
            v-model="editModel[0].fullName"
            type="text"
            label="Name"
            :placeholder="editModel[0].fullName"
          />
          <BaseInput
            v-model="editModel[0].email"
            type="email"
            label="Email"
            :placeholder="editModel[0].email"
          />
          <BaseInput
            v-model="editModel[0].course"
            type="text"
            label="Course"
            :placeholder="editModel[0].course"
          />
          <div class="mt-5">
            <BaseButton
              :loading="usersLoadingStatus"
              :disabled="false"
              @click="submitAdminMemberEditButton"
            >
              Submit
            </BaseButton>
          </div>
        </div>
      </template>
    </BaseModal>
    <BaseModal ref="adminMemberCreateModal" 
    :header="'Create new User'">
      <template #body>
        <div class="flex flex-col items-center text-start mt-5">
          <BaseInput
            v-model="createModel.fullName"
            type="text"
            label="Name"
            placeholder="Paste name"
          />
          <BaseInput
            v-model="createModel.password"
            type=" password"
            label="Password"
            placeholder="Paste password"
          />
          <BaseInput
            v-model="createModel.email"
            type="email"
            label="Email"
            placeholder="Paste email"
          />
          <BaseInput
            v-model="createModel.course"
            type="text"
            label="Course name"
            placeholder="Paste course name"
          />
          <BaseInput
            v-model="createModel.initialScore"
            type="number"
            label="Start points"
            placeholder="Paste start points"
          />
          <div class="mt-5">
            <BaseButton
              :disabled="false"
              @click="submitAdminMemberCreateButton"
            >
              Submit
            </BaseButton>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import BaseTable from "../components/UI/BaseTable/BaseTable";
import BaseModal from "../components/BaseModal";
import BaseInput from "../components/BaseInput";
import BaseButton from "../components/BaseButton";

export default {
  name: "AdminMembersView",
  components: {
    BaseTable,
    BaseButton,
    BaseInput,
    BaseModal,
  },
  computed: {
    ...mapGetters(["usersLoadingStatus", "users"]),
  },
  methods: {
    ...mapActions(["fetchUsers", "updateUser", "createNewUser", "deleteUser"]),
    async adminMemberFetchUsers() {
      await this.fetchUsers();
      if (this.users) {
        this.usersModel = this.users.filter((e) => e.role === "user");
      }
    },
    openAdminMemberEditModal(id) {
      this.editModel = this.users.filter((e) => e.id === id);
      this.$refs.adminMemberEditModal.openModal();
    },
    async submitAdminMemberEditButton() {
      this.$refs.adminMemberEditModal.closeModal();
      await this.updateUser(this.editModel[0]);
      this.adminMemberFetchUsers();
    },
    openAdminMemberCreateModal() {
      this.$refs.adminMemberCreateModal.openModal();
    },
    async submitAdminMemberCreateButton() {
      this.$refs.adminMemberCreateModal.closeModal();
      await this.createNewUser(this.createModel);
      this.adminMemberFetchUsers();
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
      editModel: {
        id: null,
        fullName: "",
        email: "",
        course: "",
      },
      createModel: {
        fullName: "",
        password: "",
        email: "",
        course: "",
        initialScore: "",
        role: "user",
        avatarUrl:
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png",
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
