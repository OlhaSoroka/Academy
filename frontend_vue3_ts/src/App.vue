<template>
  <div class="bg-gray-800 text-white h-screen">
    <div>{{ msg }}</div>
    <button @click="revert">Revert</button>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

// Component definition
@Options({
  // Define component options
  watch: {
    count: value => {
      console.log(value)
    }
  },
})
export default class Counter extends Vue {
  // The behavior in class is the same as the current
  count = 0
  msg = 'Hello world'

  revert() {
    this.msg = 'World Hello'
  }

  increment() {
    this.count++
  }
}
</script>