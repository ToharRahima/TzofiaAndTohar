import React from "react";
import { useState } from "react";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Register() {

    const [inputs, setInputs] = useState({});
    const [currentError, setCurrentError] = useState("");
    const navigate= useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => {
            console.log({ ...prev, [e.target.name]: e.target.value })
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(verifypassword(inputs)){
            checkIfUserExist(inputs);
        }
    }

    async function checkIfUserExist() {
        try {
            const res = await fetch("http://localhost:3500/users");
            const usersArr = await res.json()
            console.log(usersArr);
            const userexists = usersArr.some(user => user.username === inputs.username)
            if (userexists) { throw "user allready exists" }
            else {
                setCurrentError("")
                fetch('http://localhost:3500/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        username: inputs.username,
                        password: inputs.password
                    })
                })
             navigate('/moreaboutuser')   
            }

        } catch (error) {
            console.log(error)
            setCurrentError(error)
        }
    }

    const verifypassword = (input) => {
        if (input.password !== input.verifypassword) {
            setCurrentError("different passwords")
        }else return true;
    }

    return (
        <>
            <h1>Register</h1>
            <form>
                <label>user name:
                    <input type="text" name="username" onChange={handleChange}></input>
                </label>
                <label>password:
                    <input type="text" name="password" onChange={handleChange}></input>
                </label>
                <label>verify password:
                    <input type="text" name="verifypassword" onChange={handleChange}></input>
                </label>
                <input type="submit" onClick={handleSubmit}></input>
            </form>
            <p style={{color:"red"}}>{currentError}</p>
        </>
    )
}
export default Register