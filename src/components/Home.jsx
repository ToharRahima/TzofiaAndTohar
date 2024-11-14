import React, { useState } from "react";
import Navber from "./Navber";
import { useEffect } from "react";
function Home() {

const[userInfo, setUserInfo]=useState ();  

useEffect( () => {
    async function bringsuserinfo(){
const response=await fetch('http://localhost:3500/users');
const usersArr=await response.json();
setUserInfo(usersArr)
}

bringsuserinfo();
} ,[])
    
return (
        <>
            <h1>Home</h1>
            <Navber />
            <div></div>
        </>
    )
}
export default Home;
