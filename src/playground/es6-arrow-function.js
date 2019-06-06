const square = function(x) {
    return x*x;
}
console.log(square(4));

// const squareArrow = (x) => {
//     return x*x;
// }

const squareArrow = (x) => x*x; // when only returning one thing
console.log(squareArrow(8));



const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
}
console.log(getFirstName('Maciek Bak'));

const getFirstNameShort = (fullName) => fullName.split(' ')[0];
console.log(getFirstNameShort('Bartek Bak'));