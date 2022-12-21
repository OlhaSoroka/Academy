<template>
  <div class="relative flex">
    <TheNavigationMenu v-if="isUserLoggedIn" :is-open="isOpen"></TheNavigationMenu>
    <div class="h-screen w-full overflow-auto">
      <TheTopbarComponent v-if="isUserLoggedIn" @onNavigationMenuToggle="toggleNavigationMenu" />
      <RouterView />
    </div>
    <ToastMessage></ToastMessage>
  </div>
</template>

<script lang="ts">

import { mapStores } from "pinia";
import { defineComponent } from "vue";
import DropdownMenu from "./components/baseComponents/DropdownMenu.vue";
import TheNavigationMenu from "./components/TheNavigationMenu.vue";
import TheTopbarComponent from "./components/TheTopbarComponent.vue";
import ToastMessage from "./components/ToastMessage.vue";
import { useUserStore } from "./store/user";

export default defineComponent({
  components: { TheNavigationMenu, TheTopbarComponent, DropdownMenu, ToastMessage },
  data() {
    return {
      isOpen: true,
    }
  },
  computed: {
    ...mapStores(useUserStore),
    isUserLoggedIn(): boolean {
      return !!this.userStore.currentUser;
    }
  },
  methods: {
    toggleNavigationMenu() {
      this.isOpen = !this.isOpen;
    },
  },
});
</script>
