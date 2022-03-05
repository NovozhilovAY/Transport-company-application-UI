<template>
  <GMapMarker :position="getPosition()"
              :icon="getIcon()"
              @click="openInfoWindow()">
      <GMapInfoWindow :opened="infoWindowOpen"
                      :position="getPosition()"
                      :closeclick="true"
                      @closeclick="closeInfoWindow()">
        <div class="info-window">
          <p class="title">{{this.car.brand}} {{this.car.model}}</p>
          <p><span class="bold-word">Номер:</span> {{this.car.licensePlate}}</p>
          <p><span class="bold-word">ТО через:</span> {{this.car.kmBeforeMaint}} км.</p>
        </div>
      </GMapInfoWindow>
  </GMapMarker>

</template>

<script>
import goodMarker from "@/assets/marker_good.png"
import warningMarker from "@/assets/marker_warning.png"
import badMarker from "@/assets/marker_bad.png"
export default {
  name: "CarMarker",
  data(){
    return{
      infoWindowOpen: false
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
    },

    openInfoWindow(){
      this.infoWindowOpen = true;
    },

    closeInfoWindow(){
      this.infoWindowOpen = false;
    }


  }
}
</script>

<style scoped>

.info-window{
  font-size: 14px;
}

.title{
  font-size: 16px;
  font-weight: bold;
}

.bold-word{
  font-weight: bold;
}

</style>