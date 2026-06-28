/* ==========================================
   IMPACT.JS
========================================== */


/* ==========================================
   MAIN FUNCTION
========================================== */

function initImpact(country, year){

    console.log("===== IMPACT =====");

    console.log("Country :", country);

    console.log("Year :", year);

    refreshImpact();

}


/* ==========================================
   BAR CHART OF MOST AFFECTED COUNTRIES
========================================== */

function drawImpactBar(){

    const data = getDisaster();

    let countryData = {};

    data.forEach(item=>{

        const country = item.Country;

        const value = Number(item.DisasterAffected) || 0;

        if(!countryData[country]){

            countryData[country] = 0;

        }

        countryData[country] += value;

    });


    let result = Object.keys(countryData).map(country=>{

        return{

            country:country,

            affected:countryData[country]

        };

    });


    result.sort((a,b)=>b.affected-a.affected);

    result = result.slice(0,10);


    Plotly.newPlot(

        "affectedBar",

        [

            {

                type:"bar",

                orientation:"h",

                x:result.map(d=>d.affected).reverse(),

                y:result.map(d=>d.country).reverse(),

                marker:{

                    color:"#fb8c00"

                }

            }

        ],

        {

            title:"Top 10 Countries with the Highest Affected Population",

            template:"plotly_white",

            xaxis:{

                title:"Affected Population"

            },

            yaxis:{

                title:"Country"

            },

            margin:{

                l:120,

                t:60

            }

        },

        {

            responsive:true

        }

    );

}



/* ==========================================
   AFFECTED POPULATION TREND
========================================== */

function drawImpactTrend(){

    const data = getDisaster();

    let yearlyData = {};

    data.forEach(item=>{

        const year = item.Year;

        const value = Number(item.DisasterAffected) || 0;

        if(!yearlyData[year]){

            yearlyData[year] = 0;

        }

        yearlyData[year] += value;

    });


    let result = Object.keys(yearlyData).map(year=>{

        return{

            year:Number(year),

            affected:yearlyData[year]

        };

    });


    result.sort((a,b)=>a.year-b.year);


    Plotly.newPlot(

        "affectedTrend",

        [

            {

                x:result.map(d=>d.year),

                y:result.map(d=>d.affected),

                mode:"lines+markers",

                line:{

                    color:"#ef6c00",

                    width:3

                },

                marker:{

                    size:7

                },

                name:"Affected Population"

            }

        ],

        {

            title:"Trend of Disaster-Affected Population",

            template:"plotly_white",

            hovermode:"x unified",

            xaxis:{

                title:"Year"

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
   UPDATE IMPACT INSIGHT
========================================== */

function updateImpactInsight(){

    const data = getDisaster();

    let countryData = {};

    data.forEach(item=>{

        const country = item.Country;

        const value = Number(item.DisasterAffected) || 0;

        if(!countryData[country]){

            countryData[country] = 0;

        }

        countryData[country] += value;

    });


    let ranking = Object.keys(countryData).map(country=>{

        return{

            country: country,

            affected: countryData[country]

        };

    });


    ranking.sort((a,b)=>b.affected-a.affected);


    if(ranking.length === 0){

        document.querySelector(

            "#impact .insight-box p"

        ).innerHTML =

        "No data available.";

        return;

    }


    const top = ranking[0];


    document.querySelector(

        "#impact .insight-box p"

    ).innerHTML = `

<b>${top.country}</b> recorded the highest number of people
affected by climate-related disasters
based on the selected filters,
with approximately
<b>${formatNumber(top.affected)}</b> people impacted.

This finding highlights the significant
social consequences of climate change,
particularly in countries that are
highly vulnerable to natural disasters.

`;

}

/* ==========================================
   IMPACT STATISTICS
========================================== */

function getImpactStatistics(){

    const data = getDisaster();

    const values = data.map(d =>

        Number(d.DisasterAffected) || 0

    );


    console.table({

        "Total Affected Population": values.reduce((a,b)=>a+b,0),

        "Average Affected Population": getAverage(data,"DisasterAffected"),

        "Maximum Affected Population": Math.max(...values),

        "Minimum Affected Population": Math.min(...values)

    });

}



/* ==========================================
   REFRESH
========================================== */

function refreshImpact(){

    drawImpactBar();

    drawImpactTrend();

    updateImpactInsight();

}



/* ==========================================
   WINDOW RESIZE
========================================== */

window.addEventListener("resize",function(){

    drawImpactBar();

    drawImpactTrend();

});



/* ==========================================
   EXPORT
========================================== */

window.initImpact = initImpact;