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
   <!--  <button @click="showrole">Role</button> -->
   <!-- <router-view></router-view> -->
	</div>
   
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import BaseTable from '../components/UI/BaseTable/BaseTable.vue'

export default{
  data (){
    return{
      
    }},
  mounted() {
    this.GET_COURSES_FROM_API(), 
    localStorage.setItem("role", "user")
  },
  computed: {  
      coursForUser() {return this.getCoursesMainInfoSorted()},
      role() {return localStorage.getItem("role")}
  },
 
  methods: {
    ...mapActions(['GET_COURSES_FROM_API']),
     ...mapGetters(['getCoursesMainInfoSorted']),
    /* showrole(){
      console.log(localStorage.getItem("user"))
    } */
  },
  components: {
    BaseTable
  }

  }
</script>

<style></style>
