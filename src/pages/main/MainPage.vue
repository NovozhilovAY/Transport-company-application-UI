<template>
  <div id = app>
    <main-header></main-header>
    <main-menu></main-menu>
  </div>
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
#app{
  width: 100%;
  height: 100%;
}
body{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>