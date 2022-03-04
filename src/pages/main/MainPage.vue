<template>
  <main-header></main-header>
  <main-menu></main-menu>
</template>

<script>
import MainHeader from "@/pages/main/components/MainHeader";
import MainMenu from "@/pages/main/components/MainMenu";
export default {
  name: "MainPage",
  components: {MainMenu, MainHeader}
}
</script>

<style scoped>

</style>