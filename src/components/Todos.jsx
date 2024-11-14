import React, { useEffect } from "react";
import ToDoCard from "./ToDoCard";
import { useState } from "react";
import Navber from "./Navber";

function Todos(){
    
// const[toDoInput, setToDoInput]=useState();
const[toDoArr,setToDoArr]=useState([]);
const[isInputOpen, setIsInputOpen]=useState(false)
const[inputvalue, setInputValue]=useState("");

const data= localStorage.getItem("currentUser");
    console.log(data);
    const currentUser=JSON.parse(data);
    const userId=currentUser.id;

//to do:add to to card
    function addToDoCard(){
        console.log(toDoArr);
        console.log(inputvalue)
        const newToDo={"userId":userId,
                        "title": inputvalue
                     }
        setToDoId((toDoId)=>toDoId+1);
        fetch(`http://localhost:3500/todos/`,{method:'POST' ,
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(newToDo)})
            
            //  .then((res)=>res.json())
            //  .then((data)=>console.log(data))
            //  .then ((data)=>props.setToDoArr((prev)=>prev.map(todo=> {if(todo.id==props.todo.id){todo.title=data.title}return todo})))
            //  .then(()=>setIsInputOpen(false))
    }
    function handleChange(){

    }
    

    useEffect(()=>{async function bringsUserToDos(userId){
        const response= await fetch(`http://localhost:3500/todos?userId=${userId}`);
        const toDoArrOfUser=await response.json();
        console.log(toDoArrOfUser);
        setToDoArr(toDoArrOfUser);
    }bringsUserToDos(userId);
},[])
    

    return(
        <>
            <h1>Todos</h1>
            <Navber/>
            <label>sort by:</label>
            <select>
                <option option value="number">number</option>
                <option option value="alphabet">alphabet</option>
                <option option value="done">done</option>
                <option option value="random">random</option>
            </select>
            {toDoArr.map((todo)=>{return <ToDoCard todo={todo} setToDoArr={setToDoArr} key={todo.id}/>
            })}
            <button onClick={()=>setIsInputOpen(true)}>add</button>
            {isInputOpen&& 
            <>
            <input onChange={(e)=>setInputValue(e.target.value)}></input>
            {/* <button onClick={()=>{addToDoCard(); setIsInputOpen(false)}}>submit</button> */}
            <button >submit</button>
            </>}
            
        </>
    )
}
export default Todos;
