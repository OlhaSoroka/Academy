<template>
  <div class="relative">
    <div class="h-[100vh]">
      <RouterView />
    </div>

    <ToastMessage></ToastMessage>
  </div>
</template>

<script lang="ts">
import ToastMessage from "./components/ToastMessage.vue"
export default {
  components: {
    ToastMessage
  }
}
</script>
