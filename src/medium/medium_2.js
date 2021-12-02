import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: avgMpg(mpg_data),
    allYearStats:allYearStats(mpg_data),
    ratioHybrids:ratioHybrids(mpg_data)
};

function allYearStats(data) {
    const listofyears = [];
    //addyear(...data)
    for (let i=0; i<data.length; i++) {
        addyear(data[i]);
    }
    function addyear(item) {
        listofyears.push(item["year"]);
    }
    return getStatistics(listofyears);
};

function avgMpg(data) {
    const result = new Object();
    let citymiles = 0;
    let highwaymiles = 0;
    let count = 0;
    //summiles(...data);
    for (let i=0; i<data.length; i++) {
        summiles(data[i]);
    }
    function summiles(item) {
        citymiles+=item["city_mpg"];
        highwaymiles+=item["highway_mpg"];
        count++;
    }
    result.city = citymiles/count;
    result.highway = highwaymiles/count;
    return result;
};

function ratioHybrids(data) {
    let count = 0;
    let hybridcount = 0;
    //counthybrid(...data);
    for (let i=0; i<data.length; i++) {
        counthybrid(data[i]);
    }
    function counthybrid(item) {
        if (item["hybrid"]) {
            hybridcount++;
        }
        count++;
    }
    return hybridcount/count;
}


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: makerHybrids(mpg_data),
    avgMpgByYearAndHybrid: avgMpgByYearAndHybrid(mpg_data)
};
//Array of objects where keys are the `make` of the car and
//a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
//in descending order.
function makerHybrids(data) {
    let results = [];
    for (let i=0; i<data.length; i++) {
        if (data[i].hybrid) {
            let desiredmake = data[i].make;
            let index = results.findIndex(hasmake);
            function hasmake (ele) {
                if (ele.make=desiredmake) {
                    return true;
                } else {
                    return false;
                }
            }
            if (index!==-1) {
                results[index].hybrids.push(data[i].id);
            } else {

                let result = new Object();
                result.make = data[i].make;
                result.hybrids=[];
                result.hybrids.push(data[i].id);
                results.push(result);
            }
        }
    }
    results.sort(compare);
    function compare(a,b) {
        if (a.hybrid.length>b.hybrid.length) {
            return -1;
        }
        if (a.hybrid.length<b.hybrid.length) {
            return 1;
        }
        return 0;
    }
    return results;
}


function avgMpgByYearAndHybrid(data) {
    let gather = new Object();
    for (let i=0; i<data.length; i++) {
        if (data[i].year in gather) {
            if (data[i].hybrid) {
                gather[data[i].year.toString()].hybrid.push(data[i]);
            } else {
                gather[data[i].year.toString()].notHybrid.push(data[i]);
            }
        } else {
            let newyear= data[i].year.toString();
            gather[newyear] =new Object();
            gather[newyear].hybrid=[];
            gather[newyear].notHybrid=[];
            if (data[i].hybrid) {
                gather[newyear].hybrid.push(data[i]);
            } else {
                gather[newyear].notHybrid.push(data[i]);
            }
        }
    }
    for (const prop in gather) {
        let hybridavg = avgMpg(gather[prop].hybrid);
        let nothybridavg = avgMpg(gather[prop].notHybrid);
        delete gather[prop].hybrid;
        delete gather[prop].notHybrid;
        gather[prop].hybrid=hybridavg;
        gather[prop].notHybrid=nothybridavg
    }
}


