<template>
  <div class="add-event-forn">
    <BaseInput
      v-model="courseToAdd.name"
      type="text"
      label="Course Name"         
      placeholder="Course Name"                    
    />
    <BaseInput
      v-model="courseToAdd.date"
      type="date"
      label="Date"                     
    />
    <div class="add-event-button">
      <BaseButton
        variant="btn_green"
        @click="addEvent" 
      >
        Add
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from "@/components/BaseInput";
//import { mapActions } from 'vuex';
export default {
	name: 'AddEventForm',
	components: { BaseInput, BaseButton},
	data() {
		return {
			courseToAdd: {
                id: 0,
                name: '',
                date:'',
              },
		}
	},
	methods: {
		addEvent(){
			const newCourse = {...this.courseToAdd}
			if(newCourse.name !== '' && newCourse.date !== ''){
        if(this.$store.getters.courses.length > 0)
                {
                  newCourse.id = this.$store.getters.courses[this.$store.getters.courses.length - 1].id + 1
                } else {
                  newCourse.id = 1;
                }
        console.log(this.$store.getters.courses);
        this.courseToAdd.name = '';
        this.courseToAdd.date = '';
        this.$store.dispatch('addCourseToState', newCourse)
      }
		}
	}
};
</script>

<style>
	.add-event-forn {
		@apply m-2 flex justify-center; 
	}
	.add-event-button {
		@apply  mt-6 ;
	}
</style>