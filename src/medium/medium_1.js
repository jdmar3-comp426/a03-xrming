import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let sum = 0;
    array.forEach(myfuntion);
    function myfuntion(item) {
        sum += item;
    }
    return sum;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    array.sort((a, b) => a - b);
    let arrayl = array.length;
    if (arrayl%2==1) {
        return array[(arrayl+1)/2];
    } else {
        return (array[arrayl/2]+array[arrayl/2+1])/2;
    }
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    const map1 = new Map();
    map1.set('length',array.length);
    map1.set('sum',getSum(array));
    map1.set('mean',getSum(array)/array.length);
    map1.set('median',getMedian(array));
    map1.set('min',array[0]);
    map1.set('max',array[array.length-1]);
    map1.set('variance',variance(array, mean));
    map1.set('standard_deviation', Math.sqrt(arrayvariance));
    return map1;
}

