<template>
	<div class="flex justify-end"><button class="bg-red-500 text-white" @click="addStudent">Add student</button></div>
	<UserCreateModal :toggle-modal="isAddCourseModalOpen" :role="'student'" :header="'Add students'"></UserCreateModal>
</template>
<script lang="ts">
import UserCreateModal from '../components/modals/UserCreateModal.vue';

export default {
    data() {
        return {
            isAddCourseModalOpen: false
        };
    },
    methods: {
        addStudent() {
            this.isAddCourseModalOpen = !this.isAddCourseModalOpen;
        }
    },
    components: { UserCreateModal }
}
</script>