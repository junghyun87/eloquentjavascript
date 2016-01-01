/**
 * Created by junghyunkwon on 1/1/16.
 */
// Fill in the regular expressions

verify(/car|cats/,
    ["my car", "bad cats"],
    ["camper", "high art"]);

verify(/pr?op/,
    ["pop culture", "mad props"],
    ["plop"]);

verify(/ferr(et|y|ari)/,
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"]);

verify(/\b\w*ious\b/,
    ["how delicious", "spacious room"],
    ["ruinous", "consciousness"]);

verify(/\s+[\.,\:\;]/,
    ["bad punctuation ."],
    ["escape the dot"]);

verify(/\b\w{7,}\b/,
    ["hottentottententen"],
    ["no", "hotten totten tenten"]);

verify(/\b[a-df-z0-9]+\b/,
    ["red platypus", "wobbling nest"],
    ["earth bed", "learning ape"]);


function verify(regexp, yes, no) {
    // Ignore unfinished exercises
    if (regexp.source == "..."){
        console.log('Ignore unfinished exercises');
        return;
    }

    yes.forEach(function(s) {
        if (!regexp.test(s))
            console.log("Failure to match '" + s + "'");
    });
    no.forEach(function(s) {
        if (regexp.test(s))
            console.log("Unexpected match for '" + s + "'");
    });
}

