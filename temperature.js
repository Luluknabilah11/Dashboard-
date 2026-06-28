/* ==========================================
   TEMPERATURE.JS
========================================== */


/* ==========================================
   MAIN FUNCTION
========================================== */

function initTemperature(country, year){

    console.log("===== TEMPERATURE =====");

    console.log("Country :", country);

    console.log("Year :", year);

    refreshTemperature();

}


/* ==========================================
   REFRESH
========================================== */

function refreshTemperature(){

    drawLandTemperature();

    drawSeaTemperature();

    drawTemperatureScatter();

    updateTemperatureInsight();

}


/* ==========================================
   LAND TEMPERATURE CHART
========================================== */

function drawLandTemperature(){

    const data = getLandTemp();

    let yearlyData = {};

    data.forEach(item=>{

        const year = item.Year;

        const value = Number(item.LandTemp) || 0;

        if(!yearlyData[year]){

            yearlyData[year] = 0;

        }

        yearlyData[year] += value;

    });


    let result = Object.keys(yearlyData).map(year=>{

        return{

            year:Number(year),

            value:yearlyData[year]

        };

    });


    result.sort((a,b)=>a.year-b.year);


    Plotly.newPlot(

        "landTempChart",

        [

            {

                x:result.map(d=>d.year),

                y:result.map(d=>d.value),

                mode:"lines+markers",

                name:"Land Temperature",

                line:{

                    color:"#ef5350",

                    width:3

                },

                marker:{

                    size:7

                }

            }

        ],

        {

            title:"Land Surface Temperature Anomaly Trend",

            template:"plotly_white",

            hovermode:"x unified",

            xaxis:{

                title:"Year"

            },

            yaxis:{

                title:"Temperature Anomaly (°C)"

            }

        },

        {

            responsive:true

        }

    );

}


/* ==========================================
   SEA TEMPERATURE CHART
========================================== */

function drawSeaTemperature(){

    const data = getSeaTemp();

    let yearlyData = {};

    data.forEach(item=>{

        const year = item.Year;

        const value = Number(item.SeaTemp) || 0;

        if(!yearlyData[year]){

            yearlyData[year] = 0;

        }

        yearlyData[year] += value;

    });


    let result = Object.keys(yearlyData).map(year=>{

        return{

            year:Number(year),

            value:yearlyData[year]

        };

    });


    result.sort((a,b)=>a.year-b.year);


    Plotly.newPlot(

        "seaTempChart",

        [

            {

                x:result.map(d=>d.year),

                y:result.map(d=>d.value),

                mode:"lines+markers",

                name:"Sea Temperature",

                line:{

                    color:"#1e88e5",

                    width:3

                },

                marker:{

                    size:7

                }

            }

        ],

        {

            title:"Sea Surface Temperature Anomaly Trend",

            template:"plotly_white",

            hovermode:"x unified",

            xaxis:{

                title:"Year"

            },

            yaxis:{

                title:"Temperature Anomaly (°C)"

            }

        },

        {

            responsive:true

        }

    );

}

/* ==========================================
   EMISSION vs TEMPERATURE SCATTER PLOT
========================================== */

function drawTemperatureScatter(){

    const emission = getEmission();

    const land = getLandTemp();

    let scatterData = [];

    emission.forEach(emissionItem=>{

        const match = land.find(tempItem=>

            tempItem.Country===emissionItem.Country &&
            Number(tempItem.Year)===Number(emissionItem.Year)

        );

        if(match){

            scatterData.push({

                x:Number(emissionItem.Emission),

                y:Number(match.LandTemp),

                country:emissionItem.Country,

                year:emissionItem.Year

            });

        }

    });


    Plotly.newPlot(

        "tempScatter",

        [

            {

                x:scatterData.map(d=>d.x),

                y:scatterData.map(d=>d.y),

                mode:"markers",

                type:"scatter",

                marker:{

                    size:10,

                    color:"#ff7043",

                    opacity:0.75

                },

                text:scatterData.map(d=>

                    d.country + " (" + d.year + ")"

                ),

                hovertemplate:

                "<b>%{text}</b><br>"+

                "Carbon Emissions: %{x}<br>"+

                "Land Temperature: %{y}<extra></extra>"

            }

        ],

        {

            title:"Relationship Between Carbon Emissions and Land Temperature",

            template:"plotly_white",

            xaxis:{

                title:"Carbon Emissions"

            },

            yaxis:{

                title:"Land Temperature Anomaly (°C)"

            }

        },

        {

            responsive:true

        }

    );

}



/* ==========================================
   UPDATE INSIGHT
========================================== */

function updateTemperatureInsight(){

    const land = getLandTemp();

    const sea = getSeaTemp();

    const avgLand = getAverage(land,"LandTemp");

    const avgSea = getAverage(sea,"SeaTemp");

    let insight = "";


    if(avgLand > avgSea){

        insight =

        "<b>Key Insight:</b><br><br>"+

        "The average land surface temperature anomaly is higher than the sea surface temperature anomaly. " +

        "This indicates that land areas are experiencing faster warming than the surrounding oceans.";

    }

    else if(avgSea > avgLand){

        insight =

        "<b>Key Insight:</b><br><br>"+

        "The average sea surface temperature anomaly is higher than the land surface temperature anomaly. " +

        "Rising ocean temperatures may significantly affect marine ecosystems and contribute to more extreme weather events.";

    }

    else{

        insight =

        "<b>Key Insight:</b><br><br>"+

        "The average land and sea surface temperature anomalies are relatively similar based on the selected filters.";

    }


    document.querySelector(

        "#temperature .insight-box p"

    ).innerHTML = insight;

}

/* ==========================================
   TEMPERATURE STATISTICS
========================================== */

function getTemperatureStatistics(){

    const land = getLandTemp();

    const sea = getSeaTemp();


    const avgLand = getAverage(land,"LandTemp");

    const avgSea = getAverage(sea,"SeaTemp");


    const maxLand = Math.max(

        ...land.map(d => Number(d.LandTemp) || 0)

    );

    const minLand = Math.min(

        ...land.map(d => Number(d.LandTemp) || 0)

    );


    const maxSea = Math.max(

        ...sea.map(d => Number(d.SeaTemp) || 0)

    );

    const minSea = Math.min(

        ...sea.map(d => Number(d.SeaTemp) || 0)

    );


    console.table({

        "Average Land Temperature": avgLand,

        "Average Sea Temperature": avgSea,

        "Maximum Land Temperature": maxLand,

        "Minimum Land Temperature": minLand,

        "Maximum Sea Temperature": maxSea,

        "Minimum Sea Temperature": minSea

    });

}


/* ==========================================
   WINDOW RESIZE
========================================== */

window.addEventListener("resize",function(){

    drawLandTemperature();

    drawSeaTemperature();

    drawTemperatureScatter();

});


/* ==========================================
   EXPORT
========================================== */

window.initTemperature = initTemperature;