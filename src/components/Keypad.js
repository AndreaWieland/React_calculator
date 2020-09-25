import React from 'react';
import keys from './keys.js';

function Keypad(props){
    const buttons = keys.map(k =>{
        return(
            <div  
                key={k.id} 
                className={'button ' + k.className} 
                datavalue={k.val}
                onClick={(event)=>{
                    props.handleChange(event.target.getAttribute("datavalue"))
                    }
                }
            >{k.text}</div>
        )
    });
    return(
        <div className='keypad'>
            {buttons}
        </div>
    )
}

export default Keypad