<template>
  <div class="container">
    <div class="left-side">
      <table class="cars-table">
        <tr class="table-header"><th>id</th><th>Марка</th><th>Модель</th><th>Номер</th></tr>
        <tr class="row" v-for="(c, index) in cars" :key="index"
            v-bind:class="{warning: isWarning(c), danger:isDanger(c)}"
            @click="selectedIndex = index">
          <td>{{c.id}}</td>
          <td>{{c.brand}}</td>
          <td>{{c.model}}</td>
          <td>{{c.licensePlate}}</td>
        </tr>
      </table>
    </div>
    <div class="right-side">
      <CarInfo v-if="isDataLoaded" v-bind:car="this.cars[selectedIndex]"
               @doMaintenance="doMaintenance"
               @deleteCar="deleteCarById"
               @update="handleUpdatedCar"></CarInfo>
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
      selectedCar: null,
      selectedIndex: -1,
      updater: {},
      isDataLoaded: false
    }
  },

  mounted() {
    this.getCars();
    this.updater = this.updateData();
  },

  unmounted() {
    clearInterval(this.updater);
  },

  methods:{
    updateData(){
      return setInterval((this.getCars), 3000);
    },
    getCars(){
      CarService.getAllCars().then(result => {
        if(result.status === 200){
          this.cars = result.cars.sort((a, b)=>a.id - b.id);
          console.log(result.cars);
          if(this.cars.length !== 0 && this.selectedIndex === -1){
            this.selectedIndex = 0;
            this.isDataLoaded = true;
          }
        }
      })
    },
    isWarning(car){
      if(car.kmBeforeMaint > 0 && car.kmBeforeMaint < car.maintenanceFreq * 0.05){
        return true;
      }
    },
    isDanger(car){
      if(car.kmBeforeMaint <= 0){
        return true;
      }
    },
    setSelectedCar(c){
      this.selectedCar = c;
      this.isDataLoaded = true;
    },
    doMaintenance(car){
      let index;
      for (let i = 0; i< this.cars.length;i++){
        if(this.cars[i].id === car.id){
          index = i;
        }
      }
      CarService.doMaintenance(car.id).then(result =>{
            this.cars[index] = result;
            this.selectedCar = result;
        }
      );
    },
    deleteCarById(car){
      CarService.deleteCarById(car.id).then(
          ()=>{
            if(this.cars.indexOf(car) === this.selectedIndex){
              this.selectedIndex = 0;
            }
            this.cars.splice(this.cars.indexOf(car));
          }
      )
    },
    handleUpdatedCar(updatedCar){
      this.cars[this.cars.map((car)=>car.id).indexOf(updatedCar.id)] = updatedCar;
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
  overflow: auto;
}

.left-side::-webkit-scrollbar{
  width: 0;
}

.right-side{
  position: relative;
  display: block;
  box-sizing: border-box;
  padding: 10px;
  width: 70%;
  overflow: auto;
}

.right-side::-webkit-scrollbar{
  width: 0;
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