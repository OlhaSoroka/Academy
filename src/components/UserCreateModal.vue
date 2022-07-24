!<template>
  <div>
    <BaseModal ref="userCreateModal" 
    :header="'Create new User'">
      <template #body>
        <ValidationObserver v-slot="{ invalid }">
          <div class="flex flex-col items-center text-start mt-5">
            <BaseInput
              v-model="createModel.fullName"
              type="text"
              label="Name"
              placeholder="Paste name"
            />
            <BaseInput
              v-model="createModel.password"
              type="password"
              label="Password"
              placeholder="Paste password"
              vid="password"
              rules="confirmed:password"
            />
            <BaseInput
              v-model="createModel.email"
              type="email"
              label="Email"
              placeholder="Paste email"
              vid="email"
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
                :disabled="invalid"
                @click="submitAdminMemberCreateButton"
              >
                Submit
              </BaseButton>
            </div>
          </div>
        </ValidationObserver>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BaseModal from "./BaseModal";
import BaseInput from "./BaseInput";
import BaseButton from "./BaseButton";
import { ValidationObserver } from "vee-validate";
export default {
  name: "UserCreateModal",
  components: {
    BaseModal,
    BaseInput,
    BaseButton,
    ValidationObserver,
  },
  props: {
    isOpenedUserCreateModal: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isOpenedUserCreateModal() {
      this.$refs.userCreateModal.openModal();
    },
  },
  methods: {
    ...mapActions("users", ["createNewUser"]),
    async submitAdminMemberCreateButton() {
      await this.createNewUser(this.createModel)
        .then(
          () => this.$refs.userCreateModal.closeModal(),
          this.$router.go(0)
        )
        // eslint-disable-next-line
        .catch((error) => {
          console.log(error.message);
        });
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
</style>