/**
 * Created by junghyunkwon on 2/12/16.
 */
/*
 In Chapter 17, the first exercise was to make several requests to eloquentjavascript.net/author,
 asking for different types of content by passing different Accept headers.

 Do this again, using Node’s http.request function.
 Ask for at least the media types text/plain, text/html, and application/json.
 Remember that headers to a request can be given as an object, in the headers property of http.request’s first argument.

 Write out the content of the responses to each request.
 */
var http = require("http");
var request = http.request({
    hostname: "eloquentjavascript.net",
    path: "/author",
    method: "GET",
    headers: {Accept: "text/plain"}
}, function(response){
    response.on("data", function(chunk){
        process.stdout.write(chunk.toString());
    });
});
request.end();

function readStreamAsString(stream, callback) {
    var data = "";
    stream.on("data", function(chunk) {
        data += chunk.toString();
    });
    stream.on("end", function() {
        callback(null, data);
    });
    stream.on("error", function(error) {
        callback(error);
    });
}

request = http.request({
    hostname: "eloquentjavascript.net",
    path: "/author",
    method: "GET",
    headers: {Accept: "text/html"}
}, function(response){
    readStreamAsString(response,function(error, data){
       if(!error){
           console.log(data);
       }else{
           console.log(error.toString());
       }
    });
});
request.end();

request = http.request({
    hostname: "eloquentjavascript.net",
    path: "/author",
    method: "GET",
    headers: {Accept: "application/json"}
}, function(response){
    response.on("data", function(chunk){
        process.stdout.write(chunk.toString());
    });
});
request.end();