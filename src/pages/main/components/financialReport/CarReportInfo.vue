<template>
<!--  <div class="row">-->
<!--    <p>id {{carReport.id}}</p>-->
<!--    <p>{{carReport.brand}}</p>-->
<!--    <p>{{carReport.model}}</p>-->
<!--  </div>-->
<!--  <div class="row">-->
<!--    <div class="plate-number-box">-->
<!--      <p><PlateNumber :license-plate-number=carReport.licensePlate></PlateNumber></p>-->
<!--    </div>-->
<!--  </div>-->
  <table>
    <tr class="row">
      <td>id {{carReport.id}}</td>
      <td>{{carReport.brand}}</td>
      <td>{{carReport.model}}</td>
    </tr>
    <tr>
      <td colspan="3"><PlateNumber :license-plate-number=carReport.licensePlate></PlateNumber></td>
    </tr>
  </table>


</template>

<script>
import PlateNumber from "@/pages/main/components/cars/plateNumber/PlateNumber";
export default {
  name: "CarReportInfo",
  components: {PlateNumber},

props:{
  carReport:Object
}

}
</script>

<style scoped>
.row{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.plate-number-box{
  width: 100%;
}
table{
  width: 100%;
}
table td{
  text-align: center;
  display: flex;
  justify-content: center;
}
.row  {
  display: flex;
  justify-content: space-around;
}

</style>