/**
 * Created by Jung-Hyun on 2015-12-24.
 */
function range(start, end, step){
    if (step === undefined){
        if (end >= start){
            step = 1;
        } else {
            step = -1;
        }

    }

    var newArray = [];
    if (step < 0){
        for(var i = start; i >= end; i+=step){
            newArray.push(i);
        }
    } else if (step > 0){
        for(var i = start; i <= end; i+=step){
            newArray.push(i);
        }
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
console.log(range(5,2));