/**
 * Created by Jung-Hyun on 2015-12-29.
 */

// Your code here.
function every(array,f){
    for (var i in array){
        if(f(array[i]) === false){
            return false;
        }
    }
    return true;
}

function some(array,f){
    for (var i in array){
        if(f(array[i]) === true){
            return true;
        }
    }
    return false;
}
console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false