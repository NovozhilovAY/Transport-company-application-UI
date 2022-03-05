import HTTP from "@/utils/HTTP";
import {getHeaders} from "@/utils/AuthHeader";


export const CarService = {
    getAllCars
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