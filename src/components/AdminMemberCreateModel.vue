!<template>
  <div>
    <BaseModal ref="adminMemberCreateModal" 
    :header="'Create new User'">
      <template #body>
        <div class="flex flex-col items-center text-start mt-5">
          <BaseInput
            v-model="createModel.fullName"
            type="text"
            label="Name"
            placeholder="Paste name"
          />
          <BaseInput
            v-model="createModel.password"
            type=" password"
            label="Password"
            placeholder="Paste password"
          />
          <BaseInput
            v-model="createModel.email"
            type="email"
            label="Email"
            placeholder="Paste email"
          />
          <BaseInput
            v-model="createModel.course"
            type="text"
            label="Course name"
            placeholder="Paste course name"
          />
          <BaseInput
            v-model="createModel.initialScore"
            type="number"
            label="Start points"
            placeholder="Paste start points"
          />
          <div class="mt-5">
            <BaseButton
              :disabled="usersLoadingStatus"
              @click="submitAdminMemberCreateButton"
            >
              Submit
            </BaseButton>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseModal from "./BaseModal";
import BaseInput from "./BaseInput";
import BaseButton from "./BaseButton";
export default {
  name: "AdminMemberCreateModel",
  components: {
    BaseModal,
    BaseInput,
    BaseButton,
  },
  props: {
    toggleOpenedAdminMemberCreateModal: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    toggleOpenedAdminMemberCreateModal() {
      this.$refs.adminMemberCreateModal.openModal();
    },
  },
  computed: {
    ...mapGetters(["usersLoadingStatus"]),
  },
  methods: {
    ...mapActions(["createNewUser"]),
    async submitAdminMemberCreateButton() {
      this.$refs.adminMemberCreateModal.closeModal();
      await this.createNewUser(this.createModel);
      this.$router.go(0);
    },
  },
  data() {
    return {
      createModel: {
        fullName: "",
        password: "",
        email: "",
        course: "",
        initialScore: "",
        role: "user",
        avatarUrl:
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
button {
  border: 3px solid;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
}
</style>