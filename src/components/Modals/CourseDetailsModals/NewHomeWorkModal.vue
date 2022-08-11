<template>
    <BaseModal
        ref="newHomework"
        :header="'Add new homework'"
        @isClosed="clearInputs()"
    >
        <template #body>
            <div class="flex justify-center flex-col mt-7  gap-10">
                <div class="mx-1">
                    <BaseInput v-model="name" />
                    <BaseInput
                        v-model="date"
                        type="date"
                        label="Date"
                        rules="required"
                        onkeydown="return false"
                    />
                </div>
                <div class="mx-1 flex gap-10">
                    <BaseButton
                        :disabled="!name.length && !date.length"
                        @click="confirmAdding({ id: currentRouteName, course: currentCourse })"
                    >
                        Add
                    </BaseButton>
                    <BaseButton @click="cancelModal">
                        Cancel
                    </BaseButton>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseButton from "@/components/BaseComponents/BaseButton.vue";
import BaseModal from "@/components/BaseComponents/BaseModal.vue";
import { mapActions, mapGetters } from "vuex";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
export default {
    components: { BaseButton, BaseModal, BaseInput },
    props: {
        toggleModal: {
            type: Boolean,
            default: false,
        },
        manager: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            name: '',
            date: ""
        }
    },
    computed: {
        ...mapGetters('users', ['users']),
        ...mapGetters('user', ['user']),
        ...mapGetters('courses', ['getCourseById']),
        currentRouteName() {
            const fullPath = this.$router.history.current.path
            const pathArray = fullPath.split('/')
            const id = pathArray[pathArray.length - 1]
            return id;
        },

        currentCourse() {
            return this.getCourseById(this.currentRouteName)
        }
    },
    watch: {
        toggleModal() {
            this.$refs.newHomework.openModal();
        },
    },

    async mounted() {
        this.fetchUsers()
    },

    methods: {
        ...mapActions("courses", ["updateCourse", 'getCourses']),
        ...mapActions('users', ['fetchUsers']),
        clearInputs() {
            this.name = ''
        },
        cancelModal() {
            this.$refs.newHomework.closeModal();
            this.clearInputs()
        },
        confirmAdding({ id, course }) {
            const updatedCourse = JSON.parse(JSON.stringify(course))

            updatedCourse.homework.push({
                id: `${this.name} (${this.user.fullName})`,
                name: `${this.name} (${this.user.fullName})`,
                date: this.date
            })
            this.updateCourse({ id, course: updatedCourse })
                .then(() => {
                    this.getCourses();
                })
                .then(() => {
                    this.$refs.newHomework.closeModal();
                })
                .finally(() => this.clearInputs()
                )
        }
    },
};
</script>
