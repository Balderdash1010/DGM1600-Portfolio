/* Variables - containers that store values
   Multi-line comment here */

var name; // a declared variable, but not initialized and it's in the global scope (BAD)

let foo; // a declared variable that can be changed

//const bar; // a declared cariable that cannot be changed - short for 'constant'

const ANSWER = 42; // const is declared and initialized with the value 42

// Strings

let string1 = "Hello World!";  // preferred way

let string2 = new String("Hello World!");  // constructor

// Number

let myNum = 29038424;

let myNum2 = 345.89;

"1" == 1; // this statement is true because of type coercion and loose equality checking
"1" === 1; // false because this is strict equality checking

// Boolean

let myBool = false;

// Array

let myArray = []; // this is an empty array

//               0     1       2       3      4
let my Array2 = [42, "Bob", myBool, ANSWER, true];

let secondElement = myArray2[1]; // the second position is at index #1

myArray2.push("Tyler"); // added an element to the end of myArray2

myArray2.unshift("Hello World!");

let myLongString = "32408usfjalieriweur938u425ksdjfowiur84uwrlwshdjfo8wuroiwejr4eadfwefds"; // just an array of characters

myLongString.length;

//object

let minObject = {};

let myCar = {
    make: "Ford",
    color: "Matte Black",
    year: "2022",
    model: "Raptor R"
};

myCar.numDoors = 4;

const anotherObject = {
    wordz: ["foo", "bar", "baz"],
    car: {
        make: "Ford",
        model: "Bronco"
    },
    awesomeness: true
};

// Functions

function myFunction() {
    retun "My greeting to you...";
}

function sumTwoThings(one, two) {
    // watch out for data type issues here!
    return one + two; // if numbers, will add them. If strings, will concatenate.
}

// Arrow Functions

element => console.log(element) // implicit 'return' when only one line for the function
element => {
    let foo = 'bar' + 'baxz'
    return.console.log(element) // explicit 'return'becuase of multiple lines
}
(num1, num2) => num1 + num2

// basic suntax is num => 'The Num'

// a higher order function is a function that accepts another function as a parameter.
// filter, map and reduce are the most popular, but forEach, every, find, and some are also HOFs

const theFunction = () => {
    //multiple lines use curly braces and 'return' keyword
    return "I am awesome";
};

// Filter method example. Filter returns an array of all elements that 'pass the test'
const pilots = [
    {
        is:2,
        name: "Wedge Antilles",
        faction: "Rebels"
    },
    {
        id: 8,
        name: "Ciena Ree",
        faction: "Empire"
    },
    {
        id: 40,
        name: "Iden Versio",
        faction: "Empire"
    },
    {
        id: 66,
        name: "Thane Kyrell",
        faction: "Rebels"
    }
];

const rebels = pilots.filter((pilot) => pilot.faction === "Rebels");
const empire = pilots.filter((pilot) => {
    return pilot.faction === "Empire";
})

// Array Hler method 'map' example

let filmURLs = [
    "https://swapi.co/api/films/",
    "https://swapi.co/api/films/5/",
    "https://swapi.co/api/films/4/this one is longer... even longer",
    "https://swapi.co/api/films/6/",
    "https: ",
    "https://swapi.co/api/films/1/",
]

const filmLenghts = filmURLs.map((filmURL) => filmURL.length);

const filmPlusMore = filmURLs.map((filmURL) => {
    let fimObj = {
        index: filmURL,
        date: Date.now()
    };
    return filmObj;
})

const pilotNames = pilots.map((pilot) => pilot.name);