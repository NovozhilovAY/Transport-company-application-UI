<template>
  <GMapMap :center="{lat: 56.286617,lng: 43.947297}"
           :zoom="11"
           map-type-id="roadmap"
           style="height: 100%;width: 100%"
           class="google-map">

    <CarMarker v-for="c in cars" :car="c" :key="c.id"></CarMarker>
  </GMapMap>
</template>

<script>
import {CarService} from "@/services/CarService";
import CarMarker from "@/pages/main/components/map/CarMarker";

export default {
  name: "MainMap",
  components: {CarMarker},
  data: function () {
    return {
      cars: [],
    }
  },
  mounted() {

    this.getCars();
  },
  methods:{
    getCars(){
      setInterval(()=>{
        CarService.getAllCars().then(result => {
          if(result.status === 200){
            console.log(result.status);
            console.log(result.cars);
            this.cars = result.cars;
          }
        })
      }, 2000);
    },
    initCars(){

    }
  }
}
</script>

<style scoped>
.google-map {
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
  background: gray;
}
</style>