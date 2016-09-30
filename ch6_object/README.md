### Prototpyes
``` javascript
//Object의 prototype을 리턴
Object.getPrototypeOf({});
Object.prototype;
//많은 objects들은 직접적으로 Object.prototpye을 prototpye으로 가지지 않음
Function.prototype;
Array.prototype;

//Object.create: 특정 객체를 prototype으로 object 생성. 그 객체의 property를 가짐
var protoRabbit = {
  speak: function(line) {
    console.log("The " + this.type + " rabbit says '" +
                line + "'");
  }
};
var killerRabit = Object.create(protoRabbit);

//Constructor로 object 생성.
//this도 만들어주고, member 변수 초기화도 해주고
//object의 prototype은 Object.prototype으로부터 온 빈 Object.
//생성자 안의 property들은 prototpye에 포함 안된다. 그런데 new로 인스턴스 생성하면 그 property가 포함되어 있다. 왜지?
function Rabbit(type) {
  this.type = type;
}
var killerRabbit = new Rabbit("killer");

//모든 생성자들은 prototype property 가지고 있음.
//prototype은 생성되는 인스턴스의 prototype이지 생성자의 prototype이 아님.
//그래서 property를 나중에 추가할 수 있고 추가된 property는 생성된 모든 instances가 사용할 수 있음
Rabbit.prototype.speak = function(line) {
  console.log("The " + this.type + " rabbit says '" +
              line + "'");
};
blackRabbit.speak("Doom...");

```

### Prototype interference
``` javascript
//property를 non-enumerable 하게 만들기
Object.defineProperty(Object.prototype, "hiddenNonsense",
                      {enumerable: false, value: "hi"});

//hasOwnProperty는 object 자신이 그 property를 가지고 있는지 검사하는 것. prototype을 보지 않음.
console.log(map.hasOwnProperty("toString"));


                      
```

### Prototype-less Objects
``` javascript
//프로토타입 없이 객체 생성
var map = Object.create(null);


```
