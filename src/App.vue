<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import DatabaseManagerView from './views/DatabaseManagerView.vue'
import { RouterView } from 'vue-router'
import { SessionManager } from './classes/SessionManager';
import { $ref } from 'vue/macros';
import LoginViewVue from './views/LoginView.vue';

var sessionManager = $ref(SessionManager.sessionManager)

</script>

<template >
  <main>

    <NavBar />
    <div class="container">
      <LoginViewVue v-if="!sessionManager.currentSession" />

      <Suspense>
        <RouterView v-if="sessionManager.currentSession" />
      </Suspense>
    </div>
  </main>
</template>

<style scoped></style>
