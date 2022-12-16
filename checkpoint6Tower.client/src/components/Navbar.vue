<template>
  <img src="../assets/img/LogotowerLogo.png" alt="Tower : Logo" @click="goHome" />
</template>

<script setup>
import { useRouter } from 'vue-router'
let router = useRouter()
function goHome() {
  router.push({ name: 'Home' })
}

</script>

<style scoped>
img {
  width: 20rem;
  height: auto;
  margin-left: -0.8rem;
  cursor: pointer;
  /* getting the img aligned with the container */
}
</style>
