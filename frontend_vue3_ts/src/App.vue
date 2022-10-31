<template>
  <div class="flex relative">
    <div class="bg-slate-400 ">Navigation menu</div>
    <div class="w-full h-screen overflow-hidden">
      <div class="bg-sky-400 ">TopBar
        <div class="m-3">
          <button class="bg-red-500 text-white" @click="showFailureToast">fail</button>
          <button class="bg-green-500 text-white" @click="getCourses">Get courses</button>
        </div>
      </div>
      <RouterView class="h-full overflow-auto bg-primary-100" />
     <BaseButton variant='btn_green' @click="consoleHello">Hello</BaseButton>
     <BaseButton variant='btn_red' @click="consoleBuy">Buy</BaseButton>
     <BaseInput
    id="password"
    type="password"
    label="password"
    v-model="password"
    placeholder="Qwe123"
  />
  <BaseInput
    id="email"
    type="email"
    label="email"
    v-model="email"
  />
    </div>
   
    <ToastMessage />
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia';
import { ToastType, useToastStore } from './store/toast.store';
import ToastMessage from './components/ToastMessage.vue';
import { useCoursesStore } from './store/courses';
import { defineComponent} from 'vue';
import BaseButton from "./components/baseComponents/BaseButton.vue";
import BaseInput from './components/baseComponents/BaseInput.vue';



export default defineComponent({
  mounted() {
    this.coursesStore.getCourses()
  },
    computed: {
        ...mapStores(useToastStore, useCoursesStore),
    },
    methods: {
        showFailureToast() {
            this.toastStore.showToastMessage({ message: "Oops! Something goes wrong...", type: ToastType.FAILURE });
        },
        showSuccessToast() {
            this.toastStore.showToastMessage({ message: "User successfully updated.", type: ToastType.SUCCESS });
        },
        consoleHello() {
          console.log(this.email, this.password)
        },
        consoleBuy() {
          console.log("buy")
        },
        getCourses() {
          this.coursesStore.getCourses()
        }
    },
    data() {
    return {
      email: "",
      name: "",
      password: ""
    };
  },
    components: { ToastMessage, BaseButton, BaseInput}
})
</script>