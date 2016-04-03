/**
 * Created by Jung-Hyun on 2015-12-24.
 */
function countBs(s){
    return countChar(s,"B");
}
console.log(countBs("dkjBdkjfBdkjfBdkj"));

function countChar(s,m){
    var cnt =0;
    for(var i=0;i< s.length;i++){
        var c = s.charAt(i);
        if (c === m){
            cnt++;
        }
    }
    return cnt;
}
console.log(countChar("dkjBdkjfBdkjfBdkj","k"));