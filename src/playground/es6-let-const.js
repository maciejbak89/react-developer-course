// with 'var', we can not only reassign, we can also REDEFINE variables, which might cause a lot of problems with long code
var nameVar = 'Maciek';
var nameVar = 'Bartek';
console.log('nameVar: ', nameVar);

let nameLet = 'Izabela';
// let nameLet = 'Martyna'; // with 'let', I CANNOT REDEFINE my variable
nameLet = 'Martyna'; // with 'let', I CAN REASSIGN my variable 
console.log('nameLet: ', nameLet);

const nameConst = 'Conrad';
// const nameConst = 'Marcin'; // with 'const', I CANNOT REDEFINE my variable
// nameConst = 'Marcin'; // with 'const', I CANNOT REASSIGN my variable 
console.log('nameConst: ', nameConst);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~

// SCOPING:
// 'var' based variables are function scoped = 
//         each variable is specific to function it was created in and CANNOT be accessed from outside of the function (in global parent scope)

// 'let' is also function scoped
// 'const' is also function scoped

// BUT, 'let' & 'const' are also BLOCK level scoped:
//         BLOCK scoped: bound to functions & bound to BLOCKS (for loop or if statement)  <--- NOT TRUE for 'var'

const fullName = 'Maciek Bak';
// let firstName; // can make the below calls work with pre-assigning 'let firstName' and deleting 'let' from block

if(fullName) {
    let firstName = fullName.split(' ')[0];
    console.log('firstName: ', firstName);
}
console.log('firstName: ', firstName); // works for 'var' | DOES NOT work for 'let' or 'const'
                                       // firstName is only accessible inside IF BLOCK for 'let' & 'const'