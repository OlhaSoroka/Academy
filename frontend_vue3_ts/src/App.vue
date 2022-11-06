<template>
  <div class="relative flex">
    <div class="bg-slate-400">Navigation menu</div>
    <div class="h-screen w-full overflow-hidden">
      <RouterView class="h-full overflow-auto bg-primary-100" />
    </div>

    <ToastMessage />
  </div>
</template>

<script lang="ts">
import ToastMessage from "./components/ToastMessage.vue";

import { defineComponent } from "vue";

export default defineComponent({
  computed: {},
  methods: {},
  data() { return {} },
  components: {},
});
</script>
