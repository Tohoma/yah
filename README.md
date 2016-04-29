# yah

<img src="https://github.com/Tohoma/yah/blob/master/images/yahLogo.png" width="200"><br>
<a href="https://travis-ci.org/Tohoma/yah?branch=master"><img src="https://travis-ci.org/Tohoma/yah.svg?branch=master" alt="Build Status"></a>
<a href='https://coveralls.io/github/Tohoma/yah?branch=master'><img src='https://coveralls.io/repos/github/Tohoma/yah/badge.svg?branch=master' alt='Coverage Status' /></a> 
<a href="https://david-dm.org/Tohoma/yah"><img src="https://david-dm.org/Tohoma/yah.svg"></a>


A language for CMSI 488

yah is a statically typed programming language with all of the dynamic benefits. It allows for versatile coding how you want, in the way that you you want. Prefer using `&&` instead of `and`? We got your back. Taking a dash of swift's type inference with optional explicit assignments, a sprinkle of Python's classes and scoping, a splash of CoffeeScript terseness, and compiling into Javascript gives you the glorious and infamous yah. yaaaaaaaaah.

# List of Features

* Type inference
* First class functions
* Optional / default parameters
* String interpolation
* List comprehension
* No curly braces
* Multi expression relational operations
* Optional type specification
* Multiple operation styles
* Multi parameter relational operations

# Grammar

## Microsyntax

```
newline   -> \s* (\r*\n)+
letter    -> [a-zA-z]
digit     -> [0-9]
keyword   -> 'class' | 'new' | 'for' | 'in' | 'while' 
          | 'and' | 'or' | 'is' | 'be' | 'if' | 'else' 
          | 'eq' | 'neq' | 'gt' | 'lt' | 'geq' | 'leq'
          | 'not' | 'yah' | 'nah' |
          | 'spit' | 'nil' | 'undefined' | 'NaN'
          | 'int' | 'bool' | 'string' | 'float' | 'list'
          | 'tuple' | 'dict' | 'Class'
id        -> (letter | '_') (letter | digit | '_')*
intlit    -> digit+
floatlit  -> digit+ '.' digit+ ([Ee] [+-]? digit+)?
declareop -> 'is'
assignop  -> 'be'
boolop    -> 'and' | 'or' | '&&' | '||'
relop     -> '='   | '<' | '>' | '>=' | '<='
addop     -> '+'   | '-'
mulop     -> '*'   | '/' | '%' | '^'
prefixop  -> '-'   | 'not' | '!'
boollit   -> 'yah' | 'nah' | 'true' | 'false'
escape    -> [\\] [rnst'"\\]
char      -> [^\x00-\x1F'"\\] | escape
stringlit    -> ('"' char* '"') | (\x27 char* \x27)
undeflit  -> 'undefined'
nanlit    -> 'NaN'
nillit    -> 'nil'
comment   -> '//' [^\n]* newline
           | '//\' .*? '\\/'
```

## Macrosyntax

```
Program    -> Block
Block      -> (Stmt newline)*

Stmt       -> WhileStmt | ForStmt | ReturnStmt | Exp

WhileStmt  -> 'while' Exp ':' (newline Block | Exp)
ForStmt    -> 'for' ('each')? id 'in' ListLit ':' (newline Block | Exp)
            | 'times' int ':' (newline Block | Exp)

ReturnStmt -> ('return' | 'spit') Exp

Exp        -> VarDeclare | VarAssign | VarExp | TernaryExp | FunExp | ConditionExp | ClassExp

VarDeclare -> (id | TupLit) ('::' Type)? declareop Exp
            | (id | TupLit) '::' Type
VarAssign  -> VarExp assignop Exp
VarExp     -> id ( '.' Exp8 | '[' Exp3 ']' | (Args ('.' Exp8 | '[' Exp3 ']')) )*

Type       -> ('int' | 'string' | 'float' | 'bool' | 'list' | 'tuple' | 'dict') [?!]?

FunBlock   -> Exp | (newline Block)
FunExp     -> Args '(\s)? ->' FunBlock

ConditionExp -> 'if' Exp0 ':' newline Block (('else if' | 'elif') Exp0 ':' newline Block)* ('else:' newline Block)?
                | 'if' Exp0 ':' Exp

ClassExp   -> 'Class ->' newline (Exp newline)*

TernaryExp -> Exp0 ('if' Exp0 ( 'else' TernaryExp)?)? | Exp0 ('?' Exp0 ':' TernaryExp)?
Exp0       -> Exp1 ('or' | '||' Exp1)*
Exp1       -> Exp2 ('and' | '&&' Exp2)*
Exp2       -> Exp3 (relop Exp3)?
Exp3       -> Exp4 (('..' | '...') Exp4 ('by' Exp4)?)?
Exp4       -> Exp5 (addop Exp4)*
Exp5       -> Exp6 (mulop Exp5)*
Exp6       -> prefixop? Exp7
Exp7       -> Exp8 ('^' | '**' Exp8)?
Exp8       -> Exp9 ('.' Exp9 | '[' Exp3 ']' | Args)*
Exp9       -> intlit | floatlit | boollit | id | '(' Exp ')' | stringlit
            | undeflit | nanlit | nillit | ListLit | TupLit | DictLit

ExpList    -> newline? Exp (newline? ',' Exp)* newline?

Args       -> '(' ExpList ')'

ListLit    -> '[' ExpList | Comprehension ']'
TupLit     -> '(' ExpList ')'
DictLit    -> '{' BindList '}'
Bind       -> newline? id ':' Exp newline?
BindList   -> Bind (',' Bind)*

Comprehension -> TernaryExp 'for' ('each')? id 'in' Exp
```

# Features

### Primitive and Reference types
yah allows for many different ways to represent the same implementation. For instance, notice the two ways to describe 'undefined', 'nil', and 'NaN' below.

```
a is 2                                                      var a = 2;
b is "what"                                                 var b = "what";
c is yah                                                    var c = true;
d is nah                                                    var d = false;

e is ͡° ͜ʖ ͡°                                               var e = undefined;  
banana is undefined                                         var banana = undefined;                                
f is ಠ_ಠ                                                    var f = null;
apple is nil                                                var apple = null;
g is :^)                                                    var g = NaN;
orange is NaN                                               var orange = NaN;

h is [1,2,3,4,5] // Like Python, lists are mutable          var h = [1,2,3,4,5];
i is (1,2,3,4,5) // Tuples are immutable                    var i = [1,2,3,4,5];
j is {0:1, 2:3} // Dictionaries are mutable                 var j = {0:1, 2:3};


h[0] be 6        // This would result in [6,2,3,4,5]        h[0] = 6;
i[0] be 6        // This would cause a runtime error
j[2] be 5        // This would result in {0:5, 2:3}         j[2] = 5;

```

### Assignment
Unlike Javascript yah does not use var to declare assignments. yah uses type inference, however it also allows for explicit restrictions. yah also supports constants and, unlike javascript, you cannot edit the properties of an object constant. The keyword `swag` is placed before the variable declaration to indicate an object constant. Please see the code below for basic assignments, explicit restrictive assignments, and the use of object constants.

```
// Example of declaring and assigning to four variables
x is 1                                                      var x = 1;
y is 2 - x                                                  var y = 2 - x;
z is 3 - y                                                  var z = 3 - y;
u is 4 - z                                                  var u = 4 - z;

dog::int is 5                                                var dog = 5;
cat::String is "furry"                                       var cat = "furry";
cat be 10                                                   // Produces a compile-time error

// Example use of constants
swag dog is 2                                              const dog = 2;
dog be 3                                                   // Produces a compile-time error

```
### Strings
yah supports string concatenation and borrows some elements from swift.

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
greeting is "Hello " + "World"                             var greeting = "Hello " + "World";
greeting.uppercase()                                       greeting.toUpperCase()
print "Hello " * 3                                         console.log("Hello Hello Hello ");


```

### If, Else and Conditional Statements
If and Else can be written without parantheses or curly braces. If statements can also use the reserved word then to allow for a one-liner statement.

```
if eq x,y,z,u:                                              if (x === y && y === z && z === u) {
    spit yah                                                    return true;
else:                                                       } else {
    spit nah                                                    return false;
                                                            }

//Allows for both else if and elif

if gt 5,10:                                                  if (5 > 10) {
  print "amazing"                                             console.log("amazing");
elif gt 6,10:                                                else if (6 > 10) {
  print "still amazing"                                       console.log("still amazing");
else if gt 7,10:                                             else if (7 > 10) {
  print "still amazinger"                                     console.log("still amazinger");
else:                                                       } else {
  print "logical"                                             console.log("logical")
                                                            }

//one-liner
spit yah if eq x,y                                          if (x === y) return true;

eq x,y ? yah : nah                                          (x === y) ? true : false;

```

### Equivalency and other Relational operations
Equivalency in yah takes the form of `eq var1, var2, ..., vari`. Other relational operations preform the same way. 
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
yah provides multiple ways to perform a set of statements multiple times. there is a for loop, for each, while, and the much simpler times operator.

```
//All three iterations will output the same values

basket is ["banana", "orange", "grapefruit"]                 var basket = ["banana", "orange", "grapefruit"];

for each fruit in basket:                                   for each (var fruit in basket) {
  print "stop eating my \(fruit)"                               console.log("stop eating my " + fruit);
                                                            }

for i in (0 .. basket.length):                              for (var i = 0; i < basket.length; i++) {
  print "stop eating my \(basket[i])"                           console.log("stop eating my " + basket[i]);
                                                            }

times 3:                                                    for (var i = 0; i < 3; i++) {
  print "WAT"                                                   console.log("WAT");
                                                            }

times 3 suh:                                                for (var suh = 0; suh < 3; suh++) {
  print "stop eating my \(basket[suh])"                         console.log("stop eating my " + basket[suh]);
                                                            }
```

### Functions
Functions are defined by an optional list of parameters in parentheses, an arrow, and the function body.

```
// Declaring a function named printParam
printParam is (x) -> spit x                                 var printParam = function (x) {
                                                                return x;
                                                            }

print(printParam("Hello"))                                  console.log(printParam("Hello"));

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

//\
This is a 
multiline comment

Still multiline

Multiline comment ends below. 
\\/

```

### List Operations
Yah supports list operations, such as list comprehension, and slices. Two dots for exclusive, three dots for inclusive.

```

a is 0 .. 5    // [0,1,2,3,4]                             var a = [0, 1, 2, 3, 4];
b is 0 ... 5   // [0,1,2,3,4,5]                           var b = [0, 1, 2, 3, 4, 5];

c is 0 .. 4 by 2                                          var c = [];
// [0,2]                                                  for (var i = 0; i < 4; i++) {
                                                              if (i % 2 == 0) {
                                                                  c.push(i);
                                                              }
                                                          }

d is 0 ... 9 by 3                                         var d = [];
// [0,3,6,9]                                              for (var i = 0;  i <= 9; i++) {
                                                              if (i % 3 == 0) {
                                                                  d.push(i);
                                                              }
                                                          }

e is [x + 1 for x in 0 ... 9 by 3]                        var e = [];
// [1, 4, 7, 10]                                          for (var i = 0; i <= 9; i++) {
                                                              if (i % 3 == 0) {
                                                                  e.push(i + 1);
                                                              }
                                                          }

f is "potato"                                             var f = "potato";
g is f[0 .. 3]                                            var g = [];
                                                          for (var i = 0; i < 3; i++) {
                                                              g.push(f[i]);
                                                          }
                                                          g = g.join('');

```

### Scoping
Scoping in yah is similar to python's LEGB rule.
Local -> Enclosed -> Global -> Built In
yah first searches for a variable in the local namespace. If the variable cannot be found in the local namespace, yah continues the search in the namespace of the enclosing function. If not found in the enclosing function, or if there is no enclosing function, yah looks in the global namespace followed by the namespace of built in / reserved names.

The following code would output:
5
10
10

```
i is 5                                                      var i = 5;

bar is () ->                                                var bar = function () {
    print i                                                     console.log(i);
                                                            }

foo is () ->                                                var foo = function () {
    i be 10                                                     i = 10;
    print i                                                     console.log(i);
                                                            }

bar()                                                       bar();
foo()                                                       foo();
print i                                                     console.log(i);

```
yah allows for specifying the desired namespace using the keywords global and local. In the below example, the output would be:
5
7
15

```
i is 5                                                      var i = 5;

apple is () ->                                              var apple = function () {
    global i be 15                                                 i = 15;
    local i is 7                                                   console.log(i);
    print i                                                 }

print i                                                     console.log(i);
apple()                                                     apple();
print i                                                     console.log(i);

```

### Classes and Objects
Classes and objects behave like dictionaries.
```
Banana is Class ->                                          class Banana {
    color is yellow                                             constructor() {
    size is small                                                   this.color = "yellow";
                                                                    this.size = "small";
b is new Banana()                                               }
print(b.color)                                              }
                                                            var b = new Banana();
                                                            console.log(b.color)


```

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
                                                            });

```

Collatz
```                                                 
collatz is (n, count is 0) ->                               var collatz = function (n, count  = 0) {
  if eq n,1:                                                    if (n === 1) {
    spit count                                                      return count;
  else:                                                         } else {
    spit collatz((eq n % 2, 0 ? n / 2 : 3 * n + 1),                 return collatz(n % 2 === 0 ? n / 2 : 
      count++)                                                      3 * n + 1, count+=1);
                                                                }
                                                            }
```
