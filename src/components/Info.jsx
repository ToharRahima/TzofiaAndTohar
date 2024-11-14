import React from "react";
import Navber from "./Navber";
function Info(){

    const currentser=JSON.parse(localStorage.getItem("currentUser"));

    return(
        <div>
            <h1>Info</h1>
            <Navber/>
            <div style={{border:"2px solid black", margin:"10px", padding:"5px"}}>
            <p>username:{currentser.username}</p>
            <p>email:{currentser.email}</p>
            <p>phone:{currentser.phone}</p>
            </div>
        </div>
    )
}
export default Info;
