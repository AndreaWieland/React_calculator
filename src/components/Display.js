import React from 'react';

function Display(props){
    return(
        <div className="output-display">
            <h2>{props.value}</h2>
        </div>
    )
}

export default Display