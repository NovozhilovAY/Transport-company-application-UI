<template>
  <fieldset class="block-item">
    <legend>Данные для отчета</legend>
    <div>
      <p>Количество рабочих дней в году</p>
      <input v-model="reportData.numWorkingDays">
      <p>Стоимость ТО-1</p>
      <input v-model="reportData.to1Cost">
      <p>Стоимость ТО-2</p>
      <input v-model="reportData.to2Cost">
      <p>Стоимость КР</p>
      <input v-model="reportData.krCost">
    </div>
    <button @click="updateReportData">Обновить</button>
  </fieldset>
  <fieldset class="block-item">
    <legend>Финансовый прогноз</legend>
    <div>
      <p>Годовой пробег всех автомобилей : {{report.totalKilometrage}} км.</p>
      <p>Общее количество ТО-1 : {{report.totalNumOfTo1}}</p>
      <p>Общее количество ТО-2 : {{report.totalNumOfTo2}}</p>
      <p>Общее количество КР : {{report.totalNumOfKr}}</p>
      <p>Стоимость проведения ТО-1 : {{report.totalCostTo1}} руб.</p>
      <p>Стоимость проведения ТО-2 : {{report.totalCostTo2}} руб.</p>
      <p>Стоимость проведения КР : {{report.totalCostKr}} руб.</p>
      <p>Итого годовые затраты на ТО и КР : {{report.totalCosts}} руб.</p>
    </div>
    <CarReportCart v-for="(car) in report.carFinancialReports" :car-report="car" :key="car"></CarReportCart>
  </fieldset>

</template>

<script>
import {FinancialReportService} from "@/services/FinancialReportService";
import CarReportCart from "@/pages/main/components/financialReport/CarReportCart";

export default {
  name: "FinancialReport",
  components: {CarReportCart},
  data(){
    return {
      report:{},
      reportData:{}
    }
  },
  mounted() {
    this.getFinancialReport();
    this.getFinancialReportData();
  },
  methods:{
    getFinancialReport() {
      FinancialReportService.getFinancialReport().then(res => {
        this.report = res;
      });
    },
    getFinancialReportData() {
      FinancialReportService.getFinancialReportData().then(res => {
        console.log(res);
        this.reportData = res;
      });
    },
    updateReportData() {
      FinancialReportService.updateFinancialReportData(this.reportData).then(res => {
        this.reportData = res;
        this.getFinancialReport();
      });
    }
  }
}
</script>

<style scoped>
.block-item{
  margin: 5px;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  width: 85%;
}
</style>