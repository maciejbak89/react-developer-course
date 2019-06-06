console.log('App.js is running!');

const app = {
    title: 'Indecision App',
    subtitle: 'Put your life in the hands of a computer',
    options: []
};

const onFormSubmit = (e) => {
    e.preventDefault(); // stops full page refresh upon from submission | reference function inside form, do NOT call it with onFormSubmit()

    const option = e.target.elements.option.value.trim(); // accesses the string that user typed into form input and stores in 'option'

    if (option) { // if 'option' above (what user type into form) is '' (empty string), do not run this if statement
        app.options.push(option);
        e.target.elements.option.value = '';
        renderIndecisionApp();
    }
}

const onRemoveAll = () => {
    app.options = [];
    renderIndecisionApp();
}

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    alert(option);
}

const appRoot = document.getElementById('app');

const renderIndecisionApp = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options:' : 'No options'}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={onRemoveAll}>Remove All</button>
            <ol>
                {app.options.map((option) => <li key={option}>{option}</li>)}
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>
    );

    ReactDOM.render(template, appRoot);
}

renderIndecisionApp();







/*
const user = {
    name: 'Maciek',
    age: 29,
    location: 'Chicago'
};

const getLocation = (location) => {
    if (location) {
        return <p>Location: {location}</p>
    }
}

const templateTwo = (
    <div>
        <h1>{user.name ? user.name : 'Anonymous'}</h1> // Conditional rendering using terniary operator (rendering of 2 values - either/or)
        {(user.age && user.age >= 18) && <p>Age: {user.age}</p>} // Consitional rendering using && operator (rendering 1 value)
        {getLocation(user.location)} // Conditional rendering using function call defined above
    </div>
);
*/