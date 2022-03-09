<template>
  <div id="app" class="main-container">
    <main-header class="main-header"></main-header>
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
  position: relative;
  width: 100%;
  height: 100%;
}
.main-container{
  width: 100%;
  height: 100%;
  box-sizing: border-box;

}
body{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.main-header{
  position: fixed;
  z-index: 10;
  width: 100%;
}
</style>