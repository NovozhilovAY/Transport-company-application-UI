import HTTP from "@/utils/HTTP";
import {getHeaders} from "@/utils/AuthHeader";
import moment from 'moment'
export const HistoryService = {
    getWeeklyStatistics
}

async function getWeeklyStatistics(carId){
    let result = {week:[], kilometrage:[]};
    result.week = getWeek().reverse();
    for (let i = 0; i < result.week.length; i++) {
        let km = await getDayKilometrage(result.week[i], carId).then(res=>{return res});
        result.kilometrage.push(km);
    }
    result.week = getDDMMFormat(result.week);
    console.log("HISTORY SERVICE: " + result);
    console.log(result);
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

async function getDayKilometrage(date ,carId){
    let config = getHeaders();
    config.params = {carId:carId, date: date};
    let kilometrage = await HTTP.get("/api/history/date",config).then(
        (res)=>{
            return res.data;
        });
    return kilometrage;
}