<template>
  <div class="relative flex">
    <TheNavigationMenu :is-open="isOpen"></TheNavigationMenu>
    <div class="h-screen w-full overflow-auto">
      <TheTopbarComponent @onNavigationMenuToggle="toggleNavigationMenu" />
      <RouterView />
    </div>
    <ToastMessage></ToastMessage>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import DropdownMenu from "./components/baseComponents/DropdownMenu.vue";
import TheNavigationMenu from "./components/TheNavigationMenu.vue";
import TheTopbarComponent from "./components/TheTopbarComponent.vue";
import ToastMessage from "./components/ToastMessage.vue";

export default defineComponent({
  components: { TheNavigationMenu, TheTopbarComponent, DropdownMenu, ToastMessage },
  data() {
    return {
      isOpen: true,
    }
  },
  methods: {
    toggleNavigationMenu() {
      this.isOpen = !this.isOpen;
    },
  },
});
</script>
