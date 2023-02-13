<template>
  <div v-if="!!userStore.user" class="topbar__container">
    <div class=" flex justify-start items-center">
      <div class="flex items-center mr-3 cursor-pointer" @click="toggleNavigationMenu">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-list"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg>
      </div>
      <div class="text-xl">Academy</div>
    </div>
    <div class="flex justify-evenly items-center cursor-pointer" @click="openPopup">
      <div class="mr-2 text-sm">Hello,{{ userStore.currentUser?.fullName }}!</div>
      <div class="mr-2"><img class="w-10 h-10 rounded-full" :src=userStore.currentUser?.avatarUrl
          alt="user_profile_photo"></div>
      <div class="rotate-90 mr-2">
        <ArrowNextIcon class="h-3"></ArrowNextIcon>
      </div>
    </div>
  </div>
  <DropdownMenu v-if="isDropdownMenuOpen" @linkClicked="closePopup" class="absolute right-[50px] z-10 top-[60px]" />
</template>

<script lang="ts">
import { mapStores } from "pinia";
import { useUserStore } from "../store/user"
import { defineComponent } from "vue";
import ArrowNextIcon from "./baseComponents/icons/ArrowNextIcon.vue";
import DropdownMenu from "./DropdownMenu.vue";
export default defineComponent({
  data() {
    return {
      isDropdownMenuOpen: false,
    }
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    toggleNavigationMenu() {
      this.$emit("onNavigationMenuToggle");
    },
    openPopup(): void {
      this.isDropdownMenuOpen = true;
    },
    closePopup(): void {
      this.isDropdownMenuOpen = false;
    },
  },
  components: { ArrowNextIcon, DropdownMenu }
});
</script>

<style lang="scss" scoped>
.topbar__container {
  @apply bg-primary-700 p-2 text-white flex justify-between items-center
}
</style>
