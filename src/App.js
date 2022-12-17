import React, {useReducer} from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
export const ACTIONS = {
  ADD_DIGIT:'add-digit',
  ADD_OPERATION:'add-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate'
}
let operations = ['+','-','/','*']
function reducer(state,{type,payload}){
  let lastElement = state.number.length-1
  switch(type){
    case ACTIONS.ADD_DIGIT:
      let array
      array = state.number.match(/[^\d()]+|[\d.]+/g); //the last number can't have two dots
      if(payload.digit==='.' && array[array.length-1].indexOf('.')>-1) return state
      if((state.number[lastElement]==='.' || operations.includes(state.number[lastElement])) 
      && payload.digit==='.') return state
      if(state.number[lastElement]==='='){
        return {
          ...state,
          number:payload.digit
        }
      }
      if(payload.digit==='0' && state.number==='0') return state
      if(payload.digit==='.' && state.number==='.') return state
      if(state.number==='0'){
        return {
          ...state,
          number:payload.digit
        }
      } else {
        return {
          ...state,
          number:`${state.number}${payload.digit}`
        }
      }
    case ACTIONS.ADD_OPERATION:
      if(state.number[lastElement]==='='){
        return {
          ...state,
          number:state.sum+payload.operation
        }
      }
      if(state.number[lastElement]==='-' && payload.operation==='-') return state
      if(state.number[state.number.length-2]!=='-' && state.number[lastElement]==='-') return state
      if(operations.includes(state.number[lastElement])){
        if(payload.operation!=='-'){
          return {
            ...state,
            number:state.number.slice(0,lastElement)+payload.operation
          }
        } else {
          return {
            ...state,
            number:state.number+payload.operation
          }
        }
      }
      return {
        ...state, 
        number:`${state.number}${payload.operation}`
      }
    case ACTIONS.CLEAR:
      return {
        sum:'0',
        number:'0'
      }
    case ACTIONS.DELETE_DIGIT:
      if(state.number.length>1){
        return {
          ...state,
          number:state.number.slice(0,state.number.length-1)}
      } else {
        return {
          ...state,
          number:'0'
        }
      }
    case ACTIONS.EVALUATE:
      if(operations.includes(state.number[lastElement])
      || state.number[lastElement]==='=') return state
      return {
        number:state.number+'=',
        sum:eval(state.number)
      }
  }
}
function App() {
  const [state,dispatch] = useReducer(reducer,{number:'0',sum:'0'})
  return (
    <div className="container">
      <div className="display">
        <div className="expression">{state.number}</div>
        <div className="sum">{state.sum}</div>
      </div>
      <div className="buttons">
        <div onClick={()=>dispatch({type:ACTIONS.CLEAR})} className='button ac'>AC</div>
        <div onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}className='button'>C</div>
        <OperationButton operation='/' dispatch={dispatch}/>
        <OperationButton operation='*' dispatch={dispatch}/>
        <DigitButton digit='7' dispatch={dispatch}/>
        <DigitButton digit='8' dispatch={dispatch}/>
        <DigitButton digit='9' dispatch={dispatch}/>
        <OperationButton operation='-' dispatch={dispatch}/>
        <DigitButton digit='4' dispatch={dispatch}/>
        <DigitButton digit='5' dispatch={dispatch}/>
        <DigitButton digit='6' dispatch={dispatch}/>
        <OperationButton operation='+' dispatch={dispatch}/>
        <DigitButton digit='1' dispatch={dispatch}/>
        <DigitButton digit='2' dispatch={dispatch}/>
        <DigitButton digit='3' dispatch={dispatch}/>
        <div className='button equal' onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</div>
        <DigitButton digit='0' dispatch={dispatch}/>
        <DigitButton digit='.' dispatch={dispatch}/>
      </div>
    </div>
  );
}

export default App;
