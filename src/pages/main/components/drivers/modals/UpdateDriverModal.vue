<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <label class="modal-title">Редактирование водителя</label>
        <button @click="exit" class="exit-btn">&#10006;</button>
      </div>
      <ul v-if="this.errors.length !== 0">
        <li class="err-record" v-for:="(error, index) in errors" :key="index">{{error.details}}</li>
      </ul>
      <div class="info-block">
        <fieldset class="block-item">
          <legend>Основная информация</legend>
          <p>Фамилия:
            <input class="input-field" type="text" v-model="driver.lastName">
          </p>
          <p>Имя:
            <input class="input-field" type="text" v-model="driver.firstName">
          </p>
          <p>Отчество:
            <input class="input-field" type="text" v-model="driver.middleName">
          </p>
          <p>Номер ВУ:
            <input class="input-field" type="text" v-model="driver.drivingLicense">
          </p>
        </fieldset>
      </div>
      <div class="modal-footer">
        <button @click="update" class="update-btn">Обновить</button>
      </div>
    </div>
  </div>
</template>

<script>
import {DriverService} from "@/services/DriverService";

export default {
  name: "UpdateDriverModal",
  props:['driverToUpdate'],
  data(){
    return{
      driver: JSON.parse(JSON.stringify(this.driverToUpdate)),
      errors: [],
    }
  },
  methods:{
    exit(){
      this.$emit('exit');
    },
    update(){
      DriverService.update(this.driver).then(response=>{
        if(response.status===200){
          this.$emit('update', response.data);
        }else {
          this.errors = response.data.errors;
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
  font-size: 18px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  width: 40%;
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
  width: 100%;
}

.input-field{
  margin-top: 5px;
  font-size: 16px;
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