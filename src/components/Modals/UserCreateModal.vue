!<template>
  <div>
    <BaseModal
      ref="userCreateModal"
      :header="'Add new user'"
      @isClosed="clearInputs()"
    >
      <template #body>
        <ValidationObserver v-slot="{ invalid }">
          <div>
            <div
              v-for="input in userInputsValue"
              :key="input.label"
            >
              <BaseInput
                v-model="createModel[input.model]"
                :type="input.type"
                :label="input.label"
                :placeholder="input.placeholder"
                :vid="input.vid"
                :rules="requiredField(input.label)"
              />
            </div>
            <div>
              <label
                for="applicants"
                class="block ml-1 text-start"
              >Select Course</label>
              <select
                id="applicants"
                v-model="createModel.course"
                class="select__course"
              >
                <option
                  value=""
                  disabled
                  selected
                >
                  Select Course
                </option>
                <option
                  v-for="course in courses"
                  :key="course.id"
                  :value="course.name"
                >
                  {{ course.name }}
                </option>
              </select>
            </div>
            <div class="flex justify-evenly mt-5">
              <div class="mx-2">
                <BaseButton
                  :disabled="invalid || !createModel.course != 0"
                  @click="submitUserCreateButton"
                >
                  Create
                </BaseButton>
              </div>
              <div class="mx-2">
                <BaseButton
                  :disabled="false"
                  variant="btn_red"
                  @click="canselUserCreateButton"
                >
                  Cancel
                </BaseButton>
              </div>
            </div>
          </div>
        </ValidationObserver>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseModal from "../BaseComponents/BaseModal";
import BaseInput from "../BaseComponents/BaseInput";
import BaseButton from "../BaseComponents/BaseButton";
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
      required: true,
      type: Boolean,
    },
    userInputsValue: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      createModel: {
        fullName: "",
        password: "",
        confirmpassword: "",
        email: "",
        course: "",
        initialScore: "",
        role: "user",
        avatarUrl:
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png",
      },
    };
  },
  computed: {
    ...mapGetters("courses", ["courses"]),
  },
  watch: {
    isOpenedUserCreateModal() {
      this.$refs.userCreateModal.openModal();
    },
  },
  mounted() {
    this.getCourses();
  },
  methods: {
    ...mapActions("users", ["createNewUser"]),
    ...mapActions("courses", ["getCourses"]),
    clearInputs() {
      this.createModel = {
        fullName: "",
        password: "",
        confirmpassword: "",
        email: "",
        course: "",
        initialScore: "",
        role: "user",
        avatarUrl:
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png",
      };
    },
    submitUserCreateButton() {
      this.createNewUser(this.createModel);
      this.$refs.userCreateModal.closeModal();
    },
    canselUserCreateButton() {
      this.$refs.userCreateModal.closeModal();
      this.clearInputs();
    },
    requiredField(label) {
      if (label === "Full Name" || label === "Initial Score") {
        return "required";
      }
      if (label === "Confirm password") {
        return "confirmed:password";
      }
      if (label === "Password") {
        return "confirmed:password";
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.select__course {
  @apply block p-1 m-1 w-64 ml-1 border-2 border-sky-700 rounded-md text-base font-mono placeholder:text-slate-400 hover:bg-stone-50 focus:drop-shadow-xl focus:bg-stone-50 focus:border-sky-700 focus:outline-none focus:text-cyan-900;
}
</style>