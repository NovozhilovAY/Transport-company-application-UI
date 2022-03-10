import HTTP from "@/utils/HTTP";
import {getHeaders} from "@/utils/AuthHeader";

export const DriverService = {
    getFreeDrivers
}

async function getFreeDrivers(){
    let result = await HTTP.get("/api/drivers/free", getHeaders()).then(response => {
        return response;
    }).catch(error=>{
        console.log(error.response)
    });
    return result;
}