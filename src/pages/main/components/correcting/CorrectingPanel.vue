<template>
<p>Условия движения</p>
  <select v-model="correctingData.cityType">
    <option :value=CityType.OUT.value>{{CityType.OUT.description}}</option>
    <option :value=CityType.SMALL.value>{{CityType.SMALL.description}}</option>
    <option :value=CityType.LARGE.value>{{CityType.LARGE.description}}</option>
  </select>
<p>Группа дорог</p>
  <select v-model="correctingData.roadType">
    <option :value=RoadType.D1.value>{{RoadType.D1.description}}</option>
    <option :value=RoadType.D2.value>{{RoadType.D2.description}}</option>
    <option :value=RoadType.D3.value>{{RoadType.D3.description}}</option>
    <option :value=RoadType.D4.value>{{RoadType.D4.description}}</option>
    <option :value=RoadType.D5.value>{{RoadType.D5.description}}</option>
  </select>
<p>Рельеф местности, определяется высотой над уровнем моря</p>
  <select v-model="correctingData.reliefType">
    <option :value=ReliefType.R1.value>{{ReliefType.R1.description}}</option>
    <option :value=ReliefType.R2.value>{{ReliefType.R2.description}}</option>
    <option :value=ReliefType.R3.value>{{ReliefType.R3.description}}</option>
    <option :value=ReliefType.R4.value>{{ReliefType.R4.description}}</option>
    <option :value=ReliefType.R5.value>{{ReliefType.R5.description}}</option>
  </select>
<p>Климатический район</p>
  <select v-model="correctingData.climateType">
    <option :value=ClimateType.TEMPERATE.value>{{ClimateType.TEMPERATE.description}}</option>
    <option :value=ClimateType.WARM_TEMPERATE.value>{{ClimateType.WARM_TEMPERATE.description}}</option>
    <option :value=ClimateType.HOT_DRY.value>{{ClimateType.HOT_DRY.description}}</option>
    <option :value=ClimateType.MODERATELY_COLD.value>{{ClimateType.MODERATELY_COLD.description}}</option>
    <option :value=ClimateType.COLD.value>{{ClimateType.COLD.description}}</option>
    <option :value=ClimateType.VERY_COLD.value>{{ClimateType.VERY_COLD.description}}</option>
  </select>
  <button @click="updateCorrectingData">Обновить</button>
</template>

<script>
import {CorrectingService} from "@/services/CorrectingService";
import CityType from "@/pages/main/components/correcting/model/CityType";
import {RoadType} from "@/pages/main/components/correcting/model/RoadType";
import {ReliefType} from "@/pages/main/components/correcting/model/ReliefType";
import {ClimateType} from "@/pages/main/components/correcting/model/ClimateType";

export default {
  name: "CorrectingPanel",
  data(){
    return{
      CityType: CityType,
      RoadType: RoadType,
      ReliefType: ReliefType,
      ClimateType: ClimateType,
      correctingData: {}
    }
  },
  mounted() {
    this.getCorrectingData();
  },
  methods:{
    getCorrectingData(){
      CorrectingService.getCorrectingData().then(res => {
        console.log(res);
        this.correctingData = res.correctingData;
      })
    },
    updateCorrectingData() {
      CorrectingService.updateCorrectingData(this.correctingData).then(res => {
        console.log(res);
        this.correctingData = res.correctingData;
      })
    }
  }
}
</script>

<style scoped>

</style>