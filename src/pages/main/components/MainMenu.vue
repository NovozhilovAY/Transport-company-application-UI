<template>
  <div id="mySidenav" class="sidenav">
    <button v-on:click="setMenuItem" id = 'map'>Карта</button>
    <button v-on:click="setMenuItem" id = 'cars'>Автомобили</button>
    <button v-on:click="setMenuItem" id = 'drivers'>Водители</button>
    <button v-on:click="setMenuItem" id = 'users'>Пользователи</button>
  </div>

  <div id="main">
    <MainMap v-if="this.selectedItem === 'map'"></MainMap>
    <CarsPanel v-if="this.selectedItem === 'cars'"></CarsPanel>
  </div>
</template>

<script>
import MainMap from "@/pages/main/components/map/MainMap";
import CarsPanel from "@/pages/main/components/cars/CarsPanel";
export default {
  name: "MainMenu",
  components: {CarsPanel, MainMap},
  data(){
    return{
      selectedItem: "map"
    }
  },

  methods:{
    setMenuItem: function (event){
      this.selectedItem = event.target.id;
    }
  }
}
</script>

<style scoped>
.sidenav {
  height: 100%;
  width: 160px;
  position: fixed;
  z-index: 1;
  top: 60px;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  padding-top: 10px;
  border-right-style: solid;
  border-right-width: 1px;
}

.sidenav button {
  width: 100%;
  border-style: none;
  background-color: white;
  padding: 12px 8px 12px 6px;
  margin-top: 5px;
  text-decoration: none;
  font-size: 22px;
  color: #000000;
  display: block;
}

.sidenav button:hover {
  background-color: gainsboro;
}

#main {
  box-sizing: border-box;
  position: fixed;
  margin-left: 160px;
  padding: 0;
  width: 100%;
  height: 100%;
}

</style>