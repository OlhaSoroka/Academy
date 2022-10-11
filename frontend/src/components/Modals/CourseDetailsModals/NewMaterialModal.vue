<template>
  <BaseModal
    ref="newMaterial"
    :header="'Add new material'"
    @isClosed="clearInputs()"
  >
    <template #body>
      <div class="flex justify-center flex-col mt-7 gap-10">
        <div class="mx-1">
          <BaseInput
            v-model="name"
            label="Material Name"
            rules="required"
          />
          <BaseInput
            v-model="link"
            type="Link"
            label="Material Link"
            rules="required"
          />
        </div>
        <div class="mx-1 flex justify-around">
          <BaseButton
            variant="btn_red"
            @click="cancelModal"
          >
            Cancel
          </BaseButton>
          <BaseButton
            :disabled="!(name.length && link.length)"
            @click="
              confirmAdding({ id: currentRouteName, course: currentCourse })
            "
          >
            Add
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
    mentor: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      name: "",
      link: "",
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("courses", ["getCourseById"]),
    currentRouteName() {
      const fullPath = this.$router.history.current.path;
      const pathArray = fullPath.split("/");
      const id = pathArray[pathArray.length - 1];
      return id;
    },
    currentCourse() {
      return this.getCourseById(this.currentRouteName);
    },
  },
  watch: {
    toggleModal() {
      this.$refs.newMaterial.openModal();
    },
  },
  methods: {
    ...mapActions("courses", ["updateCourse", "getCourses"]),
    clearInputs() {
      this.name = "";
      this.link = "";
    },
    cancelModal() {
      this.$refs.newMaterial.closeModal();
      this.clearInputs();
    },
    confirmAdding({ id, course }) {
      const updatedCourse = JSON.parse(JSON.stringify(course));

      updatedCourse.materials.push({
        id: `${this.name}  (${this.user.fullName})`,
        name: `${this.name}`,
        link: this.link,
      });
      this.updateCourse({ id, course: updatedCourse })
        .then(async () => {
          await this.getCourses();
        })
        .then(() => {
          this.$refs.newMaterial.closeModal();
        })
        .finally(() => this.clearInputs());
    },
  },
};
</script>
