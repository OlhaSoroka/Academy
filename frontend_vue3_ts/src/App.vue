<template>
  <div class="flex relative">
    <div class="bg-slate-400 ">Navigation menu</div>
    <div class="w-full h-screen overflow-hidden">
      <div class="bg-sky-400 ">TopBar
        <div class="m-3">
          <button class="bg-red-500 text-white" @click="showFailureToast">fail</button>
          <button class="bg-green-500 text-white" @click="showSuccessToast">success</button>
        </div>
      </div>
      <RouterView class="h-full overflow-auto bg-primary-100" />
    </div>

    <ToastMessage />
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia';
import { ToastType, useToastStore } from './store/toast.store';
import ToastMessage from './components/ToastMessage.vue';

export default {
    computed: {
        ...mapStores(useToastStore)
    },
    methods: {
        showFailureToast() {
            this.toastStore.showToastMessage({ message: "Oops! Something goes wrong...", type: ToastType.FAILURE });
        },
        showSuccessToast() {
            this.toastStore.showToastMessage({ message: "User successfully updated.", type: ToastType.SUCCESS });
        }
    },
    components: { ToastMessage }
}
</script>