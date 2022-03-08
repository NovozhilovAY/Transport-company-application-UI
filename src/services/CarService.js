import HTTP from "@/utils/HTTP";
import {getHeaders} from "@/utils/AuthHeader";


export const CarService = {
    getAllCars,
    getCarById,
    doMaintenance
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