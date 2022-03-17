import HTTP from "@/utils/HTTP";
import {getHeaders} from "@/utils/AuthHeader";
import moment from 'moment'
import qs from "qs";
export const HistoryService = {
    getWeeklyStatistics
}

async function getWeeklyStatistics(carId){
    let result = {week:[], kilometrage:[]};
    result.week = getWeek().reverse();
    let config = getHeaders();
    config.params = {id: carId, dates: result.week};
    config.paramsSerializer = p => {
        return qs.stringify(p, {arrayFormat: "repeat"})
    }
    result.kilometrage = await HTTP.get("/api/history/date", config).then(result=>{return result.data});
    console.log(result.kilometrage);
    result.week = getDDMMFormat(result.week);
    result.kilometrage = result.kilometrage.map(km => Math.floor(km));
    return result;
}


function getWeek(){
    let week = [];
    for (let i = 1; i <= 7; i++) {
        week.push(moment().subtract(i,"days").format("YYYY-MM-DD"));
    }
    return week;
}

function getDDMMFormat(week){
    return week.map(day => moment(day).format("DD.MM"));
}

