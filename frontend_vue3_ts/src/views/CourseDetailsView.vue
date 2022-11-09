<template>
	<h1>Course Details View {{courseId}}</h1>
	<div class="part col-span-4 col-start-1">
		<!-- <GroupWidget /> -->
		<ResultsWidget :courseId="courseId" />
	</div>
</template>
<script lang="ts">
import GroupWidget from '../components/widgets/GroupWidget.vue';
import ResultsWidget from '../components/widgets/ResultsWidget.vue';

export default {
	computed: {
		courseId(): string {
			return this.$route.params.id as string;
		}
	},
	components: { GroupWidget, ResultsWidget }
}
</script>