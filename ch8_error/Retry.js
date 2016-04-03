/**
 * Created by junghyunkwon on 1/1/16.
 */
function MultiplicatorUnitFailure() {}
//MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);

function primitiveMultiply(a, b) {
    if (Math.random() < 0.5)
        return a * b;
    else
        throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
    // Your code here.
    var result = null;
    for(;;){
        try{
            result = primitiveMultiply(a,b);
            return result;
        } catch(e){
            if (e instanceof MultiplicatorUnitFailure){
                console.log('exception occurred');
            }
            else
                throw e;
        }
    }


}

console.log(reliableMultiply(8, 8));
// → 64