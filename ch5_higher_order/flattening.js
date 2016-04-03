/**
 * Created by Jung-Hyun on 2015-12-29.
 */
var arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
console.log(arrays.reduce(function(a,b){
  return a.concat(b);
}))

// → [1, 2, 3, 4, 5, 6]

