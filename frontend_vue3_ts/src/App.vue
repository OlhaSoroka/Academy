<template>
  <div class="relative flex">
    <div class="bg-slate-400">Navigation menu</div>
    <div class="h-screen w-full overflow-hidden">
      <div class="bg-sky-400">
        TopBar
        <div class="m-3">
          <button class="bg-red-500 text-white" @click="deleteStudent">
            Delete
          </button>
          <button class="bg-green-500 text-white" @click="update">
            Update
          </button>
          <button class="bg-blue-500 text-white" @click="putUserInStore">
            Fetch
          </button>
          <button class="bg-blue-500 text-white" @click="createUser">
            Create
          </button>
        </div>
      </div>
      <RouterView class="h-full overflow-auto bg-primary-100" />
      <BaseButton variant="btn_green" @click="consoleHello">Hello</BaseButton>
      <BaseButton variant="btn_red" @click="consoleBuy">Buy</BaseButton>
      <Form ref="form" @submit="submit">
        <BaseInput
          name="password"
          type="password"
          label="Password"
          v-model="password"
          placeholder="Qwe123"
        />
        <BaseInput name="email" type="email" label="email" v-model="email" />
        <button>Submit</button>
      </Form>
      <BaseTableEditable
        style="height: 400px;"
        :column-defs="columnDefs"
        :row-data="rowData"
        uniq-identifier="email"
      />
    </div>
    

    <ToastMessage />
  </div>
</template>

<script lang="ts">
import { mapStores } from "pinia";
import { ToastType, useToastStore } from "./store/toast.store";
import { useStudentStore } from "./store/students";
import ToastMessage from "./components/ToastMessage.vue";
import { useCoursesStore } from "./store/courses";
import { Form } from "vee-validate";
import BaseButton from "./components/baseComponents/BaseButton.vue";
import BaseInput from "./components/baseComponents/BaseInput.vue";
import BaseTableEditable from "./components/baseComponents/BaseTableEditable.vue";

import { defineComponent } from "vue";
import { getUsersByRole } from "./api/user";
import { ROLES } from "./models/router.model";

export default defineComponent({
  mounted() {
    this.coursesStore.getCourses();
  },
  computed: {
    ...mapStores(useToastStore, useCoursesStore, useStudentStore),
  },
  methods: {
    showFailureToast() {
      this.toastStore.showToastMessage({
        message: "Oops! Something goes wrong...",
        type: ToastType.FAILURE,
      });
    },
    consoleHello() {
      console.log(this.email, this.password);
    },
    consoleBuy() {
      console.log("buy");
    },
    getCourses() {
      this.coursesStore.getCourses();
    },
    showSuccessToast() {
      this.toastStore.showToastMessage({
        message: "User successfully updated.",
        type: ToastType.SUCCESS,
      });
    },
    putUserInStore() {
      this.studentsStore.fetchStudents();
    },
    createUser() {
      this.studentsStore.createStudent({
        email: "jonipaperoni@gmail.com",
        password: "qwe123QWE!",
        role: ROLES.STUDENTS_ROLE,
        fullName: "Papers ",
        course: "Test Course",
      });
    },
    update() {
      this.studentsStore.updateStudent({
        email: "jonipaperoni@gmail.com",
        avatarUrl: "qwe123QWE!",
        role: ROLES.STUDENTS_ROLE,
        fullName: "Red Papers ",
        course: "Test Course",
        id: "lFrIJv0scpci8flGl7hqyS4y3mz2",
      });
    },
    deleteStudent() {
      this.studentsStore.deleteStudent("lFrIJv0scpci8flGl7hqyS4y3mz2");
    },
    submit() {
      console.log(this.email, this.password);
    },
  },
  data() {
    return {
      email: "",
      name: "",
      password: "",
      columnDefs: [
      { field: "fullName",  headerName: "Name", headerEditable: false, sortable: true, editable: true , width:200},
      { field: "email" ,headerName: "Email", headerEditable: false, sortable: true, editable: false , width:250 },
      { field: "phone" ,headerName: "Phone", headerEditable: false, sortable: false, editable: this.isAdmin , width:200 },
      { field: "city" ,headerName: "City",headerEditable: false, sortable: true, editable: this.isAdmin , width:200 },
      { field: "age" ,headerName: "Age", headerEditable: false, sortable: true, editable: this.isAdmin , width:100 },
      { field: "education" ,headerName: "Education", headerEditable: false, sortable: false, editable: this.isAdmin , width:250 },
      { field: "eng_level" ,headerName: "English level", headerEditable: false, sortable: true, editable: this.isAdmin , width:250 },
      ],
    rowData: [
      {
        "fullName": "st1",
        "email": "asdf@fasdf.asd",
        "phone": "",
        "city": "",
        "age": "",
        "education": "",
        "eng_level": ""
      },
      {
        "fullName": "st2",
        "email": "asdf@fasd.asdf",
        "phone": "",
        "city": "",
        "age": "",
        "education": "",
        "eng_level": ""
      }
    ],
    };
  },
  components: { ToastMessage, BaseButton, BaseInput, Form, BaseTableEditable },
});
</script>
