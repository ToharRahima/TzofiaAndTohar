import React from "react";
import Navber from "./Navber";

function Home() {
    const currentser=JSON.parse(localStorage.getItem("currentUser"));
    let name= currentser.name;
    return (
        <>
            <h1>Home</h1>
            <Navber />
            <br/>
            <h2>hello {name}!</h2>
            

        </>
    )
}
export default Home;
