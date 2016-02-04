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


### Equivalency and other Relational operations
Equivalency in Yahscript takes the form of eq(var1, var2). Paranthesis are not required. Other relational operations preform the same way. 


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



