/* ==========================================
   RELATION.JS
========================================== */


/* ==========================================
   MAIN FUNCTION
========================================== */

function initRelation(country, year){

    console.log("===== RELATION =====");

    console.log("Country :", country);

    console.log("Year :", year);

    refreshRelation();

}


/* ==========================================
   REFRESH
========================================== */

function refreshRelation(){

    drawEmissionTemperature();

    drawTemperatureDisaster();

    drawTemperatureEconomy();

    updateRelationInsight();

}



/* ==========================================
   SCATTER PLOT
   CARBON EMISSIONS vs LAND TEMPERATURE
========================================== */

function drawEmissionTemperature(){

    const emission = getEmission();

    const land = getLandTemp();

    let x = [];

    let y = [];

    let label = [];

    emission.forEach(item=>{

        const temp = land.find(t=>

            t.Country === item.Country &&
            Number(t.Year) === Number(item.Year)

        );

        if(temp){

            x.push(Number(item.Emission));

            y.push(Number(temp.LandTemp));

            label.push(

                item.Country + " (" + item.Year + ")"

            );

        }

    });


    Plotly.newPlot(

        "scatterEmissionTemp",

        [

            {

                x:x,

                y:y,

                mode:"markers",

                type:"scatter",

                text:label,

                marker:{

                    size:10,

                    color:"#42a5f5",

                    opacity:0.8

                },

                hovertemplate:

                "<b>%{text}</b><br>"+

                "Carbon Emissions: %{x}<br>"+

                "Land Temperature: %{y}<extra></extra>"

            }

        ],

        {

            title:"Carbon Emissions vs Land Temperature",

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
   SCATTER PLOT
   LAND TEMPERATURE vs AFFECTED POPULATION
========================================== */

function drawTemperatureDisaster(){

    const land = getLandTemp();

    const disaster = getDisaster();

    let x = [];

    let y = [];

    let label = [];

    land.forEach(item=>{

        const victim = disaster.find(d=>

            d.Country === item.Country &&
            Number(d.Year) === Number(item.Year)

        );

        if(victim){

            x.push(Number(item.LandTemp));

            y.push(Number(victim.DisasterAffected));

            label.push(

                item.Country + " (" + item.Year + ")"

            );

        }

    });


    Plotly.newPlot(

        "scatterTempVictim",

        [

            {

                x:x,

                y:y,

                mode:"markers",

                type:"scatter",

                text:label,

                marker:{

                    size:10,

                    color:"#fb8c00",

                    opacity:0.75

                },

                hovertemplate:

                "<b>%{text}</b><br>"+

                "Land Temperature: %{x}<br>"+

                "Affected Population: %{y}<extra></extra>"

            }

        ],

        {

            title:"Land Temperature vs Affected Population",

            template:"plotly_white",

            xaxis:{

                title:"Land Temperature Anomaly (°C)"

            },

            yaxis:{

                title:"Affected Population"

            }

        },

        {

            responsive:true

        }

    );

}

/* ==========================================
   SCATTER PLOT
   LAND TEMPERATURE vs ECONOMIC LOSS
========================================== */

function drawTemperatureEconomy(){

    const land = getLandTemp();

    const economy = getEconomy();

    let x = [];

    let y = [];

    let label = [];

    land.forEach(item=>{

        const eco = economy.find(e=>

            e.Country === item.Country &&
            Number(e.Year) === Number(item.Year)

        );

        if(eco){

            x.push(Number(item.LandTemp));

            y.push(Number(eco.Economicloss));

            label.push(

                item.Country + " (" + item.Year + ")"

            );

        }

    });


    Plotly.newPlot(

        "scatterTempEconomic",

        [

            {

                x:x,

                y:y,

                mode:"markers",

                type:"scatter",

                text:label,

                marker:{

                    size:10,

                    color:"#43a047",

                    opacity:0.75

                },

                hovertemplate:

                "<b>%{text}</b><br>"+

                "Land Temperature: %{x}<br>"+

                "Economic Loss: %{y}<extra></extra>"

            }

        ],

        {

            title:"Land Temperature vs Economic Loss",

            template:"plotly_white",

            xaxis:{

                title:"Land Temperature Anomaly (°C)"

            },

            yaxis:{

                title:"Economic Loss"

            }

        },

        {

            responsive:true

        }

    );

}



/* ==========================================
   UPDATE RELATION INSIGHT
========================================== */

function updateRelationInsight(){

    const emission = getEmission();

    const land = getLandTemp();


    let totalEmission = 0;

    let totalTemp = 0;


    emission.forEach(item=>{

        totalEmission += Number(item.Emission) || 0;

    });


    land.forEach(item=>{

        totalTemp += Number(item.LandTemp) || 0;

    });


    const avgEmission = totalEmission / emission.length;

    const avgTemp = totalTemp / land.length;

    let insight = "";


    if(avgEmission > 0 && avgTemp > 0){

        insight = `

Based on the selected data,
higher carbon emissions are accompanied
by increasing temperature anomalies.

The scatter plots indicate a positive relationship
between carbon emissions, temperature change,
disaster impacts, and economic losses,
suggesting that these variables are closely connected
within the context of climate change.

`;

    }

    else{

        insight =

        "Insufficient data available for analysis.";

    }


    document.querySelector(

        "#relation .insight-box p"

    ).innerHTML = insight;

}

/* ==========================================
   DEBUG
========================================== */

function debugRelation(){

    console.log("===== RELATION =====");

    console.log("Carbon Emissions :", getEmission());

    console.log("Land Temperature :", getLandTemp());

    console.log("Disaster Impact :", getDisaster());

    console.log("Economic Loss :", getEconomy());

}



/* ==========================================
   WINDOW RESIZE
========================================== */

window.addEventListener("resize",function(){

    drawEmissionTemperature();

    drawTemperatureDisaster();

    drawTemperatureEconomy();

});



/* ==========================================
   EXPORT
========================================== */

window.initRelation = initRelation;