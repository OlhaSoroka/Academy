<template>
	<div class="border border-primary-700 rounded p-4 my-3 shadow">
		<div class="text-primary-700 font-bold">Attention!</div>
		<div>{{ innerText }}</div>
	</div>
</template>
<script lang="ts">

export default {
	props: {
		innerText: String
	}

}
</script>
<style lang="css" scoped>

</style>