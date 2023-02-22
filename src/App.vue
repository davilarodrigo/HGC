<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import DatabaseManagerView from './views/DatabaseManagerView.vue'
import { RouterView } from 'vue-router'

</script>

<template >
  <main>
    <NavBar />
    <div class="container">
      <DatabaseManagerView></DatabaseManagerView>
      <RouterView />
    </div>

    <!-- <router-link to="/rep">Go to reports</router-link> -->
    <!-- <HelloWorld msg="You did it!" /> -->
  </main>
</template>

<style scoped></style>
