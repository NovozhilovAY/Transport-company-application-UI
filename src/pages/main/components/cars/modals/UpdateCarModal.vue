<template>
<div class="modal-backdrop">
  <div class="modal">
    <div class="modal-header">
      <label class="modal-title">Редактирование данных</label>
      <button @click="exit" class="exit-btn">&#10006;</button>
    </div>
    <ul v-if="this.errors.length !== 0">
      <li class="err-record" v-for:="(error, index) in errors" :key="index">{{error.details}}</li>
    </ul>
    <div class="info-block">
      <fieldset class="block-item">
        <legend>Основная информация</legend>
        <p>Марка:
          <input class="input-field" type="text" v-model="updatedCar.brand">
        </p>
        <p>Модель:
          <input class="input-field" type="text" v-model="updatedCar.model">
        </p>
        <p>Номер:
          <input class="input-field" type="text" v-model="updatedCar.licensePlate">
        </p>
        <p>Год выпуска:
          <input class="input-field" type="text" v-model="updatedCar.year">
        </p>
      </fieldset>
      <fieldset class="block-item">
        <legend>Пробег и ТО</legend>
        <p>Пробег, км:
          <input class="input-field" type="text" v-model="updatedCar.kilometrage">
        </p>
        <p>Частота ТО, км:
          <input class="input-field" type="text" v-model="updatedCar.maintenanceFreq">
        </p>
        <p>Следующее ТО через, км:
          <input class="input-field" type="text" v-model="updatedCar.kmBeforeMaint">
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
    <fieldset class="place-fieldset">
      <legend>Местоположение</legend>
      <p class="horizontal-p">
        Широта:
        <input class="input-field" type="text" v-model="updatedCar.latitude">
      </p>
      <p class="horizontal-p">
        Долгота:
        <input class="input-field" type="text" v-model="updatedCar.longitude">
      </p>
    </fieldset>
    <div class="modal-footer">
      <button @click="update" class="update-btn">Обновить</button>
    </div>
  </div>
</div>
</template>

<script>
import {CarService} from "@/services/CarService";

export default {
  name: "UpdateCarModal",
  props:{
    car:Object
  },
  data(){
    return{
      updatedCar: this.car,
      freeDrivers:[],
      errors:[]
    }
  },
  methods:{
    exit(){
      this.$emit("exit");
    },
    update(){
      CarService.updateCar(this.updatedCar).then(result => {
        console.log(result.status);
        if(result.status===200){
          this.$emit('update', result.data);
        }else {
          this.errors = result.data.errors;
        }
      });

    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  width: 50%;
  padding: 5px;
}

.modal-header{
  display: flex;
  padding: 10px;
}

.modal-title{
  width: 95%;
  font-size: 24px;
  font-weight: bold;
}

.exit-btn{
  width: 5%;
  background-color: red;
  border-color: white;
  border-style: solid;
  border-radius: 4px;
  color: white;
}
.exit-btn{
  width: 5%;
  background-color: red;
  border-color: gray;
  border-style: solid;
  border-radius: 4px;
  border-width: 1px;
  color: white;
}

.exit-btn:hover{
  border-color: black;
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

.input-field{
  margin-top: 5px;
  font-size: 16px;
}

.place-fieldset{
  display: flex;
  margin: 5px;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
}

.horizontal-p{
  width: 50%;
}
.modal-footer{
  width: 100%;
  height: auto;
  text-align: center;
}
.update-btn{
  padding: 7px;
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 3px;
  margin:10px;
  font-size: 20px;
}

.update-btn:hover{
  border: 1px solid #000000;
}

.err-record{
  color: red;
}
</style>