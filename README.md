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
Functions are defined by an optional list of parameters in parentheses, an arrow, and the function body.

```
// Declaring a function named printParam
printParam is (x) -> spit x

printParam("Hello")
// output is Hello

```

Functions may also have default values for arguments, for missing arguments.

```
cat is (weight, personality is "cuddly") ->
  spit "Free cats available, weighing \{container} pounds,  with \{personality} personalities"

```


###Scoping
Scpoing in Yahscript is similar to python's LEGB rule.
Local -> Enclosed -> Global -> Built In
Yahscript first searches for a variable in the local namespace. If the variable cannot be found in the local namespace, Yahscirpt continues the search in the namespace of the enclosing function. If not found in the enclosing function, or if there is no enclosing function, Yahscript looks in the global namespace followed by the namespace of built in / reserved names.

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
Yahscript allows for skipping namespace levels by using the reserved word noscope. In the below example, the output would be:
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