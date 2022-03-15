<template>
  <div id="mySidenav" class="sidenav">
    <button v-if="this.hasRole(['ADMIN', 'DISPATCHER'])" v-on:click="setMenuItem" id = 'map'>Карта</button>
    <button v-if="this.hasRole(['ADMIN', 'DISPATCHER'])" v-on:click="setMenuItem" id = 'cars'>Автомобили</button>
    <button v-if="this.hasRole(['ADMIN', 'DISPATCHER'])" v-on:click="setMenuItem" id = 'drivers'>Водители</button>
    <button v-if="this.hasRole(['ADMIN'])" v-on:click="setMenuItem" id = 'users'>Пользователи</button>
  </div>

  <div id="main">
    <MainMap v-if="this.hasRole(['ADMIN', 'DISPATCHER']) && this.selectedItem === 'map'"></MainMap>
    <CarsPanel v-if="this.selectedItem === 'cars'"></CarsPanel>
    <DriversPanel v-if="this.selectedItem === 'drivers'"></DriversPanel>
    <UsersPanel v-if="this.selectedItem ==='users'"></UsersPanel>
  </div>
</template>

<script>
import MainMap from "@/pages/main/components/map/MainMap";
import CarsPanel from "@/pages/main/components/cars/CarsPanel";
import UsersPanel from "@/pages/main/components/users/UsersPanel";
import DriversPanel from "@/pages/main/components/drivers/DriversPanel";
export default {
  name: "MainMenu",
  components: {DriversPanel, UsersPanel, CarsPanel, MainMap},
  data(){
    return{
      selectedItem: "map"
    }
  },

  methods:{
    setMenuItem: function (event){
      this.selectedItem = event.target.id;
    },
    hasRole(rolesArr){
      let roles = JSON.parse(localStorage.getItem('user')).roles;
      console.log(roles);
      for (let i=0; i<roles.length;i++){
        if(rolesArr.indexOf(roles[i].replace("ROLE_", "")) !== -1){
          return true;
        }
      }
      return false;
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
  position: fixed;
  top:0;
  left: 0;
  height: 100%;
  width: 100%;
  padding-top:60px;
  box-sizing: border-box;
  padding-left: 160px;
}

</style>