<template>
	<div class="flex justify-center flex-col"> 
	<h1>CoursesView</h1> 
  <BaseTable v-if="role==='user'"
			:table-data=coursForUser
			:edit-btns="false"
			:is-data-loading="false"
			:delete-btns="false"
			:header-data="[
				{ 'name': 'Course Name' },
				{ 'date': 'Date' },
				{ 'status': 'Status' }
			]"
		/>
	</div>
  
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import BaseTable from '../components/UI/BaseTable/BaseTable.vue'

export default{
  data (){
    return{
      role:  "user"
    }},
  mounted() {
    this.GET_COURSES_FROM_API()
  },
  computed: {
      coursForUser() {return this.getCoursesMainInfoSorted()}
  },

  methods: {
    ...mapActions(['GET_COURSES_FROM_API']),
     ...mapGetters(['getCoursesMainInfoSorted']),
    showcours(){
      console.log(this.getCoursesMainInfoSorted())
    }
  },
  components: {
    BaseTable
  }

  }
</script>

<style></style>
