<template>
  <div class="relative flex">
    <TheNavigationMenu></TheNavigationMenu>
    <div class="h-screen w-full overflow-hidden">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import TheNavigationMenu from "./components/TheNavigationMenu.vue";

export default defineComponent({
  methods: {},
  data() {
    return {
    }
  },
  components: { TheNavigationMenu },
});
</script>
