import {ACTIONS} from './App'
export default function OperationButton({dispatch,operation}){
    return <div className='button'
    onClick={()=>dispatch({type:ACTIONS.ADD_OPERATION, payload:{operation}})}>
    {operation}</div>
}