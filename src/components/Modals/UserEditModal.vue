!<template>
  <div>
    <BaseModal
      ref="userEditModal"
      :header="'Edit User'"
    >
      <template #body>
        <ValidationObserver v-slot="{ invalid }">
          <div>
            <div
              v-for="input in userInputsValue"
              :key="input.label"
            >
              <BaseInput
                v-model="targetUser[input.model]"
                :type="input.type"
                :label="input.label"
                :placeholder="input.placeholder"
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
                v-model="targetUser.course"
                class="select__course"
              >
                <option
                  v-if="!courses.find((item) => item.name == targetUser.course)"
                  :value="targetUser.course"
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
                  :disabled="false"
                  variant="btn_red"
                  @click="cancelUserEditButton"
                >
                  Cancel
                </BaseButton>
              </div>
              <div class="mx-2">
                <BaseButton
                  :disabled="invalid || !targetUser.course != 0"
                  @click="submitUserEditButton"
                >
                  Update
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
  name: "UserEditModal",
  components: {
    BaseModal,
    BaseInput,
    BaseButton,
    ValidationObserver,
  },
  props: {
    isOpenedUserEditModal: {
      required: true,
      type: Boolean,
    },
    targetUserValue: {
      required: true,
      type: [Object, String],
    },
    userInputsValue: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      targetUser: {},
    };
  },
  computed: {
    ...mapGetters("courses", ["courses"]),
  },
  watch: {
    isOpenedUserEditModal() {
      this.$refs.userEditModal.openModal();
    },
    targetUserValue() {
      this.targetUser = this.targetUserValue;
    },
  },
  mounted() {
    this.getCourses();
  },
  methods: {
    ...mapActions("users", ["updateUser"]),
    ...mapActions("courses", ["getCourses"]),
    submitUserEditButton() {
      this.updateUser(this.targetUser);
      this.$refs.userEditModal.closeModal();
    },
    cancelUserEditButton() {
      this.$refs.userEditModal.closeModal();
    },
    requiredField(label) {
      if (label === "Name" || label === "Course") {
        return "required";
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