<template>
  <div class="home">
    <AppTable>
      <template v-slot:table-head>
        <AppTableRow
          :deleteable="false"
          :editable="false"
        >
          <AppTableField>asddsasd</AppTableField>
          <AppTableField>dsasdasdasdasd</AppTableField>
          <AppTableField>dassdadadadadasdasd</AppTableField>
          <AppTableField>asd</AppTableField>
          <AppTableField>dsdd</AppTableField>
        </AppTableRow>
      </template>

      <template v-slot:table-body>
        <AppTableRow
          @editHandler="editRow"
          @deleteHandler="deleteRow"
          v-for="item in arr"
          :key="item"
          :propsData="item"
          :deleteable="true"
          :editable="true"
        >
          <AppTableField>{{ item }}</AppTableField>
          <AppTableField>{{ item }}</AppTableField>
          <AppTableField>{{ item }}</AppTableField>
          <AppTableField :type="'vlad'">{{ item }}</AppTableField>
          <AppTableField>{{ item }}</AppTableField>
        </AppTableRow>
      </template>
    </AppTable>
  </div>
</template>

<script>
// @ is an alias to /src
import AppTable from '../components/UI/AppTable/AppTable.vue'
import AppTableRow from '../components/UI/AppTable/AppTableRow.vue'
import AppTableField from '../components/UI/AppTable/AppTableField.vue'
export default {
  name: 'HomeView',
  components: {
    AppTable,
    AppTableRow,
    AppTableField
  },
  data() {
    return {
      arr: [1, 2, 3, 4, 5, 6, 7]
    }
  },
  methods: {
    deleteRow(id) {
      this.arr = this.arr.filter(el => el !== id)
    },
    editRow(id) {
      console.log("Row is editing " + id);
    }
  }
}
</script>

