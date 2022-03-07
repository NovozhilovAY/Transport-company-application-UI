<template>
  <div v-if="car.hasOwnProperty('driver')" class="ct">
    <fieldset>
      <legend>Основная информация</legend>
      <p>Марка: {{car.brand}}</p>
      <p>Модель: {{car.model}}</p>
      <p>Номер: {{car.licensePlate}}</p>
      <p>Год выпуска: {{car.year}}</p>
    </fieldset>
    <fieldset>
      <legend>Пробег и техническое обслуживание</legend>
      <p>Пробег: {{car.kilometrage}} км.</p>
      <p>Частота ТО: {{car.maintenanceFreq}} км.</p>
      <p>Следующее ТО через: {{car.kmBeforeMaint}} км.</p>
    </fieldset>
    <fieldset>
      <legend>Водитель</legend>
    </fieldset>
    <div class="chart-container">
      <CarChart v-if="isDataLoaded" class="chart" :options="chartOptions.options" :series="chartOptions.series"></CarChart>
    </div>
  </div>
</template>

<script>
import {HistoryService} from "@/services/HistoryService";
import CarChart from "@/pages/main/components/cars/CarChart";
import {getChatrConfiguration} from "@/utils/ChatrUtil";
export default {
  name: "CarInfo",
  components: {CarChart},
  props: {
    car:Object
  },

  mounted() {
    this.isDataLoaded = false;
    this.getWeeklyStat();
  },
  watch:{
    car(){
      this.getWeeklyStat();
    }
  },

  data () {
    return {
      isDataLoaded: false,
      chartOptions: {}
    }
  },
  methods:{
    updateData(){
      return setInterval((this.getWeeklyStat), 3000);
    },
    getWeeklyStat(){
      HistoryService.getWeeklyStatistics(this.car.id).then(res => {
        this.chartOptions = getChatrConfiguration(res.kilometrage, res.week);
        console.log(this.chartOptions.options);
        console.log(this.chartOptions.series);
        this.isDataLoaded = true;
      });
    }
  }
}

</script>

<style scoped>
.chart{
  height: 100%;
  width: 100%;
}
.chart-container{
  margin-left: auto;
  margin-right: auto;
  width: 65%;
  box-sizing: border-box;
}
.ct{
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>