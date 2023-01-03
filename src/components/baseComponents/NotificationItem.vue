<template>
	<div class="">
		<div class="navigation__container">
			<div class="navigation__text">
				<div>Ilona H. added a new document to Vue.js Course</div>
				<div>01.01.2023</div>
			</div>
			
		</div>
	</div>
</template>
<script lang="ts">

export default {
components: {
}

}
</script>
<style lang="css" scoped>
.navigation__container {
	@apply shadow-md bg-stone-50 border border-primary-700 rounded-md p-5 m-3 ;
}

.navigation__text{
	@apply text-base text-gray-800
}
</style>