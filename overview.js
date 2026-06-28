/* ==========================================
   OVERVIEW.JS
   Pacific Climate Change Dashboard
========================================== */


/* ==========================================
   MAIN FUNCTION
========================================== */

function initOverview(country, year){

    console.log("Overview updated");

    refreshOverview();

}


/* ==========================================
   KPI CARDS
========================================== */

function updateKPICards(){

    // Get filtered data

    const emission = getEmission();

    const land = getLandTemp();

    const sea = getSeaTemp();

    const disaster = getDisaster();

    const economy = getEconomy();


    // =============================
    // Calculate KPI Values
    // =============================

    const totalEmission =
        getTotal(emission,"Emission");

    const avgLandTemp =
        getAverage(land,"LandTemp");

    const avgSeaTemp =
        getAverage(sea,"SeaTemp");

    const totalAffected =
        getTotal(disaster,"DisasterAffected");

    const totalLoss =
        getTotal(economy,"Economicloss");


    // =============================
    // Update KPI Cards
    // =============================

    document.getElementById("totalEmission")
        .innerHTML =
        formatDecimal(totalEmission);

    document.getElementById("avgTemp")
        .innerHTML =
        formatDecimal(avgLandTemp);

    document.getElementById("totalAffected")
        .innerHTML =
        formatNumber(totalAffected);

    document.getElementById("economicLoss")
        .innerHTML =
        formatNumber(totalLoss);


    console.log("KPI cards updated successfully");

}


/* ==========================================
   OVERVIEW CHART
========================================== */

function drawOverviewChart(){

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


    let result = Object.keys(countryData).map(country=>{

        return{

            country: country,

            emission: countryData[country]

        };

    });


    result.sort((a,b)=>b.emission-a.emission);

    result = result.slice(0,10);


    Plotly.newPlot(

        "overviewChart",

        [

            {

                type:"bar",

                x:result.map(d=>d.country),

                y:result.map(d=>d.emission),

                marker:{

                    color:"#1976d2"

                }

            }

        ],

        {

            title:"Top 10 Countries by Carbon Emissions",

            xaxis:{

                title:"Country"

            },

            yaxis:{

                title:"Total Carbon Emissions"

            },

            margin:{

                t:60

            },

            template:"plotly_white"

        },

        {

            responsive:true

        }

    );

}


/* ==========================================
   OVERVIEW INSIGHT
========================================== */

function updateOverviewInsight(){

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


    let topCountry = "No Data";

    let max = 0;

    Object.keys(countryData).forEach(country=>{

        if(countryData[country] > max){

            max = countryData[country];

            topCountry = country;

        }

    });


    const insight = `

The country with the highest total carbon emissions is
<b>${topCountry}</b>.

The visualization indicates that carbon emissions are
primarily concentrated in a small number of countries,
suggesting that these countries contribute
significantly to climate change across
the Pacific region.

`;


    document.querySelector(

        "#overview .insight-box p"

    ).innerHTML = insight;

}


/* ==========================================
   REFRESH OVERVIEW
========================================== */

function refreshOverview(){

    updateKPICards();

    drawOverviewChart();

    updateOverviewInsight();

}


/* ==========================================
   WINDOW RESIZE
========================================== */

window.addEventListener("resize",function(){

    drawOverviewChart();

});


/* ==========================================
   DEBUG
========================================== */

function debugOverview(){

    console.log("===== OVERVIEW =====");

    console.log("Emission :", getEmission());

    console.log("Land Temperature :", getLandTemp());

    console.log("Sea Temperature :", getSeaTemp());

    console.log("Disaster :", getDisaster());

    console.log("Economic Loss :", getEconomy());

}

window.initEmission = initEmission;