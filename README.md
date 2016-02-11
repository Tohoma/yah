# YahScript 

<img src="https://github.com/Tohoma/yahscript/blob/master/yahLogo.png" width="200">



A language for CMSI 488

YahScript is a statically typed programming language with all of the dynamic benefits. It allows for coding how you want, with multiple different options to accomplish what you want. Prefer using
&& instead of and, or ^ instead of **? We got your back. Taking a dash of Javascript, a sprinkle of Python, a splash of CoffeeScript and compiling into Javascript gives you the glorious and infamous
YahScript.
### Features

#### Comments
A single line comment is created with two foward slash characters. Multiline comments are started with two foward slashes followed by a backslash and ends with two back slashes followed by a single foward slash. 

```
//This is a single line comment

//\
This is a 
multiline comment

Still multiline

Multiline comment ends below. 
\\/

```
### Primitive and Reference types

```
a is 2                                                      var a = 2;
b is "what"                                                 var b = "what";
c is yah                                                    var c = true;
d is nah                                                    var d = false;

e is ͡° ͜ʖ ͡°                                               
f is ಠ_ಠ         
g is :^)         

h is [1,2,3,4,5] // List                                    var h = [1,2,3,4,5];
i is (1,2,3,4,5) // Tuple                                   var i = ;

```

### Assignment
Unlike Javascript we do not use var to declare assignment. YahScript also supports constants and, unlike javascript, you cannot edit the properties of an object constant.

```
// Example of declaring and assigning to four variables
x is 1                                                      var x = 1;
y is 2 - x                                                  var y = 2 - x;
z is 3 - y                                                  var z = 3 - y;
u is 4 - z                                                  var u = 4 - z;

// Example use of constants
4evah dog is 2                                              const dog = 2;

dog is 3
// This would produce an error

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
                                                                
print(stringThree)                                          console.log(stringThree);       

// You can perform operations on  strings

//Adding strings creates a new string with the string on the right appended to the string on the left

print("Hello " + "World") 

//Multiplying a string repeats the string
print("Hello " * 3)
// This would print "Hello Hello Hello "

```

### If and Else
Exactly the same as python's if and else statements

```
if eq x,y,z,u:                                              if (x === y && y === z && z === u) {
    spit yah                                                    return true;         // lolz sorry Toal ;)
else:                                                       else {
    spit nah                                                    return false;
                                                            } 
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

for each fruit in basket:                                   
  print "stop eating my \(fruit)"

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
cat is (weight, personality is "cuddly") ->                 var cat = function (weight, personality) {
  spit "Free cats available,                                    personality = "cuddly";
      weighing \{weight} pounds,                                return "Free cats available, 
         with \{personality} personalities"                         weighing " + weight + " pounds,
                                                                    with " + personality + " personalities";
                                                            }

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
i is 5

bar is () ->                            
    print i

foo is () ->
    i is 10
    print i

bar()
foo()
print i

```
YahScript allows for skipping namespace levels by using the reserved word noscope. In the below example, the output would be:
5
15

```
i is 5

apple is () ->
    noscope i
    i is 15
    print i

print i
apple()

```

By calling noscope multiple times, multiple namespace levels can be skipped.

```
k is 10

sup is () ->
    k is 20
    bruh is () ->
        noscope noscope k
        k is 99
        print k
    bruh()

print k
sup()
print k
```
This would output: 10 99 99

### Code examples
Prime Function
```

prime is (n) ->
    for i in (0...n/2):
        if eq n % i, 0:
            spit nah
        i++
    spit yah
```
Callback function usage
```
sample is (functionvar) ->
  functionvar("dog")

sample((x) -> print(x))

// The output would be "dog"
