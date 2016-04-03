### Moving through the tree
```javascript
node.childNodes.length
node.childNodes[i]
node.firstChild
node.lastChild
node.previousSibling
node.nextSibling
if (node.nodeType == document.ELEMENT_NODE){

} else if (node.nodeType == document.TEXT_NODE){

}
```

### Finding Elements
```javascript
var link = document.body.getElementsByTagName("a")[0];

```

### Chaning the document
```javascript
removeChild
appendChild
insertBefore
replaceChild
```

### Creating nodes
``` javascript
var node = document.createElement(type);
...
if (typeof child == "string")
  child = document.createTextNode(child);
...
node.appendChild(child);

var strong = document.createElement("strong");
strong.appendChild(document.createTextNode(match[0]));
```


### Attributes
``` javascript
//parameters를 반복문으로 반복할 때, for를 써서 paras.length로 탈출조건을 사용하면 아래와 같이 element를 삭제하는 경우 length가 1이 작아지므로 for문이 모든 element를 방문하지 못함. 그래서 아래와 같은 방법 사용
var paras = document.body.getElementsByTagName("p");
Array.prototype.forEach.call(paras, function(para) {
  if (para.getAttribute("data-classified") == "secret")
    para.parentNode.removeChild(para);
});

para.getAttribute("data-classified") == "secret"
var text = node.textContent
node.textContent = ""; // Clear the node
var lang = pre.getAttribute("data-language");

var languages = {
  javascript: /\b(function|return|var)\b/g /* … etc */
};
...
var lang = pre.getAttribute("data-language");
if (languages.hasOwnProperty(lang))
  highlightCode(pre, languages[lang]);
```

### Layout
#### Element의 크기 구하기
```javascript
//offsetHeight, offsetWidth: 엘리먼트가 얼만큼의 pixel을 차지하는지.
//clientHeight, clientWidth: border size를 미포함한 offsetHeight, offsetWidth
var para = document.body.getElementsByTagName("p")[0];
  console.log("clientHeight:", para.clientHeight);
  console.log("offsetHeight:", para.offsetHeight);
  console.log("clientWidth:", para.clientWidth);
  console.log("offsetWidth:", para.offsetWidth);
```
#### Element의 위치 구하기
``` javascript
ele.getBoundingClientRect //relative to the top left of the screen
////relative to the whole document에 대한 위치를 구하고 싶으면 global variables인 pageXOffset, pageYOffset를 사용하여 현재 scroll의 위치를 구하여 ele.getBoundingClientRect에 더한다.
```

### Styling
```javascript
//style property holds an object that has properties for all possible style properties.
var para = document.getElementById("para");
console.log(para.style.color);
para.style.color = "magenta";
```

### Query selectors
```javascript
function count(selector) {
    return document.querySelectorAll(selector).length;
}
console.log(count("p"));           // All <p> elements
console.log(count(".animal"));     // Class animal
console.log(count("p .animal"));   // Animal inside of <p>
console.log(count("p > .animal")); // Direct child of <p>
```
Unlike methods such as getElementsByTagName, the object returned by querySelectorAll is not live. It won’t change when you change the document.
The querySelector method (without the All part) works in a similar way.

### Positioning and animating
* position style
 * static: document에서 normal place에 놓임.
 * relative: document에서 여전히 space를 차지하지만, top, left style properties가 normal place에 상대적으로 움직이도록 설정될 수 있다.
 * absolute: element가 normal document flow에서 제거된다(space를 차지하지 않게 된다). top, left properties는 가장 근접하고 position property가 static이 아닌 부모 element의 top-left corner를 기준으로 설정된다. 그러한 부모element가 없다면 document를 기준으로 설정됨.
 * fixed: element가 screen 기준으로 설정됨.

``` html
<p style="text-align: center">
  <img src="img/cat.png" style="position: relative">
</p>
```

```javascript
var cat = document.querySelector("img");
...
cat.style.top = (Math.sin(angle) * 20) + "px";
cat.style.left = (Math.cos(angle) * 200) + "px";
```




