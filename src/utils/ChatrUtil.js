export function getChatrConfiguration(x, y){
    let config = {options:{}, series:[]};
    config.options = {
        chart:{
            toolbar:{
                show:false
            }
        },
        tooltip:{
            enabled:false
        },
        xaxis: {
            categories: y,
        },
    };
    config.series = [
        {
            name: "series-1",
            data: x,
        }
    ];
    console.log("getChart func");
    return config;
}