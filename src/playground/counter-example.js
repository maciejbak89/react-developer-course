class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            count: 0
        };
    }
    componentDidMount() {
        let count = localStorage.getItem('count'); // 'count' will be a string here (localStorage only stores strings)
        count = parseInt(count, 10); // parse 'count' from string to a number

        if (!isNaN(count)) {
            this.setState(() => ({ count }));
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
            localStorage.setItem('count', this.state.count);
        }
    }
    handleAddOne() {
        this.setState((prevState) => {
            return {
                count : prevState.count + 1
            };
        });
    };
    handleMinusOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            }
        });
    };
    handleReset() {
        this.setState(() => {
            return {
                count: 0
            }
        });
    };
    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        )
    }
}

ReactDOM.render(<Counter />, document.getElementById('app'));


// OLD CODE without using React.Component:

// let count = 0;
// const addOne = () => {
//     count++; // JSX does NOT have built in data-binding -> JSX will render 'HTML' to screen before any of the functional logic here runs
//     console.log('addOne');
//     renderCounterApp(); // re-renders JSX in DOM
// }
// const minusOne = () => {
//     count--;
//     console.log('minusOne');
//     renderCounterApp(); // re-renders JSX in DOM
// }
// const reset = () => {
//     count = 0;
//     console.log('reset')
//     renderCounterApp(); // re-renders JSX in DOM
// }

// const appRoot = document.getElementById('app');

// const renderCounterApp = () => { // renders JSX in the DOM on call of renderCounterApp() (which is called after every onClick event)
//     const templateTwo = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={addOne}>+1</button>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={reset}>Reset</button>
//         </div>
//     );

//     ReactDOM.render(templateTwo, appRoot);
// }

// renderCounterApp();