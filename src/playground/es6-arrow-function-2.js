// arguments object - no longer bound with arrow functions
// if need to access 'arguments', use ES5 syntax for functions

const addES5 = function(a,b) {
    console.log(arguments); // prints out ALL ARGUMENTS passed to a function, regardless what's defined in arguments list
    return a+b;
}
console.log(addES5(55, 1, 1000));

const addArrow = (a,b) => {
    // console.log(arguments); // no longer have access to 'arguments' inside arrow functions
    return a+b;
}
console.log(addArrow(55, 1, 1000));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// 'this' keyword - no longer bound with arrow functions

// ES5:
const userES5 = {
    name: 'Maciek',
    cities: ['Chicago', 'New York', 'San Diego'],
    printPlacesLived: function() {
        console.log(this.name); // this.name accessible here
        console.log(this.cities);

        this.cities.forEach(function(city) {
            console.log(this.name + ' has lived in ' + city); // this.name NOT accessible here in ES5
        });
    }
}
// userES5.printPlacesLived();

// ES6:
const userES6 = {
    name: 'Maciek',
    cities: ['Chicago', 'New York', 'San Diego'],
    printPlacesLived: function() { // THIS METHOD SHOULD STILL USE ES5 SYNTAX -- OTHERWISE, ARROW FUNCTION HERE WOULD NOT BIND 
                                   // ITS OWN 'THIS' VALUE -> 'this' would no longer equal to userES6 object. Instead, it would
                                   // go up to the parent scope which is the global scope, where 'this' is indeed undefined.

    // printPlacesLived() { <-- valid ES6 syntax for the above method

        return this.cities.map((city) => this.name + ' has lived in ' + city + '!');

        // this.cities.forEach((city) => {
        //     console.log(this.name + ' has lived in ' + city); // this.name accessible here in ES6 because we DON'T rebind 'this' through arrow function
        // });
    }
}
console.log(userES6.printPlacesLived());


const multiplier = {
    numbers: [1,2,3,4,5,6,7,8,9,10],
    myltiplyBy: 5,
    multiply() {
        return this.numbers.map((number) => number * this.myltiplyBy);
    }
}
console.log(multiplier.multiply());