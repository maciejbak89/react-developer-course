import React from 'react';

import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';

export default class IndecisionApp extends React.Component {
    state = {
        options: []
    }
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };
    handleDeleteOption = (option) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((item) =>  item != option)
        }));
    };
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    };
    handleAddOption = (option) => { // The purpose of this method in the parent component is to return error messages to the child component if the inputs are invalid and add options to the options array in the parent (indecision ) state object in case of valid inputs.
        if (!option) {
            return 'Enter valid value to add item.';
        } else if (this.state.options.includes(option)) {
            return 'This option already exists.';
        }

        this.setState((prevState) => ({ 
            options: prevState.options.concat(option) 
        }));
    };
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
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json); // saves JSON string representation of this.state.options array to localStorage every time a new option is added (length changes)
        }
    };
    componentWillUnmount() {
        console.log('componentWillUnmount!');
    };
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