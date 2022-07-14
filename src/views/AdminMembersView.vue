/* eslint-disable */ 
<template>
  <div>
    <div v-if="users" class="AdminMemberView">
      <h1>Admin Member view</h1>
      <BaseTable :table-data="{ 
        headingData : this.headers,
        bodyData: this.usersCatalor
      }" :edit-btns="true" :is-data-loading="false" :delete-btns="true" @onEdit="openEdit" />
      <button>Create new user</button>
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import BaseTable from '../components/UI/BaseTable/BaseTable'

export default {
    name: "AdminMembersView",
    comments: {
        BaseTable,
    },
    computed: {
        ...mapGetters(["loadingStatus", "users"]),
    },
    methods: {
        ...mapActions(["fetchUsers", "updateUser"]),
        openEdit(id) {
            this.showModal = true;
            this.eventModel = this.users.filter((e) => e.id === id);
            //console.log(this.eventModel[0].id, 'event model Amdin')
            console.log(id, 'id')
        },
        closeEdit() {
            this.showModal = false;
            this.updateUser(this.eventModel[0]);
        },
    },
    mounted() {
        this.fetchUsers();
        if (this.users) {
            this.usersCatalor = this.users.filter((e) => e.role === "user");
        }
        console.log(this.usersCatalor, "user catalog");
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