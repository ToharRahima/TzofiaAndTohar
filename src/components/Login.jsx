<<<<<<< HEAD
import React from "react";

function Login(){

return(
    <>
    </>
)
}
export default Login
=======
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Route,Routes, useNavigate } from 'react-router-dom'


function Login() {
    const [isExist,setisExist]=useState(false)
    const [inputs, setInputs] = useState({});
    const [usersArr,setusersArr]=useState([]);
    const navigate= useNavigate();
    
    function SetInLS(user){
        let inArr=false;
        let logedUsers=JSON.parse(localStorage.getItem("logedUsers"));
        if(Array.isArray(logedUsers)){
            for(let i=0;i<logedUsers.length;i++){
                if(logedUsers[i].username==user.username){
                    inArr=true;
                }
            }
            if(!inArr){
                logedUsers.push(user); 
                localStorage.setItem("logedUsers", JSON.stringify(logedUsers)); 
                // localStorage.setItem("logedUsers",JSON.stringify(logedUsers.push(user)))
            }
        } else{
            localStorage.setItem("logedUsers",JSON.stringify([user]))
        }
    }

    useEffect(()=>{
        const fetchItem= async()=>{
            try{
                const res= await fetch("http://localhost:3500/users");
                const usersArr=await res.json();
                setusersArr(usersArr);
            } catch(err){
                console.log(err.stack)
            } 
        }
        (async ()=> await fetchItem())();
    },[])

    // useEffect(()=>{
    //     if(isExist){
    //         navigate('/home', { replace: true })
    //     }
    // },[])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

      function handleSubmit(event){
        let insert=false;
        event.preventDefault();
        for(let i=0;i<usersArr.length;i++){
            if((inputs.username==usersArr[i].username) && (inputs.password==usersArr[i].website)){
                SetInLS(usersArr[i])
                localStorage.setItem("currentUser",JSON.stringify(usersArr[i]))
                alert("hi "+ inputs.username )
                setisExist(true)
                insert=true
                navigate('/home', { replace: true })
                // navigete("/home")
            }
                
        }
        if(insert!==true){
            setisExist(false)
            alert("user dose not exist");
        }
    }

    return (
        <>
            <h1>LogIn</h1>
            <form>
                <label>Enter your username:<br/>
                    <input
                        className={inputs.username === "" || inputs.username == null ? 'empty' : ''}
                        type="text"
                        name="username"
                        value={inputs.username || ""}
                        onChange={handleChange}
                        required
                        // minlength="2"
                        // maxlength="15"
                    />
                </label>
                <br></br>
                <label>Enter your password:<br/>
                    <input
                        className={inputs.password === "" || inputs.password == null ? 'empty' : ''}
                        type="password"
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                        required
                        // minlength="2"
                        // maxlength="15"
                    />
                </label>
                <br></br>
                {isExist==false && <p style={{color:"red"}}>error:the user dose not exist</p>}
                <p>dose not have an account? press {<Link to="/Register">here</Link>}</p>
                <input type="submit" onClick={handleSubmit}/>

            </form>
        </>
    )
}
export default Login;
>>>>>>> 8f1ffb165ffa48c516f798962200ba262afaf64a
