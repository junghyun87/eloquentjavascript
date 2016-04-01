### Sending a request
```javascript 
var req = new XMLHttpRequest();
req.open("GET", "example/data.txt", false);
req.send(null);
console.log(req.status, req.statusText);
// → 200 OK
console.log(req.getResponseHeader("content-type"));
```

### Asynchronous Requests

```javascript
var req = new XMLHttpRequest();
req.open("GET", "example/data.txt", true);
req.addEventListener("load", function() {
  console.log("Done:", req.status);
});
req.send(null);
```

* load 이벤트 말고도, progress, error, abort 이벤트가 있다. https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
* 아래 onreadystatechange에 대한 내용 출처: http://www.w3schools.com/ajax/ajax_xmlhttprequest_onreadystatechange.asp
* load 이벤트 대신 onreadystatechange 이벤트를 사용할 수 있다. onreadystatechange를 지원하는 브라우저 버전들이 더 많음.
* onreadystatechange 이벤트는 XMLHttpRequest 객체의 readyState property가 변경될 때마다 발생한다
* readyState는 XMLHttpRequest의 상태값을 가지고 있으며 값과 그 의미는 다음과 같다.
  * 0: request not initialized 
  * 1: server connection established
  * 2: request received 
  * 3: processing request 
  * 4: request finished and response is ready
* XMLHttpRequest는 또한 status property를 가지고 있고 그 값이 200이면 "OK", 404이면 Page not found이다.
* When readyState is 4 and status is 200, the response is ready

``` javascript
// source from http://www.w3schools.com/ajax/ajax_xmlhttprequest_onreadystatechange.asp
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    document.getElementById("demo").innerHTML = xhttp.responseText;
  }
};
```


### Fetching XML Data
* responseXML가 가리키는 object는 document object와 상응한다. 
* responseXML.documentElement는 XML document의 맨 바깥 tag를 가리킨다.
```javascript
var req = new XMLHttpRequest();
req.open("GET", "example/fruit.xml", false);
req.send(null);
console.log(req.responseXML.querySelectorAll("fruit").length);
```

* json data 읽기
```javascript
var req = new XMLHttpRequest();
req.open("GET", "example/fruit.json", false);
req.send(null);
console.log(JSON.parse(req.responseText));
// → {banana: "yellow", lemon: "yellow", cherry: "red"}
```

### HTTP sandboxing
* 서버가 Access-Control-Allow-Origin: \* 으로 되어 있으면 다른 도메인으로 XHR를 발생시킬 수 있음.

### Abstracting requests
* Asynchronous Module Definition (AMD): 모듈을 asynchrous하게 호출. 관련 dependencies를 asynchrous하게 호출하고 완료되면 해당 모듈을 이용한 작업이 정의되어 있는 callback 함수 수행
* Abstracting requests에서는 requests의 응답이 오기까지 asynchrous하게 진행되고 응답이 오면 할 일을 정의한 callback함수를 호출
* 기다리는 동안 error가 발생할 경우 error event가 있으면 처리해주고 callback 함수에 에러 인자를 추가하여 error가 났을 경우에 대한 동작을 추가해준다.

```javascript
function getURL(url, callback) {
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.addEventListener("load", function() {
    if (req.status < 400)
      callback(req.responseText);
    else
      callback(null, new Error("Request failed: " +
                               req.statusText));
  });
  req.addEventListener("error", function() {
    callback(null, new Error("Network error"));
  });
  req.send(null);
}
```

* 위 방법은 error는 처리하지만 exception은 처리 못함.

### Promises
```javascript
function get(url) {
  return new Promise(function(succeed, fail) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", function() {
      if (req.status < 400)
        succeed(req.responseText);
      else
        fail(new Error("Request failed: " + req.statusText));
    });
    req.addEventListener("error", function() {
      fail(new Error("Network error"));
    });
    req.send(null);
  });
}

get("example/data.txt").then(function(text) {
  console.log("data.txt: " + text);
}, function(error) {
  console.log("Failed to fetch data.txt: " + error);
});
```

* Promise를 사용하면 error 및 exception 처리가 쉬워진다.
* Promise constructor는 callback함수를 succeed와 fail함수 인자와 함께 호출함.
* then method로 succeed와 fail함수 정의를 넘겨줌.
* then은 새로운 promise를 생성. handler function이 nonpromise 값을 return하면 then에 의해 returned된 프로미스는 그 값과 함께 succeed함수 호출

``` javascript
function getJSON(url) {
  return get(url).then(JSON.parse);
}

var loading = showMessage("Loading...");
getJSON("example/bert.json").then(function(bert) {
  return getJSON(bert.spouse);
}).then(function(spouse) {
  return getJSON(spouse.mother);
}).then(function(mother) {
  showMessage("The name is " + mother.name);
}).catch(function(error) {
  showMessage(String(error));
}).then(function() {
  document.body.removeChild(loading);
});
```

* failure handler를 명시하지 않아도 됨. Error는 then에 의해 return된 promise에 전달됨. getJSON의 caller가 catch로 error를 처리함.
* catch다음 then은 에러가 발생하든 발생하지 않든 실행됨.

