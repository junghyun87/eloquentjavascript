### The node command

``` javascript
process.exit(0)
```

``` bash
node showargv.js one --and two
# process.argv로 command line arguments 읽음.
#["node", "/home/marijn/showargv.js", "one", "--and", "two"]
```

### Modules
"require"로 module load할 때, .js 확장자는 생략가능함.
절대 및 상대 경로에 module이 없으면, built-in module이나 node_modules 디렉토리에서 해당 모듈을 찾는다.

``` javascript
//xxx.js
var garble = require("./garble");
var argument = process.argv[2];
console.log(garble(argument));

//module file yyy.js
module.exports = function(string) {
  return string.split("").map(function(ch) {
    return String.fromCharCode(ch.charCodeAt(0) + 5);
  }).join("");
};
```
module.exports를 garble로 교체.

### Installing with NPM
```bash
npm install figlet
```
npm install할 때, 필요한 dependencies가 package.json에 정의되어 있음.

### The file system module
* read a file
``` javascript
var fs = require("fs");
fs.readFile("file.txt", "utf8", function(error, text) {
  if (error)
    throw error;
  console.log("The file contained:", text);
});
```

* write a file
``` javascript
var fs = require("fs");
fs.writeFile("graffiti.txt", "Node was here", function(err) {
  if (err)
    console.log("Failed to write file:", err);
  else
    console.log("File written.");
});
```

* fs모듈은 그밖에도 readdir,stat, rename, unlink 등을 제공함.
* 파일 읽기 Synchronous 버전. fs의 많은 functions은 synchronous와 asynchronous를 같이 제공함.
``` javascript
var fs = require("fs");
console.log(fs.readFileSync("file.txt", "utf8"));
```

### The HTTP module
#### Server
``` javascript
var http = require("http");
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<h1>Hello!</h1><p>You asked for <code>" +
                 request.url + "</code></p>");
  response.end();
});
server.listen(8000);
```


#### Client
``` javascript
var http = require("http");
var request = http.request({
  hostname: "eloquentjavascript.net",
  path: "/20_node.html",
  method: "GET",
  headers: {Accept: "text/html"}
}, function(response) {
  console.log("Server responded with status code",
              response.statusCode);
});
request.end();
```

* request object에 write를 end전에 써서 data를 쓸 수 있지만 Get method의 경우 write를 사용하지 않음.

### Streams
#### Write stream
* server의 response, client의 request object는 writable streams의 예이다.
* 모든 writable streams는 write method를 가진다.
* write method는 string이나 Buffer object를 받음.
* end method는 stream을 닫기 전에 쓸 데이터를 인자로 가질 수 있고 닫고 나서 호출할 함수를 인자로 가질 수 있음.
* fs.createWriteStream는 특정 파일에 write하는 method로 fs.writeFile와는 달리 한번에 한 조각씩 파일에 쓴다.(stream으로 쓰기 때문)

#### Read stream
* server의 request와 client의 response는 readable streams의 예이다.
* stream으로부터 read할 때는 methods 말고 event handlers를 사용한다.
* 이벤트를 발생시키는 objects는 "on" method가 있는데 addEventListener와 비슷함. 이벤트 이름과 함수를 등록하면 이벤트 발생할 때, 그 함수가 호출됨.
* readable stream의 이벤트에는 "data"와 "end"가 있음. data이벤트는 데이터가 들어올때마다 발생하고, end는  stream의 끝에 있을 때 발생한다.
* 특정 파일을 읽을 때는 fs.createReadStream를 사용함.

```javascript
var http = require("http");
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  request.on("data", function(chunk) {
    response.write(chunk.toString().toUpperCase());
  });
  request.on("end", function() {
    response.end();
  });
}).listen(8000);
```

* chunk는 binary Buffer

``` javascript
var http = require("http");
var request = http.request({
  hostname: "localhost",
  port: 8000,
  method: "POST"
}, function(response) {
  response.on("data", function(chunk) {
    process.stdout.write(chunk.toString());
  });
});
request.end("Hello server");
```

* console.log 대신 writable stream인 process.stdout을 사용. console.log는 data이벤트가 발생할 때마다 newline character를 출력하기 때문.

### A simple file server
```javascript
var http = require("http"), fs = require("fs");

var methods = Object.create(null);

http.createServer(function(request, response) {
  function respond(code, body, type) {
    if (!type) type = "text/plain";
    response.writeHead(code, {"Content-Type": type});
    if (body && body.pipe)
      body.pipe(response);
    else
      response.end(body);
  }
  if (request.method in methods)
    methods[request.method](urlToPath(request.url),
                            respond, request);
  else
    respond(405, "Method " + request.method +
            " not allowed.");
}).listen(8000);

function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  return "." + decodeURIComponent(path);
}
```

* 405 error는 해당 method가 서버에 의해 지원되지 않음을 알려줌.
* body가 readable stream이면 pipe method를 가짐. pipe는 readable stream를 writable stream으로 포워딩 해줌.
* decodeURIComponent는 %20-style escape codes를 제거함.

#### GET 지원 함수 구현

```javascript
methods.GET = function(path, respond) {
  fs.stat(path, function(error, stats) {
    if (error && error.code == "ENOENT")
      respond(404, "File not found");
    else if (error)
      respond(500, error.toString());
    else if (stats.isDirectory())
      fs.readdir(path, function(error, files) {
        if (error)
          respond(500, error.toString());
        else
          respond(200, files.join("\n"));
      });
    else
      respond(200, fs.createReadStream(path),
              require("mime").lookup(path));
  });
};
```

* fs.stat로 파일에 대한 정보를 알 수 있다. size, modification date, etc.
* mime module로 특정 파일에 대한 Content-Type을 알 수 있다.

#### DELETE 지원 함수 구현

``` javascript
methods.DELETE = function(path, respond) {
  fs.stat(path, function(error, stats) {
    if (error && error.code == "ENOENT")
      respond(204);
    else if (error)
      respond(500, error.toString());
    else if (stats.isDirectory())
      fs.rmdir(path, respondErrorOrNothing(respond));
    else
      fs.unlink(path, respondErrorOrNothing(respond));
  });
};

function respondErrorOrNothing(respond) {
  return function(error) {
    if (error)
      respond(500, error.toString());
    else
      respond(204);
  };
}
```
* 존재하지 않는 파일을 삭제하려는 것에 대해 204 status(no content)를 리턴하는 이유는 이미 삭제된 것일 수 있기 때문. 그러한 관점에서 보면 삭제가 성공한 것임. HTTP 표준은 requests를 "idempotent"하게 만드는 것을 권장한다. 즉, 같은 요청을 여러번할 때, 다른 결과가 나오지 않도록 하기 위함이다.

#### PUT 지원 함수 구현
``` javascript
methods.PUT = function(path, respond, request) {
  var outStream = fs.createWriteStream(path);
  outStream.on("error", function(error) {
    respond(500, error.toString());
  });
  outStream.on("finish", function() {
    respond(204);
  });
  request.pipe(outStream);
};
```
* request는 reeadable stream, outStream은 writable stream
* writable stream(outStream) 생성이 실패하면 "error" event 발생. data가 성공적으로 전송되면 pipe는 readable stream(request), outStream을 모두 닫고 "finish" event 발생.

### Error handling
* exception이 발생하면 call stack의 top까지 exception이 전파된다(try-catch가 없을경우). Node에서는 프로그램이 종료되고 exception에 대한 정보가 standard error stream에 기록된다.

```javascript
var Promise = require("promise");
var fs = require("fs");

var readFile = Promise.denodeify(fs.readFile);
readFile("file.txt", "utf8").then(function(content) {
  console.log("The file contained: " + content);
}, function(error) {
  console.log("Failed to read file: " + error);
});

methods.GET = function(path) {
  return inspectPath(path).then(function(stats) {
    if (!stats) // Does not exist
      return {code: 404, body: "File not found"};
    else if (stats.isDirectory())
      return fsp.readdir(path).then(function(files) {
        return {code: 200, body: files.join("\n")};
      });
    else
      return {code: 200,
              type: require("mime").lookup(path),
              body: fs.createReadStream(path)};
  });
};

function inspectPath(path) {
  return fsp.stat(path).then(null, function(error) {
    if (error.code == "ENOENT") return null;
    else throw error;
  });
}
```

* Promise.denodeify는 asynchronous function을 인자로 받고, 그 함수를 promise-returning function으로 바꿔준다.
* inspectPath에서 파일이 존재하지 않는 경우는 exception으로 propergate하지 않게하기 위해 null을 return. null을 return하면 이전 promise object를 유지하는듯.