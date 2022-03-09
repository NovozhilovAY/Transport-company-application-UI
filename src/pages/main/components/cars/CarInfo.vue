<template>
  <div class="info-container">
    <div class="info-block">
      <fieldset class="block-item">
        <legend>Основная информация</legend>
        <p>Марка: {{car.brand}}</p>
        <p>Модель: {{car.model}}</p>
        <p>Номер: {{car.licensePlate}}</p>
        <p>Год выпуска: {{car.year}}</p>
      </fieldset>
      <fieldset class="block-item">
        <legend>Пробег и техническое обслуживание</legend>
        <p>Пробег: {{car.kilometrage}} км.</p>
        <p>Частота ТО: {{car.maintenanceFreq}} км.</p>
        <p>Следующее ТО через: {{car.kmBeforeMaint}} км.</p>
        <p>
          <button @click="maintenanceDialogOpen = true">Провести ТО</button>
        </p>
      </fieldset>
      <fieldset class="block-item">
        <legend>Водитель</legend>
        <div v-if="car.driver">
          <p>Фамилия: {{car.driver.lastName}}</p>
          <p>Имя: {{car.driver.firstName}}</p>
          <p>Отчество: {{car.driver.middleName}}</p>
          <p>Номер ВУ: {{car.driver.drivingLicense}}</p>
        </div>
        <div v-else>
          <p>Водитель не назначен</p>
        </div>
      </fieldset>
    </div>
    <fieldset class="chart-fieldset">
      <legend>
        Пробег за неделю
      </legend>
      <div class="chart-container">
        <CarChart v-if="isDataLoaded" class="chart" :options="chartOptions.options" :series="chartOptions.series"></CarChart>
      </div>
    </fieldset>
    <div class="info-block">

      <fieldset class="block-item">
        <legend>Управление</legend>
        <button @click="updateCarModalOpen = true">Редактировать</button>
        <button @click="deleteDialogOpen = true">Удалить</button>
      </fieldset>
    </div>

    <ConfirmDialog v-if="deleteDialogOpen" @yes="positiveDeleteDialogHandler" @no="negativeDeleteDialogHandler"></ConfirmDialog>
    <ConfirmDialog v-if="maintenanceDialogOpen" @yes="positiveMaintenanceDialogHandler" @no="negativeMaintenanceDialogHandler"></ConfirmDialog>
    <UpdateCarModal v-if="updateCarModalOpen"
                    :car = "car"
                    @exit="updateCarModalExit"
                    @update="updateCarModalSuccess"></UpdateCarModal>

  </div>
</template>

<script>
import {HistoryService} from "@/services/HistoryService";
import CarChart from "@/pages/main/components/cars/CarChart";
import {getChatrConfiguration} from "@/utils/ChatrUtil";
import ConfirmDialog from "@/pages/main/components/cars/modals/ConfirmDialog";
import UpdateCarModal from "@/pages/main/components/cars/modals/UpdateCarModal";
export default {
  name: "CarInfo",
  components: { UpdateCarModal, ConfirmDialog, CarChart},
  props: {
    car:Object
  },

  mounted() {
    console.log(this.car.driver);
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
      chartOptions: {},
      deleteDialogOpen: false,
      maintenanceDialogOpen: false,
      updateCarModalOpen:false
    }
  },
  methods:{
    getWeeklyStat(){
      HistoryService.getWeeklyStatistics(this.car.id).then(res => {
        this.chartOptions = getChatrConfiguration(res.kilometrage, res.week);
        console.log(this.chartOptions.options);
        console.log(this.chartOptions.series);
        this.isDataLoaded = true;
      });
    },
    doMaintenance(){
      this.$emit('doMaintenance', this.car);
    },
    deleteCar(){
      this.$emit('deleteCar', this.car);
    },
    positiveDeleteDialogHandler(){
      this.deleteDialogOpen = false;
      this.deleteCar();
    },
    negativeDeleteDialogHandler(){
      this.deleteDialogOpen = false;
    },
    positiveMaintenanceDialogHandler(){
      this.doMaintenance();
      this.maintenanceDialogOpen = false;
    },
    negativeMaintenanceDialogHandler(){
      this.maintenanceDialogOpen = false;
    },
    updateCarModalExit(){
      this.updateCarModalOpen = false;
    },
    updateCarModalSuccess(updatedCar){
      this.updateCarModalOpen = false;
      this.$emit('update', updatedCar);
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
  width: 60%;
  box-sizing: border-box;
}
.info-container{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.info-block{
  display: flex;
}

.block-item{
  margin: 5px;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  width: 33%;
}

.chart-fieldset{
  margin: 5px;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
}
</style>