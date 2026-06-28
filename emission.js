/* ==========================================
   EMISSION.JS
========================================== */


/* ==========================================
   MAIN FUNCTION
========================================== */

function initEmission(country, year){

    console.log("===== EMISSION =====");

    console.log("Country :", country);

    console.log("Year :", year);

    refreshEmission();

}


/* ==========================================
   CARBON EMISSION TREND
========================================== */

function drawEmissionTrend(){

    const emission = getEmission();

    // If the selected year is "All",
    // display the annual emission trend.

    let yearlyData = {};

    emission.forEach(item=>{

        const year = item.Year;

        const value = Number(item.Emission) || 0;

        if(!yearlyData[year]){

            yearlyData[year] = 0;

        }

        yearlyData[year] += value;

    });


    // Convert Object to Array

    let result = Object.keys(yearlyData).map(year=>{

        return{

            year:Number(year),

            emission:yearlyData[year]

        };

    });


    // Sort by year

    result.sort((a,b)=>a.year-b.year);


    Plotly.newPlot(

        "emissionTrend",

        [

            {

                x:result.map(d=>d.year),

                y:result.map(d=>d.emission),

                mode:"lines+markers",

                line:{

                    color:"#1976d2",

                    width:3

                },

                marker:{

                    size:7

                },

                name:"Carbon Emissions"

            }

        ],

        {

            title:"Annual Greenhouse Gas Emission Trend",

            template:"plotly_white",

            hovermode:"x unified",

            xaxis:{

                title:"Year"

            },

            yaxis:{

                title:"Total Carbon Emissions"

            },

            margin:{

                t:60

            }

        },

        {

            responsive:true

        }

    );

}

/* ==========================================
   COUNTRY RANKING BASED ON EMISSIONS
========================================== */

function drawEmissionRanking(){

    const emission = getEmission();

    console.log(emission);
    console.log("Number of records:", emission.length);
    console.log("First data columns:", Object.keys(emission[0] || {}));

    let countryData = {};

    emission.forEach(item=>{

        const country = item.Country;
        const value = Number(item.Emission) || 0;

        if(!countryData[country]){

            countryData[country] = 0;

        }

        countryData[country] += value;

    });


    let result = Object.keys(countryData).map(country=>{

        return{

            country: country,

            emission: countryData[country]

        };

    });


    // Sort in descending order

    result.sort((a,b)=>b.emission-a.emission);


    // Display Top 10 countries

    result = result.slice(0,10);

    console.table(result);


    Plotly.newPlot(

        "emissionRank",

        [

            {

                type:"bar",

                orientation:"h",

                x:result.map(d=>d.emission).reverse(),

                y:result.map(d=>d.country).reverse(),

                marker:{

                    color:"#42a5f5"

                }

            }

        ],

        {

            title:"Top 10 Countries by Carbon Emissions",

            template:"plotly_white",

            xaxis:{

                title:"Total Carbon Emissions"

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
   UPDATE INSIGHT
========================================== */

function updateEmissionInsight(){

    const emission = getEmission();

    let countryData = {};

    emission.forEach(item=>{

        const country = item.Country;

        const value = Number(item.Emission) || 0;

        if(!countryData[country]){

            countryData[country] = 0;

        }

        countryData[country] += value;

    });


    let ranking = Object.keys(countryData).map(country=>{

        return{

            country:country,

            emission:countryData[country]

        };

    });


    ranking.sort((a,b)=>b.emission-a.emission);


    if(ranking.length === 0){

        document.querySelector(

            "#emission .insight-box p"

        ).innerHTML =

        "No data available.";

        return;

    }


    const top = ranking[0];


    document.querySelector(

        "#emission .insight-box p"

    ).innerHTML = `

<b>${top.country}</b> recorded the highest total greenhouse gas emissions
based on the selected filters,
with an estimated value of
<b>${formatDecimal(top.emission)}</b>.

Countries with consistently high emission levels
play a significant role in accelerating climate change
and therefore require greater attention
in environmental policy and sustainability efforts.

`;

}

/* ==========================================
   REFRESH EMISSION
========================================== */

function refreshEmission(){

    drawEmissionTrend();

    drawEmissionRanking();

    updateEmissionInsight();

    drawEmissionStatistics();

}


/* ==========================================
   EMISSION STATISTICS
========================================== */

function drawEmissionStatistics(){

    const emission = getEmission();

    console.log("Number of emission records:", emission.length);

    console.table(emission.slice(0,5));


    if(emission.length === 0){

        document.getElementById("emissionStats").innerHTML = `

            <div style="
                padding:40px;
                text-align:center;
                color:#666;
                font-size:18px;">

                No data available.

            </div>

        `;

        return;

    }


    const values = emission.map(item => Number(item.Emission) || 0);

    const total = values.reduce((a,b)=>a+b,0);

    const average = total / values.length;

    const max = Math.max(...values);

    const min = Math.min(...values);


    Plotly.newPlot(

        "emissionStats",

        [

            {

                type:"indicator",

                mode:"number",

                value:total,

                title:{

                    text:"Total Emissions"

                },

                domain:{

                    row:0,

                    column:0

                }

            },

            {

                type:"indicator",

                mode:"number",

                value:average,

                number:{

                    valueformat:".2f"

                },

                title:{

                    text:"Average Emissions"

                },

                domain:{

                    row:0,

                    column:1

                }

            },

            {

                type:"indicator",

                mode:"number",

                value:max,

                title:{

                    text:"Maximum Emissions"

                },

                domain:{

                    row:1,

                    column:0

                }

            },

            {

                type:"indicator",

                mode:"number",

                value:min,

                title:{

                    text:"Minimum Emissions"

                },

                domain:{

                    row:1,

                    column:1

                }

            }

        ],

        {

            title:"Carbon Emission Statistics Summary",

            grid:{

                rows:2,

                columns:2,

                pattern:"independent"

            },

            template:"plotly_white"

        },

        {

            responsive:true

        }

    );

}


/* ==========================================
   EXPORT
========================================== */

window.initEmission = initEmission;