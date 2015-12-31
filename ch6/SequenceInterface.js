/**
 * Created by Jung-Hyun on 2015-12-31.
 */

function Sequence(arr){
    this.arr=arr;
    this.status = 0;
}
Sequence.prototype.next = function(){
    if(this.status < 5 && this.arr.length > this.status){
        return this.arr[this.status++];
    } else{
       return null;
    }
};

function logFive(seq){
    var value=null;
    while(value=seq.next()){
        console.log(value);
    }
}

function ArraySeq(arr){
    this.inner = new Sequence(arr);
}

ArraySeq.prototype.next = function(){
    return this.inner.next();
};

function RangeSeq(from, to){
    var arr = [];
    for (var i = from;i<to;i++){
        arr.push(i);
    }
    this.inner = new Sequence(arr);
}
RangeSeq.prototype.next = function(){
    return this.inner.next();
};

logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104