/**
 * Created by junghyunkwon on 1/1/16.
 */
console.log(/ebc(de)?/.exec("abcebc"));

console.log(
    "Hopper, Grace\nMcCarthy, John\nRitchie, Dennis"
        .replace(/([\w ]+), ([\w ]+)/g, "$&"));

var stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
    amount = Number(amount) - 1;
    if (amount == 1) // only one left, remove the 's'
        unit = unit.slice(0, unit.length - 1);
    else if (amount == 0)
        amount = "no";
    return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// → no lemon, 1 cabbage, and 100 eggs

var name = "dea+hl[]rd";
var text = "This dea+hl[]rd guy is super annoying.";
var escaped = name.replace(/[^\w\s]/g, "\\$&");
console.log(escaped);
var regexp = new RegExp("\\b(" + escaped + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));
// → This _dea+hl[]rd_ guy is super annoying.

var input = "A string with 3 numbers in it... 42 and 88.";
var number = /\b(\d+)\b/g;
var match;
while (match = number.exec(input)){
    console.log("Found", match[1], "at", match.index);

}

function parseINI(string) {
    // Start with an object to hold the top-level fields
    var currentSection = {name: null, fields: []};
    var categories = [currentSection];

    string.split(/\r?\n/).forEach(function(line) {
        var match;
        if (/^\s*(;.*)?$/.test(line)) {
            return;
        } else if (match = line.match(/^\[(.*)\]$/)) {
            currentSection = {name: match[1], fields: []};
            categories.push(currentSection);
        } else if (match = line.match(/^(\w+)=(.*)$/)) {
            currentSection.fields.push({name: match[1],
                value: match[2]});
        } else {
            throw new Error("Line '" + line + "' is invalid.");
        }
    });

    return categories;
}

console.log('abcekabc'.match(/abc(ek)?/));