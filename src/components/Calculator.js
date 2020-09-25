import React from 'react';
import Display from './Display.js';
import Keypad from './Keypad.js';


class Calculator extends React.Component{
    constructor(){
        super();
        this.state = {
            value: '',
            displayIsResult: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(val){
        const prevDisplay = this.state.value;
        let newDisplay = '';
        let newDisplayIsResult = false;

        switch(val){
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '.':
                    if(this.state.displayIsResult || prevDisplay === "ERR"){
                        newDisplay = val;
                    }else{
                        newDisplay = prevDisplay + val;
                    }
                break;
            case '*': 
            case '-':
            case '+':
            case '/': 
                if(prevDisplay !== "ERR"){
                    newDisplay = prevDisplay + val;
                }
                break;
            case 'del':
                newDisplay = prevDisplay.slice(0, prevDisplay.length-1);
                break;
            case 'ac':
                newDisplay = '';
                break;
            case '=':
                try {
                    newDisplay = eval(prevDisplay).toString(); 
                } catch (e) {
                    if (e instanceof SyntaxError) {
                        newDisplay = "ERR"
                    }
                }
                if(newDisplay.length > 10){
                    newDisplay = parseFloat(newDisplay).toExponential(2).toString();
                }
                newDisplayIsResult = true;
                break;
            default:
                console.log('some kinda error');
        }
        if(newDisplay.length <= 10){
            this.setState({value: newDisplay, displayIsResult: newDisplayIsResult});
        }        
    }

    handleKeyPress(event){
        event.stopPropagation();
        const keyCodes = [
            {id:49,value:'1'},
            {id:50,value:'2'},
            {id:51,value:'3'},
            {id:52,value:'4'},
            {id:53,value:'5'},
            {id:54,value:'6'},
            {id:55,value:'7'},
            {id:56,value:'8'},
            {id:57,value:'9'},
            {id:48,value:'0'},
            {id:190,value:'.'},
            {id:189,value:'-'},
            {id:191,value:'/'},
            {id:187,value:'='},
            {id:13,value:'='},
            {id:67,value:'ac'},
            {id:8,value:'del'}
        ]
        const shiftKeyCodes = [
            {id:56,value:'*'},
            {id:187,value:'+'},
            {id:67,value:'ac'}
        ]

        if(event.shiftKey && shiftKeyCodes.some(code => code.id === event.keyCode)){
            this.handleChange(shiftKeyCodes.filter(code => {
                return code.id === event.keyCode
            })[0].value);
        } else if(!event.shiftKey && keyCodes.some(code => code.id === event.keyCode)){
            this.handleChange(keyCodes.filter(code => {
                return code.id === event.keyCode
            })[0].value);
        }
        event.stopImmediatePropagation();

        return        
    }

    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyPress);
    }

    render(){
        return(
            <main className='calculator'>
                <Display 
                    value={this.state.value}
                />
                <Keypad 
                    handleChange={this.handleChange}
                />
    
            </main>
        )
    }
    
}

export default Calculator