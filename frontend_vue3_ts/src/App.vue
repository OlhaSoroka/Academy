<template>
  <div
    class="flex relative"
  > 
    <div class="bg-slate-400 ">Navigation menu</div>
    <div class="w-full h-screen overflow-hidden">
      <div class="bg-sky-400 ">TopBar</div>
      <RouterView class="h-full overflow-auto bg-primary-100" />
    </div>

    <!-- <ToastMessage /> -->
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'


// Component definition
@Options({
  // Define component options

})
export default class Counter extends Vue {
  // The behavior in class is the same as the current

}
</script>