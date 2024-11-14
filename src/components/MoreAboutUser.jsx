import { Navigate, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
function MoreAboutUser(){
    const [inputs, setInputs] = useState({});
    const navigate= useNavigate();
   


   const handleChange = (e) => {
    setInputs((prev) => {
        console.log({ ...prev, [e.target.name]: e.target.value })
        return { ...prev, [e.target.name]: e.target.value }
    })}
    const data= localStorage.getItem("currentUser");
    console.log(data);
    const currentUser=JSON.parse(data);
    const userId=currentUser.id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data =await fetch(`http://localhost:3500/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "name": inputs.name,
                "email": inputs.email,
                "phone":inputs.phonenumber
                })
            });
            const user= await data.json();
            console.log(user)
            navigate('/home')
    
        
    }

    return(
        <>
        <h1>MoreAboutUser</h1>
        <form>
            <label>first name
            <input type="text" name="firstname" onChange={handleChange}></input>
            </label>
            <br/>
            <label>last name:
            <input type="text" name="lastname" onChange={handleChange}></input>
            </label>
            <br/>
            <label>your email:
            <input type="email" name="email" onChange={handleChange}></input>
            </label>
            <br/>
            <label>phone number:
            <input type="number" name="phonenumber" onChange={handleChange}></input>
            </label>
            <br/>
            <label>birthday:
            <input type="date" name="birthday" onChange={handleChange}></input>
            </label>
            <br/>
            <label>age:
            <input type="number" name="age" onChange={handleChange}></input>
            </label>
            <br/>
            <input type="submit" onClick={handleSubmit} />
        </form>
        </>
    )
}export default MoreAboutUser