/**
 * Created by Jung-Hyun on 2015-12-24.
 */
function range(start, end, step){
    if (step === undefined){
        step = 1;
    }

    var newArray = [];
    var numOfIter = end - start;
    if (numOfIter < 0){
        numOfIter = 0 - numOfIter;
    }

    var cnt = 0;
    var value = start;
    while(cnt <= numOfIter){
        newArray.push(value);
        value += step;
        cnt++;
    }

    return newArray;
}

function sum(numbers){
    var total=0;
    for(var i=0;i<numbers.length;i++){
        total+=numbers[i];
    }
    return total;
}

console.log(sum(range(1,10)));
console.log(range(1,10,2));
console.log(range(5,2,-1));