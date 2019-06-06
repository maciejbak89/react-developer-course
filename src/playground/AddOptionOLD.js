import React from 'react';

export default class AddOption extends React.Component {
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