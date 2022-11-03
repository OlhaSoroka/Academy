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
        <BaseSelect
              v-model="newStatus"
              :options="['in progress', 'finished', 'not started']"
            />
        <button>Submit</button>
      </Form>
      <BaseTable 
      v-if="courseItem"
               class="table"
               :is-data-loading="coursesStore.loadingStatus"
              :table-data="{
                headingData: headerComments,
                bodyData: courseItem.comments,
              }"
              :edit-btns="false"
              :delete-btns="true"
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
import BaseSelect from "./components/baseComponents/BaseSelect/BaseSelect.vue";
import BaseTable from "./components/baseComponents/BaseTable/BaseTable.vue";

import { defineComponent } from "vue";
import { ROLES } from "./models/router.model";

export default defineComponent({
  mounted() {
    this.coursesStore.getCourses();
  },
  computed: {
    ...mapStores(useToastStore, useCoursesStore, useStudentStore),
    /* courseItem() {
     return this.coursesStore.getCourseById(2);
    }, */
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
      if (this.newStatus !== "") {console.log(this.email, this.password);}
    },
  },
  data() {
    return {
      email: "",
      name: "",
      password: "",
      newStatus: "",
      courseItem: {
    "id": 2,
    "name": "Java",
    "date": "2022-08-28",
    "status": "not started",
    "docs_link": "",
    "applicants": [
      {
        "id": "c7abc7ec-e88f-4dfa-ae49-e061ea4f641f",
        "email": "allen@test.com",
        "fullName": "Allen Barrey",
        "initialScore": 50
      }
    ],
    "group": [],
    "homework": [],
    "results": [],
    "comments": [
      {
        "message": "Interviewing applicants for course",
        "createdAt": "06.08.2022, 12:14:03",
        "author": "Stepan Smith",
        "author_id": "ce2d8df5-0d99-4bfc-a921-81ff6a0e66ef",
        "author_email": "s_smith@mail.com"
      },
      {
        "message": "asdfasdfasdfsafsafsadfsadf",
        "createdAt": "06.08.2022, 12:14:03",
        "author": "asdfasdfsa",
        "author_id": "ce2d8df5-0d99-4bfc-a921-81ff6a0e66ef",
        "author_email": "s_smith@mail.com"
      }
    ]
  },
      headerComments: [
        { message: "Message" },
        { createdAt: "Date" },
        { author: "Author" },
      ],
    };
  },
  components: { ToastMessage, BaseButton, BaseInput, Form, BaseSelect, BaseTable },
});
</script>
