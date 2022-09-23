<template>
  <BaseModal
    ref="homeworkResultsUpdateModal"
    :header="'Update homework results'"
  >
    <template 
      #body 
    >
      <h2 v-if="currentStudent">
        For {{ currentStudent.students_name }}
      </h2>
      <div class="flex justify-center flex-col mt-7  gap-10">
        <ValidationObserver v-slot="{ invalid }">
          <div class="text-left">
            <div v-if="getCourseById(id).homework_quantity > 0">
              <label
                for="hw1"
              >HW1</label>
              <BaseInput
                id="hw1"
                v-model="newhw1"
                type="number"
              />
              <label
                for="hw1repo"
              >Репо1</label>
              <BaseInput
                id="hw1repo"
                v-model="newhw1repo"
                @dblclick="openPage(newhw1repo)"
              />
            </div>
            <div v-if="getCourseById(id).homework_quantity > 1">
              <label
                for="hw2"
              >HW2</label>
              <BaseInput
                id="hw2"
                v-model="newhw2"
                type="number"
              />
              <label
                for="hw2repo"
              >Репо2</label>
              <BaseInput
                id="hw2repo"
                v-model="newhw2repo"
                @dblclick="openPage(newhw2repo)"
              />
            </div>
            <div v-if="getCourseById(id).homework_quantity > 2">
              <label
                for="hw3"
              >HW3</label>
              <BaseInput
                id="hw3"
                v-model="newhw3"
                type="number"
              />
              <label
                for="hw3repo"
              >Репо3</label>
              <BaseInput
                id="hw3repo"
                v-model="newhw3repo"
                @dblclick="openPage(newhw3repo)"
              />
            </div>
            <div v-if="getCourseById(id).homework_quantity > 3">
              <label
                for="hw4"
              >HW4</label>
              <BaseInput
                id="hw4"
                v-model="newhw4"
                type="number"
              />
              <label
                for="hw4repo"
              >Репо4</label>
              <BaseInput
                id="hw4repo"
                v-model="newhw4repo"
                @dblclick="openPage(newhw4repo)"
              />
            </div>
            <div v-if="getCourseById(id).homework_quantity > 4">
              <label
                for="hw5"
              >HW5</label>
              <BaseInput
                id="hw5"
                v-model="newhw5"
                type="number"
              />
              <label
                for="hw5repo"
              >Репо5</label>
              <BaseInput
                id="hw5repo"
                v-model="newhw5repo"
                @dblclick="openPage(newhw5repo)"
              />
            </div>
            <div v-if="getCourseById(id).homework_quantity > 5">
              <label
                for="hw6"
              >HW6</label>
              <BaseInput
                id="hw6"
                v-model="newhw6"
                type="number"
              />
              <label
                for="hw6repo"
              >Репо6</label>
              <BaseInput
                id="hw6repo"
                v-model="newhw6repo"
                @dblclick="openPage(newhw6repo)"
              />
            </div>
            <div v-if="getCourseById(id).homework_quantity > 6">
              <label
                for="hw7"
              >HW7</label>
              <BaseInput
                id="hw7"
                v-model="newhw7"
                type="number"
              />
              <label
                for="hw7repo"
              >Репо7</label>
              <BaseInput
                id="hw7repo"
                v-model="newhw7repo"
                @dblclick="openPage(newhw7repo)"
              />
            </div>
            <div v-if="getCourseById(id).homework_quantity > 7">
              <label
                for="hw8"
              >HW8</label>
              <BaseInput
                id="hw8"
                v-model="newhw8"
                type="number"
              />
              <label
                for="hw8repo"
              >Репо8</label>
              <BaseInput
                id="hw8repo"
                v-model="newhw8repo"
                @dblclick="openPage(newhw8repo)"
              />
            </div>
            <div v-if="getCourseById(id).homework_quantity > 8">
              <label
                for="hw9"
              >HW9</label>
              <BaseInput
                id="hw9"
                v-model="newhw9"
                type="number"
              />
              <label
                for="hw9repo"
              >Репо9</label>
              <BaseInput
                id="hw9repo"
                v-model="newhw9repo"
                @dblclick="openPage(newhw9repo)"
              />
            </div>
            <div v-if="getCourseById(id).homework_quantity > 9">
              <label
                for="hw10"
              >HW10</label>
              <BaseInput
                id="hw10"
                v-model="newhw10"
                type="number"
              />
              <label
                for="hw10repo"
              >Репо10</label>
              <BaseInput
                id="hw10repo"
                v-model="newhw10repo"
                @dblclick="openPage(newhw10repo)"
              />
            </div>
            <div v-if="getCourseById(id).homework_quantity > 10">
              <label
                for="hw11"
              >HW11</label>
              <BaseInput
                id="hw11"
                v-model="newhw11"
                type="number"
              />
              <label
                for="hw11repo"
              >Репо11</label>
              <BaseInput
                id="hw11repo"
                v-model="newhw11repo"
                @dblclick="openPage(newhw11repo)"
              />
            </div>
          </div>
          <div class="mx-1 flex justify-around">
            <BaseButton
              variant="btn_red"
              @click="cancel"
            >
              Cancel
            </BaseButton>
            <BaseButton
              :disabled="invalid"
              @click="submit"
            >
              Update
            </BaseButton>
          </div>
        </ValidationObserver>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '@/components/BaseComponents/BaseButton.vue';
import BaseModal from '@/components/BaseComponents/BaseModal.vue';
import BaseInput from '@/components/BaseComponents/BaseInput.vue';
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    BaseModal,
    BaseButton,
    BaseInput,
    ValidationObserver
  },
  props: {
    toggleModal: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: null,
    },
    studentId: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
     currentStudent: {
      type: Object
     },
     currentItem: {
      type: Object
     },
      newhw1: 0,
      newhw1repo: "",
      newhw2: 0,
      newhw2repo: "",
      newhw3: 0,
      newhw3repo: "",
      newhw4: 0,
      newhw4repo: " ",
      newhw5: 0,
      newhw5repo: " ",
      newhw6: 0,
      newhw6repo: " ",
      newhw7: 0,
      newhw7repo: " ",
      newhw8: 0,
      newhw8repo: " ",
      newhw9: 0,
      newhw9repo: " ",
      newhw10: 0,
      newhw10repo: " ",
      newhw11: 0,
      newhw11repo: " ",
      newtotal: 0
    };
  },
  computed: {
    ...mapGetters('courses', ['getCourseById', 'courses']),
  },
  watch: {
    toggleModal() {
      this.$refs.homeworkResultsUpdateModal.openModal();
    },
    studentId() {
    this.getCourses().then(() => {
      this.updateHW()
    })
    },
   id() {
this.getCourses().then(() => {
  this.updateHW()
    })
    }
  },
  async mounted() {
    this.getCourses().then(() => {
      this.updateHW()
    })
  },
  methods: {
    ...mapActions('courses', ['addNewComment', 'getCourses', 'updateCourse']),
    async submit() {
      let currentItem = this.getCourseById(this.id);
      let itemCopy = JSON.parse(JSON.stringify(currentItem.homework_results.find((e) => e.id === this.studentId)));
      itemCopy = {
        ...itemCopy,
        hw1: +this.newhw1,
        hw1repo: this.newhw1repo,
        hw2: +this.newhw2,
        hw2repo: this.newhw2repo,
        hw3: +this.newhw3,
        hw3repo: this.newhw3repo,
        hw4: +this.newhw4,
        hw4repo: this.newhw4repo,
        hw5: this.newhw5,
        hw5repo: this.newhw5repo,
        hw6: +this.newhw6,
        hw6repo: this.newhw6repo,
        hw7: +this.newhw7,
        hw7repo: this.newhw7repo,
        hw8: +this.newhw8,
        hw8repo: this.newhw8repo,
        hw9: +this.newhw9,
        hw9repo: this.newhw9repo,
        hw10: +this.newhw10,
        hw10repo: this.newhw10repo,
        hw11: +this.newhw11,
        hw11repo: this.newhw11repo,
        total: +this.newhw1 + +this.newhw2 + +this.newhw3 + +this.newhw4 + +this.newhw5 + +this.newhw6 + +this.newhw7 + +this.newhw8 + +this.newhw9 + +this.newhw10 + +this.newhw11 
      }
      let newResult =[...currentItem.homework_results.filter((e) => e.id !== this.studentId), itemCopy];
      currentItem.homework_results=newResult;
      await this.updateCourse({ id: currentItem.id, course: currentItem })
      await this.getCourses()
      this.$refs.homeworkResultsUpdateModal.closeModal();
    },
    cancel() {
      this.$refs.homeworkResultsUpdateModal.closeModal();
    },
    openPage(page) {window.open(page, '_blank')},
    updateHW() {
      this.currentItem = this.getCourseById(this.id)
      if (this.currentItem.homework_results) {this.currentStudent = this.currentItem.homework_results.find((e) => e.id === this.studentId)}
      if (this.currentStudent) {
      this.newhw1 = +this.currentStudent.hw1
      this.newhw1repo = this.currentStudent.hw1repo
      this.newhw2 = +this.currentStudent.hw2
      this.newhw2repo = this.currentStudent.hw2repo
      this.newhw3 = +this.currentStudent.hw3
      this.newhw3repo = this.currentStudent.hw3repo
      this.newhw4 = +this.currentStudent.hw4
      this.newhw4repo = this.currentStudent.hw4repo
      this.newhw5 = +this.currentStudent.hw5
      this.newhw5repo = this.currentStudent.hw5repo
      this.newhw6 = +this.currentStudent.hw6
      this.newhw6repo = this.currentStudent.hw6repo
      this.newhw7 = +this.currentStudent.hw7
      this.newhw7repo = this.currentStudent.hw7repo
      this.newhw8 = +this.currentStudent.hw8
      this.newhw8repo = this.currentStudent.hw8repo
      this.newhw9 = +this.currentStudent.hw9
      this.newhw9repo = this.currentStudent.hw9repo
      this.newhw10 = +this.currentStudent.hw10
      this.newhw10repo = this.currentStudent.hw10repo
      this.newhw11 = +this.currentStudent.hw11
      this.newhw11repo = this.currentStudent.hw11repo
      this.newtotal = +this.currentStudent.hw1 +this.currentStudent.hw2 + +this.currentStudent.hw3 + +this.currentStudent.hw4 + +this.currentStudent.hw5 + +this.currentStudent.hw6 + +this.currentStudent.hw7 + +this.currentStudent.hw8 + +this.currentStudent.hw9  +this.currentStudent.hw10 + +this.currentStudent.hw11
       } 
      }
  },

};
</script>
