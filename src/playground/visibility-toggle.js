class VisibilityToggle extends React.Component {
    constructor(props) {
        super(props);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.state = {
            visibility: false
        };
    }
    toggleVisibility() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            }
        });
    }
    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.toggleVisibility}>{this.state.visibility ? 'Hide Details' : 'Show Details'}</button>
                {this.state.visibility && <p>Hey, these are some details you can now see!</p>}
            </div>
        )
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));



// OLD CODE without using React.Component:

// const app = {
//     title: 'Visibility Toggle',
//     text: 'Hey, these are some details you can now see!'
// }

// let visibility = false;

// const toggleVisibility = () => {
//     visibility = !visibility;
//     render();
// }

// const render = () => {
//     const jsx = (
//         <div>
//             <h1>{app.title}</h1>
//             <button onClick={toggleVisibility}>{visibility ? 'Hide Details' : 'Show Details'}</button>
//             {visibility && <p>{app.text}</p>}
//         </div>
//     );
    
//     ReactDOM.render(jsx, document.getElementById('app'));
// }
// render();