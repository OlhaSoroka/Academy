<template> 
  <div class="relative flex">
    <TheNavigationMenu></TheNavigationMenu>
    <div class="h-screen w-full overflow-auto">
      <TheTopbarComponent @onMenuToggle="" />
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import TheNavigationMenu from "./components/TheNavigationMenu.vue";
import TheTopbarComponent from "./components/TheTopbarComponent.vue";

export default defineComponent({
  methods: {},
  data() {
    return {
    }
  },
  components: { TheNavigationMenu, TheTopbarComponent },
});
</script>
