<template>
  <GMapMarker :position="getPosition()"
              :icon="getIcon()"
  ></GMapMarker>
</template>

<script>
import goodMarker from "@/assets/marker_good.png"
import warningMarker from "@/assets/marker_warning.png"
import badMarker from "@/assets/marker_bad.png"
export default {
  name: "CarMarker",
  data(){
    return{
    }
  },
  props: {
    car:{}
  },
  methods:{
    getPosition(){
      return{lat: this.car.latitude,lng: this.car.longitude}
    },
    getIcon(){
      if(this.car.kmBeforeMaint <= 0){
        return badMarker;
      }else if(this.car.kmBeforeMaint < this.car.maintenanceFreq * 0.05){
        return warningMarker;
      }else {
        return goodMarker;
      }
    }
  }
}
</script>

<style scoped>

</style>