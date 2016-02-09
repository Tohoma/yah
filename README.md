# Yahscript      ( ͡° ͜ʖ ͡°) 
A language for CMSI 488

Yahscript is a small language that will compile to javascript.

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
a is 2          // integer
b is "what"     // string
c is yah        // true boolean
d is nah        // false boolean

e is ͡° ͜ʖ ͡°   //undefined
f is ಠ_ಠ       //null
g is :^)       //NaN

h is [1,2,3,4,5] //List
i is (1,2,3,4,5) // Tuple

```

### Assignment
Unlike Javascript we do not use var to declare assignment. Yahscript also supports constants and, unlike javascript, you cannot edit the properties of an object constant.

```
//Example of declaring and assigning to four variables
x is 1
y is 2 - 1
z is 3 - 2
u is 4 - 3

//Example use of constants
4evah dog is 2

dog is 3
//This would produce an error

```
### Strings
Yahscript supporst string concatenation and borrows some elements from swift.

```
stringOne is "sup"
stringTwo is "bruh"
banana is 10

stringThree is "sup \(StringTwo) here's \(banana) dollars"

print(stringThree)

// this would print "sup bruh here's 10 dollars"
```

### If and Else
Exactly the same as python's if and else statements

```
//if and else statements
if eq x,y,z,u:
    spit yah
else:
    spit nah
```


### Equivalency and other Relational operations
Equivalency in Yahscript takes the form of eq(var1, var2). Parentheses are not required. Other relational operations preform the same way. 


```
print(eq 2,2 )
// yah would be the output

print(eq 1,2 )
// nah would be the output

gt 10,11,11,1,1,1,1
lt 10,12,1,1,1,1,1
geq 11,11,1,1,1,1,1
leq 12,12,1,1,1,1,1

```
### Functions
Declaring a function is simple. See the examples below.
```
// Declaring a function named printParam
printParam is (x) -> print(x)

printParam("Hello")
// output is Hello

```
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
```

