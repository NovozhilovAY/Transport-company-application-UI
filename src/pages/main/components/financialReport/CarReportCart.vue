<template>
<div class="car-cart">
  <div class="car-report-info-container">
    <CarReportInfo :car-report=carReport></CarReportInfo>
  </div>
  <div class="car-report-prop">
    <p>Среднесуточный пробег: {{carReport.avgKilometrage}} км.</p>
    <p>Пробег за год: {{carReport.yearKilometrage}} км.</p>
    <p>Количество ТО-1: {{carReport.numOfTo1}}</p>
    <p>Количество ТО-2: {{carReport.numOfTo2}}</p>
    <p>Количество КР: {{carReport.numOfKr}}</p>
    <p>Затраты на ТО-1: {{carReport.costOfTo1}}</p>
    <p>Затраты на ТО-2: {{carReport.costOfTo2}}</p>
    <p>Затраты на КР: {{carReport.costOfKr}}</p>
  </div>

</div>
</template>

<script>

import CarReportInfo from "@/pages/main/components/financialReport/CarReportInfo";
export default {
  name: "CarReportCart",
  components: {CarReportInfo},
  props:{
    carReport:Object
  }
}
</script>

<style scoped>
.car-cart{
  width: 100%;
  border: black 1px solid;
  border-radius: 10px;
  display: flex;
  margin-top: 20px;

}
.car-report-info-container{
  width: 200px;
  height: 100px;
  border: rgb(192, 192, 192) 1px solid;
  border-radius: 10px;
  margin: 7px 0 7px 7px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.car-report-prop{
  display: flex;
  flex-wrap: wrap;
  width: 750px;
}
p{
  margin: 7px 0 3px 30px;
}
</style>