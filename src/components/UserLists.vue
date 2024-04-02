<template>
  <div>
    <v-app class="container">
      <v-card flat v-if="mainRecord.length">
        <v-card-title>
          <v-text-field v-model="search" @input="Search" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table v-if="users" :headers="headers" :items="users" item-key="name" :search="search" :page.sync="page"
          :items-per-page="itemsPerPage" hide-default-footer>
        </v-data-table>
      </v-card>
    </v-app>


  </div>
</template>

<script>
import { ref, defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex'


export default defineComponent({
  props: {
    header: {
      type: Object, // Specify the type of prop1
      required: true // Whether prop1 is required or not
    }
  },
  setup(props) {
    const valid = ref(true);
    const store = useStore()
    const { header } = props

    console.log("props", header);
    const position = ref(null);
    let search = ref('')
    var headers = ref(header)
    var itemsPerPage = ref(5)
     var Searchable = ref(null)
     var perPageChoices= ref( [
          {text:'5 records/page' , value: 5},
          {text:'10 records/page' , value: 10},
          {text:'20 records/page' , value: 20},
      ])
    var users = computed(() => store.state.users);
    let totalRecords = users.value?.length
    let mainRecord = computed(function () {
      return users.value?.filter(item => item.title.includes(Searchable.value))
    });
    let pageCount = computed(function () {
      console.log("totalRecords.value", users.value?.length, itemsPerPage.value);
      return users.value?.length / itemsPerPage.value
    });
    
    onMounted(() => {
      store.dispatch('loadUsers');

      totalRecords = users.value?.length
     
    })
    const Search = (e) => {
      Searchable.value = e.target.value
      console.log(e.target.value, Searchable.value);
    }
    return {
      valid,
      store, users,
      totalRecords, pageCount, Search, mainRecord
    };
  },
});
</script>
<style>
.v-application .primary {
    background-color: #1976d2 !important;
    border-color: #1976d2 !important;
}
.v-data-table-footer {
  flex-direction: column;
}
</style>
