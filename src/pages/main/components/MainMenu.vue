<template>
  <div id="mySidenav" class="sidenav">
    <button v-on:click="setMenuItem" id = 'item1'>Карта</button>
    <button v-on:click="setMenuItem" id = 'item2'>item2</button>
    <button v-on:click="setMenuItem" id = 'item3'>item3</button>
  </div>

  <div id="main">
    <div v-if="this.selectedItem === 'item1'">
      <MainMap></MainMap>
    </div>
  </div>
</template>

<script>
import MainMap from "@/pages/main/components/map/MainMap";
export default {
  name: "MainMenu",
  components: {MainMap},
  data(){
    return{
      selectedItem: "item1"
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
  padding-top: 20px;
  border-right-style: solid;
  border-right-width: 1px;
}

.sidenav button {
  width: 100%;
  border-style: none;
  background-color: white;
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #000000;
  display: block;
}

.sidenav button:hover {
  background-color: gainsboro;
}

#main {
  position: fixed;
  margin-left: 160px;
  padding: 0;
  width: 100%;
  height: 100%;
}

</style>