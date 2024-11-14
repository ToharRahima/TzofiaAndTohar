import React from "react";
import { useState, useEffect } from "react";
function Photos(props){

    const [com,setcom]=useState([]);
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    function handleSubmit(event){
        event.preventDefault();
    }

    useEffect(()=>{
        const fetchItem= async()=>{
            try{
                const res= await fetch("http://localhost:3500/photos");
                const photos=await res.json();
                setcom(photos);
            } catch(err){
                console.log(err.stack)
            } 
        }
        (async ()=> await fetchItem())();
    },[])

    const showc=()=>{
        const arr = com.filter(item => item.albumId == props.id);
        if (arr.length === 0) {
            return <p>No Photos available.</p>;
        }
        let s = [];
        let filtered=[]
        if(inputs.serch){
         filtered=arr.filter((item)=>{
            return (item.id.toString().includes(inputs.serch)||item.name.toString().includes(inputs.serch)||item.body.toString().includes(inputs.serch))});
        } else { filtered=arr}
        for (let i = 0; i < filtered.length; i++) {
          s.push(
            <div style={{border:"2px, solid,black", margin:"5px",padding:"3px"}} key={filtered[i].id}>
              <p>title: {filtered[i].title}</p>
              <img src={filtered[i].thumbnailUrl}/>
                {/* {currentser.name==filtered[i].name&&<button onClick={() => {setshowedit(true); setEditingPostId(filtered[i].id)}}>Edit</button>}
                {currentser.name==filtered[i].name&&<button onClick={() => {erase(filtered[i].id)}}>Erase</button>} */}

            </div> 
          );
        }
        return s;
    }


    return(
        <div style={{backgroundColor:"wheat"}}>
            <h1>Photos</h1>
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
            {showc()}

        </div>
    )
}
export default Photos;
