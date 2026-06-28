/* ==========================================
   ECONOMY.JS
========================================== */


/* ==========================================
   MAIN FUNCTION
========================================== */

function initEconomy(country, year){

    console.log("===== ECONOMY =====");

    console.log("Country :", country);

    console.log("Year :", year);

    refreshEconomy();

}


/* ==========================================
   ECONOMIC LOSS TREND
========================================== */

function drawEconomicTrend(){

    const data = getEconomy();

    let yearlyData = {};

    data.forEach(item=>{

        const year = item.Year;

        const value = Number(item.Economicloss) || 0;

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

        "economicTrend",

        [

            {

                x:result.map(d=>d.year),

                y:result.map(d=>d.value),

                mode:"lines+markers",

                line:{

                    color:"#43a047",

                    width:3

                },

                marker:{

                    size:7

                },

                name:"Economic Loss"

            }

        ],

        {

            title:"Trend of Economic Loss",

            template:"plotly_white",

            hovermode:"x unified",

            xaxis:{

                title:"Year"

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
   COUNTRY RANKING BY ECONOMIC LOSS
========================================== */

function drawEconomicRanking(){

    const data = getEconomy();

    let countryData = {};

    data.forEach(item=>{

        const country = item.Country;

        const value = Number(item.Economicloss) || 0;

        if(!countryData[country]){

            countryData[country] = 0;

        }

        countryData[country] += value;

    });


    let result = Object.keys(countryData).map(country=>{

        return{

            country:country,

            value:countryData[country]

        };

    });


    result.sort((a,b)=>b.value-a.value);

    result = result.slice(0,10);


    Plotly.newPlot(

        "economicRank",

        [

            {

                type:"bar",

                orientation:"h",

                x:result.map(d=>d.value).reverse(),

                y:result.map(d=>d.country).reverse(),

                marker:{

                    color:"#66bb6a"

                }

            }

        ],

        {

            title:"Top 10 Countries by Economic Loss",

            template:"plotly_white",

            xaxis:{

                title:"Economic Loss"

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
   ECONOMIC LOSS TREEMAP
========================================== */

function drawEconomicTreemap(){

    const data = getEconomy();

    let countryData = {};

    data.forEach(item=>{

        const country = item.Country;

        const value = Number(item.Economicloss) || 0;

        if(!countryData[country]){

            countryData[country] = 0;

        }

        countryData[country] += value;

    });


    let labels = [];

    let values = [];


    Object.keys(countryData).forEach(country=>{

        labels.push(country);

        values.push(countryData[country]);

    });


    Plotly.newPlot(

        "economicTree",

        [

            {

                type:"treemap",

                labels:labels,

                parents:labels.map(()=>""),

                values:values,

                textinfo:"label+value",

                hovertemplate:

                "<b>%{label}</b><br>"+

                "Economic Loss: %{value}<extra></extra>"

            }

        ],

        {

            title:"Economic Loss Treemap",

            template:"plotly_white"

        },

        {

            responsive:true

        }

    );

}



/* ==========================================
   UPDATE ECONOMIC INSIGHT
========================================== */

function updateEconomicInsight(){

    const data = getEconomy();

    let countryData = {};

    data.forEach(item=>{

        const country = item.Country;

        const value = Number(item.Economicloss) || 0;

        if(!countryData[country]){

            countryData[country] = 0;

        }

        countryData[country] += value;

    });


    let ranking = Object.keys(countryData).map(country=>{

        return{

            country:country,

            value:countryData[country]

        };

    });


    ranking.sort((a,b)=>b.value-a.value);


    if(ranking.length === 0){

        document.querySelector(

            "#economic .insight-box p"

        ).innerHTML =

        "No data available.";

        return;

    }


    const top = ranking[0];


    document.querySelector(

        "#economic .insight-box p"

    ).innerHTML = `

<b>${top.country}</b> recorded the highest
economic loss based on the selected data,
with an estimated total of
<b>${formatNumber(top.value)}</b>.

This finding highlights that climate change
not only affects ecosystems and communities
but also creates substantial economic burdens
for countries that are highly vulnerable
to climate-related disasters.

`;

}

/* ==========================================
   REFRESH
========================================== */

function refreshEconomy(){

    drawEconomicTrend();

    drawEconomicRanking();

    drawEconomicTreemap();

    updateEconomicInsight();

}



/* ==========================================
   WINDOW RESIZE
========================================== */

window.addEventListener("resize",function(){

    drawEconomicTrend();

    drawEconomicRanking();

    drawEconomicTreemap();

});



/* ==========================================
   EXPORT
========================================== */

window.initEconomy = initEconomy;