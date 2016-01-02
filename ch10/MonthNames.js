/**
 * Created by junghyunkwon on 1/2/16.
 */
(function(exports){
    var names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep",
    "Oct","Nov","Dec"];

    exports.name = function(number){
        return names[number];
    }
    exports.number = function(name){
        return names.indexOf(name);
    }
})(this.month={});

console.log(this.month.name(this.month.number("Nov")));
console.log(this);