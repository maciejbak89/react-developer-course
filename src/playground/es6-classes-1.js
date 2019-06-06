class Person {
    constructor(name = 'Anonymous', age = 0) { //default value if 'name' is not defined in new instance below
        this.name = name; // inside Class methods, 'this' refers to the Class instance
        this.age = age;
    }
    getGreeting() {
        return `Hi, my name is ${this.name}!`;
    }
    getDescription() {
        return `${this.name} is ${this.age} year(s) old.`;
    }
}

class Student extends Person { // subclass of Person
    constructor(name, age, major) {
        super(name, age); // accessing constructor properties of parent Person class -> passing same arguments, with defaults automatically transferring
        this.major = major;
    }
    hasMajor() {
        return !!this.major; // always returns Boolean if applied to string (or empty '')
    }
    getDescription() { // override above getDescription method, adding new student features to it
        let description = super.getDescription();

        if (this.hasMajor()) {
            description += ` His major is ${this.major}.`;
        }
        return description;
    }
}

class Traveler extends Person {
    constructor(name, age, homeLocation) {
        super(name, age);
        this.homeLocation = homeLocation;
    }
    getGreeting() {
        let locationGreeting = super.getGreeting();

        if (this.homeLocation) {
            locationGreeting += ` I'm visiting from ${this.homeLocation}.`;
        }
        return locationGreeting;
    }
}

const me = new Person('Maciek Bak', 29);
console.log(me.getDescription());

const anon = new Person();
console.log(anon.getDescription());

const meStudent = new Student('Maciek Bak', 29, 'Civil Engineering');
console.log(meStudent.getDescription());

const anonStudent = new Student();
console.log(anonStudent.getDescription());

const meTraveler = new Traveler('Maciek Bak', 29, 'Chicago');
console.log(meTraveler.getGreeting());

const anonTraveler = new Traveler();
console.log(anonTraveler.getGreeting());