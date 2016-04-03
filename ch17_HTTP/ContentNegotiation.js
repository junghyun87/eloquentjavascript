/**
 * Created by Jung-Hyun on 2016-01-05.
 */
// Your code here.
var req = new XMLHttpRequest();
req.open("GET", "author", false);
req.setRequestHeader("Accept","text/plain");
req.send(null);
console.log(req.status);
console.log(req.getResponseHeader("content-type"));

req.open("GET", "author", false);
req.setRequestHeader("Accept","text/html");
req.send(null);
console.log(req.status);
console.log(req.getResponseHeader("content-type"));

req.open("GET", "author", false);
req.setRequestHeader("Accept","application/json");
req.send(null);
console.log(req.status);
console.log(req.getResponseHeader("content-type"));

req.open("GET", "author", false);
req.setRequestHeader("Accept","application/rainbows+unicorns");
req.send(null);
console.log(req.status);
console.log(req.getResponseHeader("content-type"));
