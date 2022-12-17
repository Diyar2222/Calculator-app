import {ACTIONS} from './App'
export default function digitButton({dispatch,digit}){
    return <div className={`button ${digit=='0' ? 'zero' : ''}`}
    onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT, payload:{digit}})}>
    {digit}</div>
}