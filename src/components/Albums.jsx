import React from "react";
import Navber from "./Navber";
import { useState ,useEffect } from "react";
import Photos from "./Photos";


function Albums(){

    const [com,setcom]=useState([]);
    const [inputs, setInputs] = useState({});
    const [showMore, setShowMore] = useState([]);

    const currentser=JSON.parse(localStorage.getItem("currentUser"));


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

   
    useEffect(()=>{
        const fetchItem= async()=>{
            try{
                const res= await fetch("http://localhost:3500/albums");
                const album=await res.json();
                setcom(album);
            } catch(err){
                console.log(err.stack)
            } 
        }
        (async ()=> await fetchItem())();
    },[])

    useEffect(()=>{
        setShowMore(new Array(com.length).fill(false))
    },[com])

    function handleSubmit(event){
        event.preventDefault();
    }

    const Showp = (index) => {
        const updated = [...showMore];
        updated[index] = !updated[index]; 
        setShowMore(updated);
    };


    const showa=()=>{
        let filecom=com.filter((item)=>item.userId==currentser.id)
        let s = [];
        let filtered=[]
        if(inputs.serch){
         filtered=filecom.filter((item)=>{
            return (item.userId.toString().includes(inputs.serch)||item.id.toString().includes(inputs.serch)||item.title.toString().includes(inputs.serch))});
        } else { filtered=filecom}
        for (let i = 0; i < filtered.length; i++) {
          s.push(
            <button key={filtered[i].id} style={{width:"900px",margin:"5px",padding:"3px"}} onClick={() => Showp(i)}>
                <p>id: {filtered[i].id},   title: {filtered[i].title}</p>
                {showMore[i]&&(
                    <div style={{ border: "2px solid black", margin: "5px", padding: "3px" }}>
                        <p>userId: {filtered[i].userId}</p>
                        <div style={{height:"400px",overflow:"scroll"}}><Photos id={filtered[i].id}/></div>
                    </div>
                )}  
            </button>  
          );
        }
        return s;
    }

    return(
        <>
            <h1>Albums</h1>
            <Navber/>
            <br/><br/>
            <form>
            <label>
                    <input
                        placeholder="serch"
                        type="text"
                        name="serch"
                        value={inputs.serch || ""}
                        onChange={handleChange}
                        required
                    />
                </label>
                <input type="submit" onClick={handleSubmit}/>
            </form>
            <br/><br/>
            {showa()}
        </>
    )
}
export default Albums;
