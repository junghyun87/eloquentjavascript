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

