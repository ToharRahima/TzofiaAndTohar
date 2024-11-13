import React from "react";
import { useNavigate } from "react-router-dom";
function Navber(){

    const navigate=useNavigate();

    const todos=()=>{
        navigate("/todos")
    }
    const info=()=>{
        navigate("/info")
    }
    const posts=()=>{
        navigate("/posts")
    }
    const albums=()=>{
        navigate("/albums")
    }
    const logout=()=>{
        localStorage.setItem("currentUser",JSON.stringify(null));
        navigate('/', { replace: true })
        history.pushState(null, null, "/");
        window.onpopstate = function(event) {
          history.go(1);}
    }

    return(
        <>
            <button onClick={()=>todos()}> todos </button>
            <button onClick={()=>info()}> info </button>
            <button onClick={()=>posts()}> posts </button>
            <button onClick={()=>albums()}> albums </button>
            <button onClick={()=>logout()}> logout </button>
        </>
    )
}
export default Navber;