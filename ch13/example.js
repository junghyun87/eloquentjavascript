/**
 * Created by junghyunkwon on 1/3/16.
 */
//Moving through the tree
//parentNode, childNodes, firstChild, lastChild, previousSibling and nextSibling
function talksAbout(node, string) {
    if (node.nodeType == document.ELEMENT_NODE) {
        for (var i = 0; i < node.childNodes.length; i++) {
            if (talksAbout(node.childNodes[i], string))
                return true;
        }
        return false;
    } else if (node.nodeType == document.TEXT_NODE) {
        return node.nodeValue.indexOf(string) > -1;
    }
}

console.log(talksAbout(document.body, "book"));
// → true

//Finding elements
var link = document.body.getElementsByTagName("a")[0];
console.log(link.href);

//Changing the document
//removeChild, appendChild, insertBefore, replaceChild
var paragraphs = document.body.getElementsByTagName("p");
document.body.insertBefore(paragraphs[2], paragraphs[0]);

//Creating nodes
//document.createElement, createTextNode
function replaceImages() {
    var images = document.body.getElementsByTagName("img");
    for (var i = images.length - 1; i >= 0; i--) {
        var image = images[i];
        if (image.alt) {
            var text = document.createTextNode(image.alt);
            image.parentNode.replaceChild(text, image);
        }
    }
}

function elt(type) {
    var node = document.createElement(type);
    for (var i = 1; i < arguments.length; i++) {
        var child = arguments[i];
        if (typeof child == "string")
            child = document.createTextNode(child);
        node.appendChild(child);
    }
    return node;
}

document.getElementById("quote").appendChild(
    elt("footer", "—",
        elt("strong", "Karl Popper"),
        ", preface to the second editon of ",
        elt("em", "The Open Society and Its Enemies"),
        ", 1950"));

//Attributes
var paras = document.body.getElementsByTagName("p");
Array.prototype.forEach.call(paras, function(para) {
    if (para.getAttribute("data-classified") == "secret")
        para.parentNode.removeChild(para);
});

function highlightCode(node, keywords) {
    var text = node.textContent;
    node.textContent = ""; // Clear the node

    var match, pos = 0;
    while (match = keywords.exec(text)) {
        var before = text.slice(pos, match.index);
        node.appendChild(document.createTextNode(before));
        var strong = document.createElement("strong");
        strong.appendChild(document.createTextNode(match[0]));
        node.appendChild(strong);
        pos = keywords.lastIndex;
    }
    var after = text.slice(pos);
    node.appendChild(document.createTextNode(after));
}

//Layout
//offsetWidth and offsetHeight, clientWidth and clientHeight
var para = document.body.getElementsByTagName("p")[0];
console.log("clientHeight:", para.clientHeight);
console.log("offsetHeight:", para.offsetHeight);

function time(name, action) {
    var start = Date.now(); // Current time in milliseconds
    action();
    console.log(name, "took", Date.now() - start, "ms");
}

time("naive", function() {
    var target = document.getElementById("one");
    while (target.offsetWidth < 2000)
        target.appendChild(document.createTextNode("X"));
});
// → naive took 32 ms

time("clever", function() {
    var target = document.getElementById("two");
    target.appendChild(document.createTextNode("XXXXX"));
    var total = Math.ceil(2000 / (target.offsetWidth / 5));
    for (var i = 5; i < total; i++)
        target.appendChild(document.createTextNode("X"));
});
// → clever took 1 ms

//Styling
var para = document.getElementById("para");
console.log(para.style.color);
para.style.color = "magenta";

//Query selectors
function count(selector) {
    return document.querySelectorAll(selector).length;
}
console.log(count("p"));           // All <p> elements
// → 4
console.log(count(".animal"));     // Class animal
// → 2
console.log(count("p .animal"));   // Animal inside of <p>
// → 2
console.log(count("p > .animal")); // Direct child of <p>
// → 1

//Positioning and animating
var cat = document.querySelector("img");
var angle = 0, lastTime = null;
function animate(time) {
    if (lastTime != null)
        angle += (time - lastTime) * 0.001;
    lastTime = time;
    cat.style.top = (Math.sin(angle) * 20) + "px";
    cat.style.left = (Math.cos(angle) * 200) + "px";
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);











