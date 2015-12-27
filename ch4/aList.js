/**
 * Created by junghyunkwon on 12/24/15.
 */
function arrayToList(anArray) {
    var list = {};

    for (var i = 0; i < anArray.length; i++) {
        if (i == 0) {
            list.value = anArray[i];
            list.rest = null;
        } else {

            var child = list;
            while (child.rest) {
                child = child.rest;
            }
            child.rest = {
                value: anArray[i],
                rest: null
            }
        }
    }
    return list;
}

function listToArray(aList){
    var next = aList;
    var newArray = [];
    while(next){
        newArray.push(next.value);
        next = next.rest;
    }
    return newArray;
}

function prepend(anEle,aList){
    return {
        value: anEle,
        rest: aList
    };
}

function nth(aList,num){
    //return element
    if (num == 0){
        return aList.value;
    }
    if (num != 0 && aList.rest == null){
        return undefined;
    }else{
        return nth(aList.rest,num-1);
    }

}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20