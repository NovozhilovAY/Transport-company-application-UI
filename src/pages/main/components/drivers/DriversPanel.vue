<template>
  <div class="table-container">
    <div class="error-div" v-for="error in errors" :key="error">
      <div class="l-side"><p class="error-msg">Error: {{error.message}}</p></div>
      <div class="r-side"><button v-on:click="deleteError(error)" class="delete-error-btn delete-btn">&#10007;</button></div>
    </div>
    <table class="users-table">
      <tr class="table-header"><th>id</th><th>Фамилия</th><th>Имя</th><th>Отчество</th><th>Номер ВУ</th></tr>
      <tr class="row" v-for="driver in drivers" :key="driver.id">
        <td class="table-cell">{{driver.id}}</td>
        <td class="table-cell">{{driver.lastName}}</td>
        <td class="table-cell">{{driver.firstName}}</td>
        <td class="table-cell">{{driver.middleName}}</td>
        <td class="table-cell">{{driver.drivingLicense}}</td>
        <td class="control-cell"><button class="control-btn update-btn" @click="this.driverToUpdate = driver; this.updateDialogOpen = true;"
                                         >&#9998;</button></td>
        <td class="control-cell"><button class="control-btn delete-btn" @click="this.driverToDelete = driver; this.deleteDialogOpen = true;"
                                         >&#10007;</button></td>
      </tr>
    </table>
    <button class="add-btn" @click="this.saveDialogOpen = true">+</button>
  </div>
  <ConfirmDialog v-if="deleteDialogOpen" @yes="deleteDialogYes()" @no="deleteDialogNo()"></ConfirmDialog>
  <UpdateDriverModal v-if="updateDialogOpen" :driverToUpdate="driverToUpdate"
                     @exit="updateModalExit"
                     @update="updateModalUpdate">
  </UpdateDriverModal>

  <SaveDriverModal v-if="saveDialogOpen"
                   @exit="saveModalExit"
                   @save="saveModalSave">
  </SaveDriverModal>
</template>

<script>
import {DriverService} from "@/services/DriverService";
import ConfirmDialog from "@/pages/main/components/cars/modals/ConfirmDialog";
import UpdateDriverModal from "@/pages/main/components/drivers/modals/UpdateDriverModal";
import SaveDriverModal from "@/pages/main/components/drivers/modals/SaveDriverModal";
export default {
  name: "DriversPanel",
  components: {SaveDriverModal, UpdateDriverModal, ConfirmDialog},
  data(){
    return{
      errors:[],
      drivers:[],
      driverToDelete: {},
      driverToUpdate:{},
      deleteDialogOpen: false,
      updateDialogOpen: false,
      saveDialogOpen: false,
      updater:{}
    }
  },
  mounted() {
    this.getAllDrivers();
    this.updater = this.updateData();
  },
  unmounted() {
    clearInterval(this.updater);
  },
  methods:{
    updateData(){
      return setInterval(this.getAllDrivers, 3000);
    },
    getAllDrivers(){
      DriverService.getAllDrivers().then(result=>{
        this.drivers = result.sort((a, b)=>a.id - b.id);
      })
    },
    deleteDialogNo(){
      this.deleteDialogOpen = false;
    },
    deleteDialogYes(){
      this.deleteDriver(this.driverToDelete);
      this.deleteDialogOpen = false;
    },
    deleteDriver(driver){
      DriverService.deleteById(driver.id).then((response)=>{
        if(response.status !== 204){
          this.errors = response.data.errors;
          console.log(response.data.errors);
        }else {
          this.drivers.splice(this.drivers.indexOf(driver),1);
        }
      });
    },
    updateModalExit(){
      this.updateDialogOpen = false;
    },
    updateModalUpdate(updatedDriver){
      this.updateDialogOpen = false;
      this.drivers[this.drivers.map((driver)=>driver.id).indexOf(updatedDriver.id)] = updatedDriver;
    },
    saveModalExit(){
      this.saveDialogOpen = false;
    },
    saveModalSave(savedDriver){
      this.saveDialogOpen = false;
      this.drivers.push(savedDriver);
    },
    deleteError(error){
      this.errors.splice(this.errors.indexOf(error), 1);
    }

  }
}
</script>

<style scoped>

.table-container{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 18px;
  width: 50%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  overflow-y: scroll;
}
.table-container::-webkit-scrollbar{
  width: 0;
}
.users-table{
  width: 100%;
  margin-top: 15px;
  text-align: center;
  border-collapse: collapse;
}

.table-cell{
  border-bottom-style: solid;
  border-bottom-width: 1px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: #c0bfbf;
}

th{
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: black;
}

.control-btn{
  width: 80%;
  height: 100%;
}

.control-cell{
  width: 5%;
}

.add-btn{
  padding-left: 10px;
  padding-right: 10px;
  font-size: 35px;
  margin-top: 10px;
  margin-left: 10px;
  display:block;
  float:none;
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 25px;
}

.add-btn:hover{
  border-color: black;
}

.delete-btn{
  font-size: 16px;
  color: white;
  border-style: solid;
  border-width: 1px;
  border-color: #ff1414;
  background-color: #ff1414;
  border-radius: 3px;
}


.update-btn{
  font-size: 16px;
  color: white;
  border-style: solid;
  border-width: 1px;
  border-color: #4AAE9B;
  background-color: #4AAE9B;
  border-radius: 3px;
}

.update-btn:hover,.delete-btn:hover{
  border-color: black;
}

.error-div{
  display: flex;
  margin-top: 10px;
  color: #ff1414;
  border-style: solid;
  border-color: #ff1414;
  border-radius: 20px;
  border-width: 3px;
}

.delete-error-btn{

  margin-right: 10px;
  height: 50%;
  margin-top: auto;
  margin-bottom: auto;

}

.l-side{
  width: 80%;
}

.r-side{
  width: 20%;
  display: flex;
  justify-content: right;
  vertical-align: center;
}
.error-msg{
  font-weight: bold;
  padding: 5px;
  margin: 10px;
}

</style>