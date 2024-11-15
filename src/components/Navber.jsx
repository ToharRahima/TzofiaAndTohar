import React from "react";
import { useNavigate } from "react-router-dom";
function Navber(){

    const currentUser=JSON.parse(localStorage.getItem("currentUser"))

    const navigate=useNavigate();

    const todos=()=>{
        navigate(`/${currentUser.id}/todos`)
    }
    const info=()=>{
        navigate(`/${currentUser.id}/info`)
    }
    const posts=()=>{
        navigate(`/${currentUser.id}/posts`)
    }
    const albums=()=>{
        navigate(`/${currentUser.id}/albums`)
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