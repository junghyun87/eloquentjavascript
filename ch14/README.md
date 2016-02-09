### Events and DOM nodes
Every DOM element has its own addEventListener method, which allows you to listen specifically on that element
```javascript
addEventListener("click", function() {
    console.log("You clicked!");
  });

var button = document.querySelector("button");
  button.addEventListener("click", function() {
    console.log("Button clicked.");
  });

button.removeEventListener("click", once);
```

### Event objects
if we want to know which mouse button was pressed, we can look at the event object’s which property.
```javascript
button.addEventListener("mousedown", function(event) {
    if (event.which == 1)
      console.log("Left button");
}
```

At any point, an event handler can call the stopPropagation method on the event object to prevent handlers “further up” from receiving the event.



### Propagation
```javascript
button.addEventListener("mousedown", function(event) {
    console.log("Handler for button.");
    if (event.which == 3)
      event.stopPropagation();
  });
```

### Default actions
```javascript
link.addEventListener("click", function(event) {
    console.log("Nope.");
    event.preventDefault();
  });
```

### Key events
When a key on the keyboard is pressed, your browser fires a "keydown" event. When it is released, a "keyup" event fires.

```javascript
addEventListener("keydown", function(event) {
    if (event.keyCode == 86)
      document.body.style.background = "violet";
  });

//문자와 숫자에 대한 key code 찾기. 다른 key는 event.keyCode를 콘솔에 출력해보면서 파악한다.
console.log("Violet".charCodeAt(0));

//modifier key와 조합
addEventListener("keydown", function(event) {
    if (event.keyCode == 32 && event.ctrlKey)
      console.log("Continuing!");
  });
  

//어떤 text가 type되었는지 알고 싶을때, keypress를 쓴다. keydown으로도 알 수는 있다. keypress는 keydown 이벤트 다음에 호출되며, key를 계속 누르고 있으면 keydown이벤트와 함께 계속 발생함.

addEventListener("keypress", function(event) {
    console.log(String.fromCharCode(event.charCode));
  });
```

### Mouse clicks
* "mousedown" and "mouseup" events
* After the "mouseup" event, a "click" event fires on the most specific node that contained both the press and the release of the button. 마우스 눌른 곳과 땐 곳을 모두 포함하는 가장 세부적인 element에서 이벤트 handler 호출됨.
* "dblclick" (double-click) event also fires, after the second click event.
* pageX and pageY properties: document의 top-left를 기준으로 이벤트가 발생한 위치. pixel 단위.
* clientX, clientY는 screen을 기준으로 한 위치.
```javascript
addEventListener("click", function(event) {
    var dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = (event.pageX - 4) + "px";
    dot.style.top = (event.pageY - 4) + "px";
    document.body.appendChild(dot);
  });
```

### Mouse Motion
Every time the mouse pointer moves, a "mousemove" event fires.

```javascript
rect.addEventListener("mousedown", function(event) {
    if (event.which == 1) {
      lastX = event.pageX;
      addEventListener("mousemove", moved);
      event.preventDefault(); // Prevent selection
    }
  });
//buttons과 which property는 비슷한 기능 제공. buttons을 지원하지 않는 browser가 있기 때문에 둘 다 체크.
function buttonPressed(event) {
    if (event.buttons == null)
      return event.which != 0;
    else
      return event.buttons != 0;
  }
function moved(event) {
    if (!buttonPressed(event)) {
      removeEventListener("mousemove", moved);
    } else {
      var dist = event.pageX - lastX;
      var newWidth = Math.max(10, rect.offsetWidth + dist);
      rect.style.width = newWidth + "px";
      lastX = event.pageX;
    }
```

* Whenever the mouse pointer enters or leaves a node, a "mouseover" or "mouseout" event fires.
* 부모노드에서 자식노드로 갈때, mouseout 이벤트 발생하고 자식노드에서 mouseover이벤트 발생한 것이 propergation되어 부모노드에서도 발생. 자식노드에서 부모노드로 갈때, mouseover 이벤트 발생하고 자식노드에서 mouseout이벤트 발생한 것이 propergation되어 부모노드에서도 발생.
* relatedTarget property는 mouseover 이벤트 발생시 이전에 가리키던 element를 알려주고, mouseout 이벤트 발생시 현재 가리키고 있는 element를 알려준다. 이 정보를 이용하여 자식노드에서 발생하는 이벤트일 경우 무시할 수 있다.

### Scroll events
* Whenever an element is scrolled, a "scroll" event fires on it.

```javascript
var bar = document.querySelector(".progress div");
  addEventListener("scroll", function() {
    var max = document.body.scrollHeight - innerHeight;
    var percent = (pageYOffset / max) * 100;
    bar.style.width = percent + "%";
  });
```

* innerHeight: global variable. window의 height를 알려줌.
* document.body.scrollHeight: body element의 scrollable height

### Focus events
When an element gains focus, the browser fires a "focus" event on it. When it loses focus, a "blur" event fires.

### Load Event
* page loading이 끝나면 window와 document body objects에 대해 load event가 호출됨.
* loading events는 propagate되지 않음.
* images와 script tags와 같은 elements는 external file을 load할 수 있는데, load가 끝나면 load event가 호출된다.
* page가 닫히거나 벗어나게 되면 beforeunload event가 호출된다. 사용자가 page를 벗어날 때, 정말 나가고 싶은지 확인하는 dialog를 띄우는데 사용한다.

### Script execution timeline
#### Web workder
* you really do want to do some time-consuming thing in the background without freezing the page
```javascript
//code/squareworkers.js
addEventListener("message", function(event) {
  postMessage(event.data * event.data);
});
//original script xxx.js
var squareWorker = new Worker("code/squareworker.js");
squareWorker.addEventListener("message", function(event) {
  console.log("The worker responded:", event.data);
});
squareWorker.postMessage(10);
squareWorker.postMessage(24);
```
* worker를 만든 script는 Worker object를 통해 메시지를 주고 받음.
* worker는 새로운 global scope를 통해 메시지를 주고 기다림. 이 scope는 original script와 공유하지 않음.

### Setting Timers
* setTimeout, clearTimeout
* milliseconds 단위로 쓴다.

```javascript
var bombTimer = setTimeout(function() {
  console.log("BOOM!");
}, 500);

if (Math.random() < 0.5) { // 50% chance
  console.log("Defused.");
  clearTimeout(bombTimer);
}
```

* setInterval, clearInterval
```javascript
var ticks = 0;
var clock = setInterval(function() {
  console.log("tick", ticks++);
  if (ticks == 10) {
    clearInterval(clock);
    console.log("stop.");
  }
}, 200);
```

### Debouncing
* mousemove나 scroll 이벤트는 자주 주기적으로 호출되기 때문에 handler에서 time-consuming한 코드가 있을 경우 문서와의 interaction이 지연된다.
* debouncing the event: setTimeout을 써서 이벤트헨들러내의 코드가 너무 자주 호출 되지 않도록 하는 것.
```javascript
  var textarea = document.querySelector("textarea");
  var timeout;
  textarea.addEventListener("keydown", function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      console.log("You stopped typing.");
    }, 500);
  });
```