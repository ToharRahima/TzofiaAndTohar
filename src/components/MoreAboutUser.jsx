import { Route } from "react-router-dom"

function MoreAboutUser(){
    return(
        <>
        <h1>MoreAboutUser</h1>
        <form>
            <label>your email:
            <input type="email"></input>
            </label>
            <label>phone number:
            <input type="number"></input>
            </label>
            <label>birthday:
            <input type="date"></input>
            </label>
            <label>age:
            <input type="number"></input>
            </label>
            <input type="submit" />
            <button>skip</button>
        </form>
        </>
    )
}export default MoreAboutUser