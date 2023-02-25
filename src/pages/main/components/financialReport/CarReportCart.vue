<template>
<div class="car-cart">
  <p>id {{carReport.id}}</p>
  <p>{{carReport.brand}} {{carReport.model}}</p>
  <div class="plate-number-box">
    <p><PlateNumber :license-plate-number=carReport.licensePlate></PlateNumber></p>
  </div>
  <p>Среднесуточный пробег: {{carReport.avgKilometrage}} км.</p>
  <p>Пробег за год: {{carReport.yearKilometrage}} км.</p>
  <p>Количество ТО-1: {{carReport.numOfTo1}}</p>
  <p>Количество ТО-2: {{carReport.numOfTo2}}</p>
  <p>Количество КР: {{carReport.numOfKr}}</p>
  <p>Затраты на ТО-1: {{carReport.costOfTo1}}</p>
  <p>Затраты на ТО-2: {{carReport.costOfTo2}}</p>
  <p>Затраты на КР: {{carReport.costOfKr}}</p>
</div>
</template>

<script>
import PlateNumber from "@/pages/main/components/cars/plateNumber/PlateNumber";
export default {
  name: "CarReportCart",
  components: {PlateNumber},
  props:{
    carReport:Object
  }
}
</script>

<style scoped>
.car-cart{
  width: 100%;
  border-style: solid;
  border-width: 1px;
}
.plate-number-box{
  width: 20%;
}
</style>