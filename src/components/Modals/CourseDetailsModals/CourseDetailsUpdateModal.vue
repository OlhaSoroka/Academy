<template>
  <BaseModal
    ref="cdUpdateModal"
    :header="'Update course details'"
  >
    <template #body>
      <div class="flex justify-center flex-col mt-7  gap-10">
        <div class="text-left">
          <label
            class=""
            for="name"
          >Name of course</label>
          <BaseInput
            id="name"
            v-model="newName"
          />
          <label for="docs">Docs link</label>
          <BaseInput
            id="docs"
            v-model="newDocs_link"
          />
          <BaseInput
            v-model="newDate"
            type="date"
            label="Date"
            rules="required"
            onkeydown="return false"
          />
          <BaseSelect
            v-model="newStatus"
            :options="['in progress', 'finished', 'not started']"
          />
        </div>
        <div class="mx-1 flex gap-10">
          <BaseButton
            :disabled="!(newName.length && newDate.length)"
            @click="submit"
          >
            Update
          </BaseButton>
          <BaseButton
            variant="btn_red"
            @click="cancel"
          >
            Cancel
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '@/components/BaseComponents/BaseButton.vue';
import BaseModal from '@/components/BaseComponents/BaseModal.vue';
import BaseInput from '@/components/BaseComponents/BaseInput.vue';
import BaseSelect from '@/components/BaseComponents/BaseSelect/BaseSelect.vue';
// import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  components: {
    BaseModal,
    BaseButton,
    BaseInput,
    BaseSelect
  },
  props: {
    toggleModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newStatus: "",
      newName: "",
      newDate: "",
      newDocs_link: "",
    };
  },
  computed: {
    ...mapGetters('courses', ['getCourseById', 'courses']),
  },
  watch: {
    toggleModal() {
      this.$refs.cdUpdateModal.openModal();
    },
  },
  async mounted() {
    this.getCourses().then(() => {
      let currentItem = this.getCourseById(this.$route.params.id);

      const { status, name, docs_link, date } = currentItem
      this.newStatus = status
      this.newName = name
      this.newDate = this.makeDate(date)
      this.newDocs_link = docs_link
    })

  },
  methods: {
    ...mapActions('courses', ['addNewComment', 'getCourses', 'updateCourse']),
    clearInputs() {
      this.newStatus = ""
      this.newName = ""
      this.newDate = ""
      this.newDocs_link = ""
    },
    makeDate(propsDate) {
      // case dd/mm/yyyy -> yyyy-mm--dd
      const date = propsDate.split('/')

      if (date.length > 1) return `${date[2]}-${date[1]}-${date[0]}`

      return propsDate
    },
    async submit() {
      let currentItem = this.getCourseById(this.$route.params.id);
      let itemCopy = JSON.parse(JSON.stringify(currentItem))

      itemCopy = {
        ...itemCopy,
        name: this.newName,
        status: this.newStatus,
        date: this.newDate,
        docs_link: this.newDocs_link
      }

      await this.updateCourse({ id: itemCopy.id, course: itemCopy })
      await this.getCourses()
      this.$refs.cdUpdateModal.closeModal();
    },
    cancel() {
      this.$refs.cdUpdateModal.closeModal();
    },
  },

};
</script>
