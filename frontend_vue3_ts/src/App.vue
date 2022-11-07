<template>
  <div class="relative flex">
    <TheNavigationMenu></TheNavigationMenu>
    <div class="h-screen w-full overflow-hidden">
      <RouterView class="h-full overflow-auto bg-primary-100" />
    </div>
    <ToastMessage />
  </div>
</template>

<script lang="ts">
import ToastMessage from "./components/ToastMessage.vue";

import { defineComponent } from "vue";
import TheNavigationMenu from "./components/TheNavigationMenu.vue";
import { mapStores } from "pinia";
import { useUserStore } from "./store/user";

export default defineComponent({
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {},
  data() {
    return {
      user: null
    }
  },
  components: { TheNavigationMenu },
  mounted() {
   
  }
});
</script>
