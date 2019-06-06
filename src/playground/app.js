class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: []
        };
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options'); // reads in 'options' JSON string array from localStorage (changed inside componentDidUpdate) into 'json' variable
            const options = JSON.parse(json); // parses that 'json' variable into JavaScript array and stores in 'options' variable

            if (options) {
                this.setState(() => ({ options }));
            }
        } catch(e) {
            // Do nothing at all => fall back to empty array which is the default value
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json); // saves JSON string representation of this.state.options array to localStorage every time a new option is added (length changes)
        }
    }
    componentWillUnmount() {
        console.log('componentWillUnmount!');
    }
    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }
    handleDeleteOption(option) {
        this.setState((prevState) => ({
            options: prevState.options.filter((item) =>  item != option)
        }));
    }
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }
    handleAddOption(option) { // The purpose of this method in the parent component is to return error messages to the child component if the inputs are invalid and add options to the options array in the parent (indecision ) state object in case of valid inputs.
        if (!option) {
            return 'Enter valid value to add item.';
        } else if (this.state.options.includes(option)) {
            return 'This option already exists.';
        }

        this.setState((prevState) => ({ 
            options: prevState.options.concat(option) 
        }));
    }
    render() {
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header subtitle={subtitle} />
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options} 
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        )
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
}

Header.defaultProps = {
    title: 'Indecision'
};

const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    );
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button> 
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            {
                props.options.map((option) => (
                    <Option 
                        key={option}
                        optionText={option} 
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))
            }
        </div>
    );
}

const Option = (props) => { // in function below, if (e) wasn't used, and instead we said 'onClick={props.handleDeleteOption},
                            // we would be passing the whole handleDeleteOption EVENT up. We only want to pass up the text in
                            // 'props.optionText', so need to structure this call with arrow function inside the onClick call
                            // and pass up the 'e' (which is the event) which executes to props.handleDeleteOption(props.optionText)
                            // passing up the 'props.optionText', which is the only thing we want to pass. Then, up top, we can 
                            // work with the 'props.optionText' that we just passed up, and filter that wrt the 'options' array in global state
    return (
        <div>
            {props.optionText}
            <button 
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText);
                }}
            >
                Remove
            </button>
        </div>
    );
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleAddOption(e) { // handleAddOption method in the child AddOptions component generates the value for 'option' and passes it to the parent component through the method this.props.handleAddOption(option)
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option); // passes 'option' up to the parent handleAddOption function up top 
                                                        // and error returns if option is empty string or already exists in state. 
                                                        // If neither of those conditions is true, then option gets added to state, 
                                                        // and 'error' here returns 'undefined'. Therefore, this.state.error remains 
                                                        // undefined and does NOT print inside of <div>

                                                    // Need to run these two separate functions because each one handles their
                                                    // own state -> here, the 'error state'; up top, the 'global state' which 
                                                    // checks 'option' against global state for errors & if none, adds to state

                                                    // We can update a parent component from a child component by calling a function from a parent component as props to a child component and using the data fetched from the child component as an argument for the parent function being called as props.
        this.setState(() => ({ error }));
        if (!error) {
            e.target.elements.option.value = '';
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));