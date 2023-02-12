import HTTP from "@/utils/HTTP";
import {getHeaders} from "@/utils/AuthHeader";

export const CalendarService = {
    getMaintDates
}

async function getMaintDates(id) {
    return await HTTP.get("/api/calendar/next-maint-dates/"+id, getHeaders())
        .then((response)=>{
            return response.data;
        }).catch((error)=>{
        console.log(error.response);
        return {status: error.response.status};
    });
}