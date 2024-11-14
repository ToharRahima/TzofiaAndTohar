import { useState } from "react";

function ToDoCard(props){
const[isInputOpen,setIsInputOpen]=useState(false);
const[inputvalue,setInputValue]=useState(props.todo.title);
    
function deleteToDo(){
        fetch(`http://localhost:3500/todos/${props.todo.id}`,{method:'DELETE'})
        .then (()=>props.setToDoArr((prev)=>prev.filter(todo=>todo.id!==props.todo.id)))
    }

function editToDo(){
         fetch(`http://localhost:3500/todos/${props.todo.id}`,{method:'PUT' ,
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ title: inputvalue })})
             .then((res)=>res.json())
             .then ((data)=>props.setToDoArr((prev)=>prev.map(todo=> {if(todo.id==props.todo.id){todo.title=data.title}return todo})))
            .then(()=>setIsInputOpen(false))
         }

    

    return(
        <div style={{border:'2px solid black'}}>
        <input type="checkbox"></input>
        <p>{props.todo.id}{props.todo.title}</p>        
        <button onClick={deleteToDo}>delete</button>
        <button onClick={()=>setIsInputOpen(true)}>edit</button>
        {isInputOpen&&<>
        <input onChange={(e)=>setInputValue(e.target.value)} value={inputvalue} ></input>
        <button onClick={editToDo}>change</button>
        </>}
        </div>
    )
}export default ToDoCard