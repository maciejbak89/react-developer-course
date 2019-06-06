import React from 'react';

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

export default Option;