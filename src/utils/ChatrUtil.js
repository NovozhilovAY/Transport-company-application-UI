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
            title:{
                text: "Дата",
                style: {
                    fontSize: '14px',
                    fontWeight: 200
                },
            }

        },
        yaxis:{
            title:{
                text: "Пробег, км",
                style: {
                    fontSize: '14px',
                    fontWeight: 200
                },
            }
        }
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