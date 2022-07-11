<template>
	<div  class="flex justify-center flex-col">
	<h2>Courses Dashboard View</h2> 
	<BaseTable v-if="role==='user'"
			:table-data=coursForUser
			:edit-btns="false"
			:is-data-loading="false"
			:delete-btns="false"
			:header-data=headerName
		/>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
import BaseTable from '../components/UI/BaseTable/BaseTable.vue'

export default{
  data (){
    return{
      headerName: [
				{ 'name': 'Course Name' },
				{ 'date': 'Date' },
				{ 'status': 'Status' }
			]
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
  },
  components: {
    BaseTable
  }

  }
</script>

<style>

</style>
