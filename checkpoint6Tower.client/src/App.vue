<template>
  <main>
    <div class="body">
      <Navbar />
      <router-view />
    </div>
    <Login />
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { AppState } from './AppState'
import Login from './components/Login.vue'
import Navbar from './components/Navbar.vue'


</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>

<style scoped>
main {
  display: flex;
  width: 100%;
  background-color: inherit;
  color: inherit;
  min-height: 100vh;
  position: relative;
}

.body {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  background-color: inherit;
  color: inherit;
  padding: 1rem;
  gap: 1rem;
}
</style>