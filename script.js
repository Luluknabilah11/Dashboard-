/* ============================================
   PACIFIC CLIMATE CHANGE DASHBOARD
   script.js
============================================ */


/* ============================================
   GLOBAL DATA
============================================ */

window.dashboardData = {

    emission: [],

    landTemp: [],

    seaTemp: [],

    disaster: [],

    economy: []

};


/* ============================================
   LOADED DATA COUNTER
============================================ */

let loadedFile = 0;


/* ============================================
   TOTAL CSV FILES
============================================ */

const totalFile = 5;


/* ============================================
   DATASET PATHS
============================================ */

const DATA_PATH = {

    emission:
    "data/EMISI GAS RUMAH KACA PER KAPITA.csv",

    land:
    "data/ANOMALI SUHU PERMUKAAN RATA-RATA.csv",

    sea:
    "data/ANOMALI SUHU PERMUKAAN LAUTRATA-RATA.csv",

    disaster:
    "data/JUMLAH ORANG TERDAMPAK.csv",

    economy:
    "data/Kerugian ekonomi langsung akibat bencana.csv"

};


/* ============================================
   WHEN PAGE IS LOADED
============================================ */

document.addEventListener("DOMContentLoaded",()=>{

    loadAllData();

});


/* ============================================
   LOAD ALL DATASETS
============================================ */

function loadAllData(){

    loadCSV(DATA_PATH.emission,"emission");

    loadCSV(DATA_PATH.land,"landTemp");

    loadCSV(DATA_PATH.sea,"seaTemp");

    loadCSV(DATA_PATH.disaster,"disaster");

    loadCSV(DATA_PATH.economy,"economy");

}


/* ============================================
   LOAD SINGLE CSV
============================================ */

function loadCSV(path,key){

    Papa.parse(path,{

        download:true,

        header:true,

        delimiter:";",

        dynamicTyping:true,

        skipEmptyLines:true,

        complete:function(result){

            window.dashboardData[key] = result.data;

            loadedFile++;

            console.log(key + " loaded successfully");

            console.log(result.data);

            if(loadedFile === totalFile){

                console.log("ALL DATASETS LOADED SUCCESSFULLY");

                initializeDashboard();

            }

        },

        error:function(error){

            console.error(error);

        }

    });

}

/* ============================================
   INITIALIZE DASHBOARD
============================================ */

let selectedCountry = "All";

let selectedYear = "All";

function initializeDashboard(){

    console.log("Dashboard initialized successfully");

    createCountryFilter();

    createYearFilter();

    addFilterListener();

    refreshDashboard();

}


/* ============================================
   CREATE COUNTRY DROPDOWN
============================================ */

function createCountryFilter(){

    const select = document.getElementById("countrySelect");

    // Get all countries from the emission dataset

    let countryList = window.dashboardData.emission

        .map(item => item.Country)

        .filter(country => country);


    // Remove duplicate values

    countryList = [...new Set(countryList)];


    // Sort alphabetically

    countryList.sort();


    countryList.forEach(country=>{

        const option = document.createElement("option");

        option.value = country;

        option.textContent = country;

        select.appendChild(option);

    });

}


/* ============================================
   CREATE YEAR DROPDOWN
============================================ */

function createYearFilter(){

    const select = document.getElementById("yearSelect");

    let yearList = window.dashboardData.emission

        .map(item => item.Year)

        .filter(year => year);


    yearList = [...new Set(yearList)];

    yearList.sort((a,b)=>a-b);


    yearList.forEach(year=>{

        const option = document.createElement("option");

        option.value = year;

        option.textContent = year;

        select.appendChild(option);

    });

}


/* ============================================
   FILTER EVENT LISTENERS
============================================ */

function addFilterListener(){

    document.getElementById("countrySelect")

    .addEventListener("change",function(){

        selectedCountry = this.value;

        refreshDashboard();

    });


    document.getElementById("yearSelect")

    .addEventListener("change",function(){

        selectedYear = this.value;

        refreshDashboard();

    });

}


/* ============================================
   REFRESH DASHBOARD
============================================ */

function refreshDashboard(){

    console.log("Country :", selectedCountry);

    console.log("Year :", selectedYear);


    // Overview

    if(typeof initOverview === "function"){

        initOverview(selectedCountry, selectedYear);

    }


    // Emissions

    if(typeof initEmission === "function"){

        initEmission(selectedCountry, selectedYear);

    }


    // Temperature

    if(typeof initTemperature === "function"){

        initTemperature(selectedCountry, selectedYear);

    }


    // Disaster Impact

    if(typeof initImpact === "function"){

        initImpact(selectedCountry, selectedYear);

    }


    // Economic Impact

    if(typeof initEconomy === "function"){

        initEconomy(selectedCountry, selectedYear);

    }


    // Relationship Analysis

    if(typeof initRelation === "function"){

        initRelation(selectedCountry, selectedYear);

    }

}

/* ============================================
   FILTER DATA
============================================ */

function filterData(data){

    return data.filter(item=>{

        let countryOK = true;

        let yearOK = true;


        if(selectedCountry !== "All"){

            countryOK = item.Country === selectedCountry;

        }


        if(selectedYear !== "All"){

            yearOK = Number(item.Year) === Number(selectedYear);

        }


        return countryOK && yearOK;

    });

}


/* ============================================
   FORMAT NUMBER
============================================ */

function formatNumber(number){

    if(number == null || isNaN(number))

        return "-";

    return Number(number).toLocaleString();

}


/* ============================================
   FORMAT DECIMAL
============================================ */

function formatDecimal(number){

    if(number == null || isNaN(number))

        return "-";

    return Number(number).toFixed(2);

}


/* ============================================
   CALCULATE TOTAL
============================================ */

function getTotal(data,column){

    return data.reduce((sum,item)=>{

        return sum + (Number(item[column]) || 0);

    },0);

}


/* ============================================
   CALCULATE AVERAGE
============================================ */

function getAverage(data,column){

    if(data.length === 0)

        return 0;

    return getTotal(data,column) / data.length;

}


/* ============================================
   GET UNIQUE COUNTRIES
============================================ */

function getCountries(){

    return [

        ...new Set(

            window.dashboardData.emission.map(

                d=>d.Country

            )

        )

    ];

}


/* ============================================
   GET UNIQUE YEARS
============================================ */

function getYears(){

    return [

        ...new Set(

            window.dashboardData.emission.map(

                d=>d.Year

            )

        )

    ];

}


/* ============================================
   DATA ACCESS FUNCTIONS
============================================ */

function getEmission(){

    return filterData(

        window.dashboardData.emission

    );

}


function getLandTemp(){

    return filterData(

        window.dashboardData.landTemp

    );

}


function getSeaTemp(){

    return filterData(

        window.dashboardData.seaTemp

    );

}


function getDisaster(){

    return filterData(

        window.dashboardData.disaster

    );

}


function getEconomy(){

    return filterData(

        window.dashboardData.economy

    );

}


/* ============================================
   DEBUG
============================================ */

function showDashboardData(){

    console.log(window.dashboardData);

}


/* ============================================
   GLOBAL EXPORTS
============================================ */

window.getEmission = getEmission;

window.getLandTemp = getLandTemp;

window.getSeaTemp = getSeaTemp;

window.getDisaster = getDisaster;

window.getEconomy = getEconomy;

window.getAverage = getAverage;

window.getTotal = getTotal;

window.formatNumber = formatNumber;

window.formatDecimal = formatDecimal;