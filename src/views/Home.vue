<template>
  <v-main>
    <v-btn @click="moveToRoute" color="primary">Go to Question.2</v-btn>
    <div >{{ postList[0] }}</div>
    <FormData @button-clicked="addPosts" />
    <div v-if="postList.length>1">{{ postList[1] }}</div>
  </v-main>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import FormData from "@/components/FormData.vue";
const postList = ref(['Question.3 '])
const router = useRouter();
const addPosts = (post) => { 
  postList.value=[]
  postList.value.push('Question.3',post)
}
const moveToRoute = function() {
  router.push('/UserList');
}

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
