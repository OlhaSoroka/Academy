<template>
	<div class="bg-primary-700 w-full h-full flex justify-center items-center">

		<div class="flex flex-col items-center">
			<div class="flex items-center">
				<div class="font-bolt text-slate-200 text-9xl mr-5">404</div>
				<div class="h-32 w-1 bg-slate-200"></div>
				<div class="flex flex-col items-start justify-center">
					<div class="text-slate-200 text-3xl ml-6">Page Not Found</div>
					<div class="text-slate-200 text-xl ml-6">Sorry, but the requested page is not found </div>
				</div>
			</div>
			<div><router-link class="" :to="{ name: COURSE_DASHBOARD }">
					<div class="cursor-pointer text-slate-200 text-xl text-center mt-12">Back to home</div>
				</router-link>
				<div class="text-center text-slate-200 mt-8">Copyright © InventorSoft</div>
			</div>
		</div>

	</div>
</template>
<script lang="ts">
import { ROUTE_NAMES } from '../models/router.model';

export default {
	data() {
		return {
			COURSE_DASHBOARD: ROUTE_NAMES.COURSE_DASHBOARD,
		}
	}
}
</script>

<style lang="scss" scoped>

</style>