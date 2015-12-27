/**
 * Created by junghyunkwon on 12/27/15.
 */
function deepEqual(val1,val2){
    if (val1 === val2){
        return true;
    } else if((typeof val1 === "object") && (typeof val2 === "object")){
        if(Object.keys(val1).length !== Object.keys(val2).length){
            return false;
        }
        for(p in val1){
            if (val2[p] == undefined){
                return false;
            }else if(!deepEqual(val1[p],val2[p])) {
                return false;
            }
        }
        return true;
    }
    else{
        return false;
    }
}


var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true