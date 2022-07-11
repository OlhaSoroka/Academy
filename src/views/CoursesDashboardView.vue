<template>
  <div class="flex justify-center flex-col">
    <h2>Courses Dashboard View</h2> 
    <BaseTable 
      v-if="role==='user'"
      :table-data="coursForUser"
      :edit-btns="false"
      :is-data-loading="false"
      :delete-btns="false"
      :header-data="headers"
    />
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
import BaseTable from '../components/UI/BaseTable/BaseTable.vue'

export default{
	components: {
    BaseTable
  },
  data (){
    return{
      headers: [
				{ 'name': 'Course Name' },
				{ 'date': 'Date' },
				{ 'status': 'Status' }
			]
    }},
  computed: {  
      coursForUser() {return this.sortedCourses()},
      role() {return localStorage.getItem("role")}
  },
 mounted() {
    this.getCourses(), 
    localStorage.setItem("role", "user")
  },
  methods: {
    ...mapActions(['getCourses']),
     ...mapGetters(['sortedCourses']),
  }
  }

</script>

<style></style>
