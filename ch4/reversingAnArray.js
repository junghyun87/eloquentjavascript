/**
 * Created by junghyunkwon on 12/24/15.
 */
function reverseArray(anArray){
    var newArray = [];
    for(var i=anArray.length-1;i>=0;i--){
        newArray.push(anArray[i]);
    }
    return newArray;
}

function reverseArrayInPlace(anArray){
    var len = anArray.length;
    var pivot = len/2;
    for(var i = 0 ;i<pivot;i++){
        var temp = anArray[i];
        anArray[i] = anArray[len-1-i];
        anArray[len-1-i] = temp;
    }
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]