<template>
  <v-main>
    <UserLists :header="header" />
  </v-main>
</template>

<script setup>
import UserLists from "@/components/UserLists.vue";
import { ref } from 'vue';
const header = ref([
  { text: 'Beer', align: 'left', filterable: false, value: 'name' },
  { text: 'Desc', value: 'tagline' },
  { text: 'ABV', value: 'abv' },
  { text: 'IBU', value: 'ibu' },
]);
</script>

<style scoped>
.top {
  margin-top: 100px;
}

.text {
  margin-top: -40px;
  margin-left: 80px;
}

.top-day {
  margin-top: 120px;
}
</style>
