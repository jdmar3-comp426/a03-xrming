/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
    let c = a+b;
    let string = [a,'+',b,'=',c].join(' ');
    return string;
}


/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export function getIncreasingArray(startNumber, endNumber) {
    let arl = new Array(endNumber-startNumber+1)
    let j=0;
    for (let i=startNumber; i<=endNumber; i++){
        arl[j]=i;
        j++;
    }
    return arl;
}

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    numbers.sort((a, b) => a - b);
    const obj = new Object();
    obj.max=numbers[numbers.length-1];
    obj.min=numbers[0];
    return obj;
}

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */
export function countArray(array) {
    const result = new Object();
    let length=array.length;
    while (array.length>0){
        var goal=array[0];
        let count = 0;
        let keyname = goal +'';
        for (let i=0; i<array.length; i++) {
            if (array[i]==goal) {
                array.splice(i,1);
                count++;
                i--;
            }
        }
        result[keyname] = count;
    }
    return result;
}
