# yah

<img src="https://github.com/Tohoma/yahscript/blob/master/images/yahLogo.png" width="200">



A language for CMSI 488

yah is a statically typed programming language with all of the dynamic benefits. It allows for coding how you want, with multiple different options to accomplish what you want. Prefer using `&&` instead of `and`, or `^` instead of `**`? We got your back. Taking a dash of Javascript, a sprinkle of Python, a splash of CoffeeScript and compiling into Javascript gives you the glorious and infamous yah. yaaaaaaaaah.

# Features

### Primitive and Reference types
yah allows for many different ways to represent the same implementation. For instance, notice the two ways to describe undefined, nil, and NaN below.

```
a is 2                                                      var a = 2;
b is "what"                                                 var b = "what";
c is yah                                                    var c = true;
d is nah                                                    var d = false;

e is ͡° ͜ʖ ͡°                                               var e = undefined;                                            
f is ಠ_ಠ                                                    var f = null;
g is :^)                                                    var g = NaN;

banana is undefined                                         var banana = undefined;
apple is nil                                                var apple = null;
orange is NaN                                               var orange = NaN;

h is [1,2,3,4,5] // Like Python, lists are mutable          var h = [1,2,3,4,5];
i is (1,2,3,4,5) // Tuples are immutable                    var i = [1,2,3,4,5];

h[0] is 6        // This would result in [6,2,3,4,5]        h[0] = 6;
i[0] is 6        // This would cause a runtime error

```

### Assignment
Unlike Javascript yah does not use var to declare assignments. yah uses type inference, however it also allows for explicit restrictions. yah also supports constants and, unlike javascript, you cannot edit the properties of an object constant. The keyword `swag` is placed before the variable declaration to indicate an object constant. Please see the code below for basic assignments, explicit restrictive assignments, and the use of object constants.

```
// Example of declaring and assigning to four variables
x is 1                                                      var x = 1;
y is 2 - x                                                  var y = 2 - x;
z is 3 - y                                                  var z = 3 - y;
u is 4 - z                                                  var u = 4 - z;

dog:int is 5                                                var dog = 5;
cat:String is "furry"                                       var cat = "furry";
cat is 10                                                   // Produces a compile-time error

// Example use of constants
swag dog is 2                                              const dog = 2;
dog is 3                                                   // Produces a compile-time error

```
### Strings
YahScript supporst string concatenation and borrows some elements from swift.

```
stringOne is "sup"                                          var stringOne = "sup";
stringTwo is "bruh"                                         var stringTwo = "bruh";
banana is 10                                                var banana = 10;

stringThree is "sup \(StringTwo)                            var stringThree = "sup " + 
    here's \(banana) dollars"                                   stringTwo + " here's " + 
                                                                banana + " dollars";
                                                                
print stringThree                                          console.log(stringThree);       
```

The following are some string operations.

```
//Adding strings creates a new string with the string on the right appended to the string on the left
print "Hello " + "World"                                   console.log("Hello " + "World");

//Multiplying a string repeats the string

print "Hello " * 3                                         

// This would print "Hello Hello Hello "

```

### If, Else and Conditional Statements.
If and Else can be written without parantheses or curly braces. If statements can also use the reserved word then to allow for a one-liner statement.

```
if eq x,y,z,u:                                              if (x === y && y === z && z === u) {
    spit yah                                                    return true;
else:                                                       } else {
    spit nah                                                    return false;
                                                            }

//one-liner
spit yah if eq x,y                                          if (x === y) return true;

eq x,y ? yah : nah                                          (x === y) ? true : false;

```

### Equivalency and other Relational operations
Equivalency in YahScript takes the form of `eq var1, var2, ..., vari`. Other relational operations preform the same way. 
Arguments are evaluated from left to right.

```
spit eq 2,2                                                 return 2 === 2;
// returns yah

spit (eq 1,2 )                                              return 1 === 2;
// returns nah

spit gt 10,11,12,1                                          return 10 > 11 && 11 > 12 && 12 > 1;

temp is 40                                                  var temp = 40;
spit lt 10,12,temp,100                                      return 10 < 12 && 12 < temp && temp < 100;     

geq 11,2,1                                                  11 >= 2 && 2 >= 1;
leq 12,1,0                                                  12 <= 1 && 1 <= 0;
```

### Loops and Iterations
YahScript provides multiple ways to perform a set of statements multiple times. there is a for loop, for each, while, and the much simpler times operator.

```
//All three iterations will output the same values

basket = ["banana", "orange", "grapefruit"]                 var basket = ["banana", "orange", "grapefruit"];

for each fruit in basket:                                   for each (var fruit in basket) {
  print "stop eating my \(fruit)"                               console.log("stop eating my " + fruit);
                                                            }

for i in (0 .. basket.length):                              for (var i = 0; i < basket.length; i++) {
  print "stop eating my \(basket[i])"                           console.log("stop eating my " + basket[i]);
                                                            }

times 3:                                                    for (var i = 0; i < 3; i++) {
  print "stop eating my \(basket[i])"                           console.log("stop eating my " + basket[i]);
                                                            }
```

### Functions
Functions are defined by an optional list of parameters in parentheses, an arrow, and the function body.

```
// Declaring a function named printParam
printParam is (x) -> spit x                                 var printParam = function (x) {
                                                                return x;
                                                            }

printParam("Hello")                                         console.log(printParam("Hello"));
// output is Hello
```

Functions may also have default values for arguments, for missing arguments.

```
cat is (weight, personality is "cuddly") ->                 var cat = function (weight, personality = "cuddly") {
  spit "Free cats available,                                    return "Free cats available,
      weighing \{weight} pounds,                                weighing " + weight + " pounds,
         with \{personality} personalities"                         with " + personality + " personalities";
                                                            }
```
#### Comments
A single line comment is created with two foward slash characters. Multiline comments are started with two foward slashes followed by a backslash and ends with two back slashes followed by a single foward slash. 

```
//This is a single line comment

///
This is a 
multiline comment

Still multiline

Multiline comment ends below. 
///

```

###Scoping
Scpoing in YahScript is similar to python's LEGB rule.
Local -> Enclosed -> Global -> Built In
YahScript first searches for a variable in the local namespace. If the variable cannot be found in the local namespace, Yahscirpt continues the search in the namespace of the enclosing function. If not found in the enclosing function, or if there is no enclosing function, YahScript looks in the global namespace followed by the namespace of built in / reserved names.

The following code would output:
5
10
5

```
i is 5                                                      var i = 5;

bar is () ->                                                var bar = function () {
    print i                                                     console.log(i);
                                                            }

foo is () ->                                                var foo = function () {
    i is 10                                                     var i = 10;
    print i                                                     console.log(i);
                                                            }

bar()                                                       bar();
foo()                                                       foo();
print i                                                     console.log(i);

```
YahScript allows for skipping namespace levels by using the reserved word noscope. In the below example, the output would be:
5
15

```
i is 5                                                      var i = 5;

apple is () ->                                              var apple = function () {
    noscope i                                                   i = 15;
    i is 15                                                     console.log(i);
    print i                                                 }

print i                                                     console.log(i);
apple()                                                     apple();

```

By calling noscope multiple times, multiple namespace levels can be skipped.

```
k is 10                                                     var k = 10;

sup is () ->                                                var sup = function () {
    k is 20                                                     var k = 20;
    bruh is () ->                                               var bruh = function () {
         noscope noscope k                                          k = 99;
        k is 99                                                     console.log(k);
        print k                                                 }
    bruh()                                                      bruh();
                                                            }

print k                                                     console.log(k);
sup()                                                       sup();
print k                                                     console.log(k);
```
This would output: 10 99 99

### Code examples
Prime Function
```
prime is (n) ->                                             var prime = function (n) {
    for i in (0...n/2):                                         for (var i = 0; i < n/2; i++) {
        if eq n % i, 0:                                             if (n % i === 0) {
            spit nah                                                    return false;
        i++                                                         }
    spit yah                                                    return true;
                                                            }
```

Callback function usage
```
sample is (functionvar) ->                                  var sample = function (functionvar) {
  functionvar("dog")                                            functionvar("dog");
                                                            }

sample((x) -> print(x))                                     sample(function (x) {
// The output would be "dog"                                    console.log(x);
                                                            })

```

Collatz
```                                                 
collatz is (n, count is 0) ->                               var collatz = function (n) {
  if eq n,1:                                                    if (n === 1) {
    spit count                                                      return count;
  else:                                                         } else {
    spit collatz((eq n % 2, 0 ? n / 2 : 3 * n + 1),                 return collatz(n % 2 === 0 ? n / 2 : 
      count++)                                                      3 * n + 1, count+=1);
                                                                }
                                                            }
```