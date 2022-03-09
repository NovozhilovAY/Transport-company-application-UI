import HTTP from "@/utils/HTTP";
import {getHeaders} from "@/utils/AuthHeader";


export const CarService = {
    getAllCars,
    getCarById,
    doMaintenance,
    deleteCarById,
    updateCar
}

async function getAllCars(){
    let result = {};
    result = await HTTP.get("/api/cars", getHeaders()).then(
    (response)=>{
        return {status: response.status, cars: response.data};
    }).catch((error)=>{
        console.log(error.response);
        return {status: error.response.status};
    })
    return result;
}

async function getCarById(id){
    let result = {};
    result = await HTTP.get("/api/cars/"+id, getHeaders()).then(
        (response)=>{
            return {status: response.status, car: response.data};
        }).catch((error)=>{
        console.log(error.response);
        return {status: error.response.status};
    })
    return result;
}

async function doMaintenance(id){
    let result = await HTTP.patch("api/cars/maintenance/"+id,{} ,getHeaders())
        .then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.response);
        })
    return result;
}

async function deleteCarById(id){
    let result = await HTTP.delete("api/cars/"+id, getHeaders())
        .then(response =>{
            return response.status;
        }).catch(error=>{
            console.log(error.response);
        });
    return result;
}

async function updateCar(updatedCar){
    console.log(updatedCar);
    let result = await HTTP.put("/api/cars", updatedCar,getHeaders())
        .then(response => {
                console.log(response);
                return response;
            }
        ).catch(error=>{
            console.log(error.response);
            return error.response;
        });
    return result;
}