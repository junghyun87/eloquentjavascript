/**
 * Created by Jung-Hyun on 2015-12-24.
 */
function isEven(number){
    if(number < 0){
        return null;
    }
    if(number === 0){
        return true;
    } else if (number === 1){
        return false;
    } else {
        return isEven(number-2);
    }
}
console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1));