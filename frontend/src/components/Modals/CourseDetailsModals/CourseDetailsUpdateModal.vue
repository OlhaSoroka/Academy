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
          <label 
            v-if="getCourseById(id).homework_quantity"
            for="homework_quantity"
          >Homework quantity
          </label>
          <BaseInput
            v-if="getCourseById(id).homework_quantity"
            id="homework_quantity"
            v-model="newHomework_quantity"
            type="number"
          />
          <BaseInput
            v-model="newDate"
            type="date"
            label="Date of starting"
            rules="required"
            onkeydown="return false"
          />
          <BaseInput
            v-model="newDate_project_start"
            type="date"
            label="Date of starting project"
            onkeydown="return false"
          />
          <BaseInput
            v-model="newDate_project_demo"
            type="date"
            label="Date of demo"
            onkeydown="return false"
          />
          <BaseInput
            v-model="newDate_final_interview"
            type="date"
            label="Date of final interview"
            onkeydown="return false"
          />
          <BaseSelect
            v-model="newStatus"
            :options="['in progress', 'finished', 'not started']"
          />
        </div>
        <div class="mx-1 flex justify-around">
          <BaseButton
            variant="btn_red"
            @click="cancel"
          >
            Cancel
          </BaseButton>
          <BaseButton
            :disabled="!(newName.length && newDate.length)"
            @click="submit"
          >
            Update
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
    id: {
      type: Number,
      default: null,
    }
  },
  data() {
    return {
     currentItem: {
      type: Object
     },
      newStatus: "",
      newName: "",
      newDate: "",
      newDate_project_start: "",
      newDate_project_demo: "",
      newDate_final_interview: "",
      newHomework_quantity: 0,
    };
  },
  computed: {
    ...mapGetters('courses', ['getCourseById', 'courses']),
  },
  watch: {
    toggleModal() {
      this.$refs.cdUpdateModal.openModal();
    },
   id() {
      this.getCourses().then(() => {
      this.currentItem = this.getCourseById(this.id)
      const { status, name, date, date_project_start, date_project_demo, date_final_interview, homework_quantity } = this.currentItem
      this.newStatus = status
      this.newName = name
      this.newDate = this.makeDate(date)
      this.newDate_project_start = this.makeDate(date_project_start)
      this.newDate_project_demo = this.makeDate(date_project_demo)
      this.newDate_final_interview = this.makeDate(date_final_interview)
      this.newHomework_quantity = homework_quantity
       }
       )
    }
  },
  async mounted() {
    this.getCourses().then(() => {
      this.currentItem = this.getCourseById(this.id)
      const { status, name, homework_quantity, date, date_project_start, date_project_demo, date_final_interview  } = this.currentItem
      this.newStatus = status
      this.newName = name
      this.newDate = this.makeDate(date)
      this.newDate_project_start = this.makeDate(date_project_start)
      this.newDate_project_demo = this.makeDate(date_project_demo)
      this.newDate_final_interview = this.makeDate(date_final_interview)
      this.newHomework_quantity = homework_quantity
    })
  },
  methods: {
    ...mapActions('courses', ['addNewComment', 'getCourses', 'updateCourse']),
    clearInputs() {
      this.newStatus = ""
      this.newName = ""
      this.newDate = ""
      this.newHomework_quantity = 0
      this.newDate_project_start = ""
      this.newDate_project_demo = ""
      this.newDate_final_interview = ""
    },
    makeDate(propsDate) {
      if(!propsDate) return "";
      // case dd/mm/yyyy -> yyyy-mm--dd
      const date = propsDate.split('/')

      if (date.length > 1) return `${date[2]}-${date[1]}-${date[0]}`

      return propsDate
    },
    async submit() {
      let currentItem = this.getCourseById(this.id);
      let itemCopy = JSON.parse(JSON.stringify(currentItem))

      itemCopy = {
        ...itemCopy,
        name: this.newName,
        status: this.newStatus,
        date: this.newDate,
        date_project_start: this.newDate_project_start,
        date_project_demo: this.newDate_project_demo,
        date_final_interview: this.newDate_final_interview,
        homework_quantity: this.newHomework_quantity
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
