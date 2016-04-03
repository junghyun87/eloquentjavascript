var ANCESTRY_FILE = require('./ancestry');
function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
}

// Your code here.
var ancestry = JSON.parse(ANCESTRY_FILE);

function peopleOverNinety(p){
    return p.died - p.born > 90;
}

//console.log(ancestry.filter(peopleOverNinety));

var result ={};
ancestry.forEach(function(p){
    var centry = Math.ceil(p.died/100);
    var age = p.died- p.born;
    if(centry in result){
        result[centry].push(age);
    }else{
        result[centry] = [age];
    }
});
for (var centry in result){
    console.log(centry,": ", average(result[centry]));
}
//console.log(result);

// → 16: 43.5
//   17: 51.2
//   18: 52.8
//   19: 54.8
//   20: 84.7
//   21: 94

function groupBy(array, f){
    var group={};
    array.forEach(function(p){
        var name = f(p);
        if(name in group){
            group[name].push(p);
        }else{
            group[name] = [p];
        }
    });
    return group;
}

function groupfunction1(p){
    var centry = Math.ceil(p.died/100);
    return centry;
}
console.log(groupBy(ancestry,groupfunction1));