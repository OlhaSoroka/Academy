/* eslint-disable */ 
<template>
  <div>
    <div v-if="usersCatalor" class="AdminMemberView">
      <h1>Admin Member view</h1>
      <BaseTable :table-data="{
        headingData : this.headers,
        bodyData: this.usersCatalor
      }" :edit-btns="true" :is-data-loading="loadingStatus" :delete-btns="true" @onEdit="openEdit" />
      <BaseButton :loading="loadingStatus" @click.prevent="openAdminMemberCreateModal">
        Create new user
      </BaseButton>
    </div>
    <div v-if="showModal">
      <form class="form_input">
        <div v-for="input in inputs" :key="input.label" class="form_control">
          <label class="form_label">{{ input.label }}</label>
          <input v-model="eventModel[0][input.model]" type="text" class="form_model" />
        </div> 
      </form>
      <button @click.prevent="closeEdit">Close</button>
    </div>
    <BaseModal ref="adminMemberCreateModal" :header="'Create new User'">
      <template #body>
        <div class="flex flex-col items-center text-start mt-5">
          <BaseInput v-model="createModel.fullName" type="text" label="Name" placeholder="Paste name" />
          <BaseInput v-model="createModel.password" type=" text" label="Email" placeholder="Paste email" />
          <BaseInput v-model="createModel.email" type="text" label="Password" placeholder="Paste password" />
          <BaseInput v-model="createModel.course" type="text" label="Course name" placeholder="Paste course name" />
          <BaseInput v-model="createModel.initialScore" type="text" label="Start points"
            placeholder="Paste start points" />
          <div class="mt-5">
            <BaseButton :disabled="false" @click="submitAdminCreateButton">
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
import BaseTable from '../components/UI/BaseTable/BaseTable'
import BaseModal from '../components/BaseModal'
import BaseInput from '../components/BaseInput'
import BaseButton from '../components/BaseButton'

export default {
    name: "AdminMembersView",
    components: { 
      BaseTable,
      BaseButton,
      BaseInput,
      BaseModal,
    },
    computed: {
        ...mapGetters(["loadingStatus", "users"]),
    },
    methods: {
        ...mapActions(["fetchUsers", "updateUser"]),
      openEdit(id) {
            console.log(id, 'id')
            this.showModal = true;
            this.eventModel = this.users.filter((e) => e.id === id);
            //console.log(this.eventModel[0].id, 'event model Amdin')
        },
        closeEdit() {
            this.showModal = false;
          this.updateUser(this.eventModel[0]);
        },
      openAdminMemberCreateModal() {
        this.$refs.adminMemberCreateModal.openModal();
      },
      submitAdminCreateButton() {
        console.log (this.createModel, 'create model')
        this.$refs.adminMemberCreateModal.closeModal();
        this.createNewUser(this.createModel);
      },
      async asingFetch() {
        await this.fetchUsers(); 
        if (this.users) {
          this.usersCatalor = this.users.filter((e) => e.role === "user");
        }
      }
    },  
    mounted() { 
      this.asingFetch();
    },
    data() { 
        return {
            inputs: [
                { label: "Name", model: "fullName" },
                { label: "Email", model: "email" },
                { label: "Course", model: "course" },
            ],
            eventModel: {
                id: null,
                fullName: "",
                email: "",
                course: "",
            },
            createModel: {
              id: Math.floor(Math.random() * 10000),
              fullName: "",
              password: "",
              email: "",
              course: "",
              initialScore: "",
            },
            showModal: false,
            usersCatalor: [],
            headers: [
                { "fullName": "Name" },
                { "email": "Email" },
                { "course": "Course" }
            ]
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

.user_form {
  border: 3px solid;
  padding: 10px;
  margin: 10px;
}

button {
  border: 3px solid;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
}
</style>