/**
 * Created by Jung-Hyun on 2015-12-29.
 */
var ANCESTRY_FILE=require('./ancestry.js');
var ancestry=JSON.parse(ANCESTRY_FILE);

function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
    byName[person.name] = person;
});

// Your code here.
function notnull(p){
    return p.mother !== null && byName[p.mother] !== undefined;
}
function age(p){
    return p.born - byName[p.mother].born;
}
console.log(average(ancestry.filter(notnull).map(age)));


// → 31.2