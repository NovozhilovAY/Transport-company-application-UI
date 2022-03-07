<template>
  <div class="container">
    <div class="left-side">
      <table class="cars-table">
        <tr class="table-header"><th>id</th><th>Марка</th><th>Модель</th><th>Номер</th></tr>
        <tr class="row" v-for="c in cars" :key="c.id"
            v-bind:class="{warning: isWarning(c), danger:isDanger(c)}"
            @click="setSelectedCar(c)">
          <td>{{c.id}}</td>
          <td>{{c.brand}}</td>
          <td>{{c.model}}</td>
          <td>{{c.licensePlate}}</td>
        </tr>
      </table>
    </div>
    <div class="right-side">
      <CarInfo v-if="isDataLoaded" v-bind:car="selectedCar"></CarInfo>
    </div>
  </div>
</template>

<script>
import {CarService} from "@/services/CarService";
import CarInfo from "@/pages/main/components/cars/CarInfo";

export default {
  name: "CarsPanel",
  components: {CarInfo},
  data: function () {
    return {
      cars: [],
      selectedCar: {},
      updater: {},
      isDataLoaded: false
    }
  },

  mounted() {
    this.getCars();
  },

  unmounted() {
    clearInterval(this.updater);
  },

  methods:{
    updateData(){
      return setInterval((this.getCars), 10000);
    },
    getCars(){
      CarService.getAllCars().then(result => {
        if(result.status === 200){
          this.cars = result.cars;
        }
      })
    },
    isWarning(car){
      if(car.kmBeforeMaint > 0 && car.kmBeforeMaint < car.maintenanceFreq * 0.05){
        return true;
      }
    },
    isDanger(car){
      if(car.kmBeforeMaint < 0){
        return true;
      }
    },
    setSelectedCar(c){
      this.selectedCar = c;
      this.isDataLoaded = true;
    }
  }
}
</script>

<style scoped>
.container{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  height: 100%;
  width: 100%;
  background-color: white;
  margin: 0;
  box-sizing: border-box;
}

.right-side, .left-side {
  height: 100%;
}

.left-side{
  width: 30%;
  border-right-width: 1px;
  border-right-style: solid;
  border-color: gray;
}

.right-side{
  position: relative;
  display: block;
  box-sizing: border-box;
  padding: 10px;
  width: 60%;

}

.cars-table{
  font-size: 20px;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}

table.cars-table tr:hover td{
  background-color: gainsboro;
}

.table-header{
  width: 100%;
  text-align: center;
}

td{
  border-bottom-style: solid;
  border-bottom-width: 1px;

  padding-top: 10px;
  padding-bottom: 10px;
  border-color: #c0bfbf;
}

th{
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: black;
}

.warning{
  background-color: #ffea76;
}

.danger{
  background-color: #f88181;
}

table.cars-table tr.danger:hover td{
  background-color: #ff5656;
}

table.cars-table tr.warning:hover td{
  background-color: #ffff2c;
}

</style>