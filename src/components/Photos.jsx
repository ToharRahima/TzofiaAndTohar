import React from "react";
import { useState, useEffect } from "react";
function Photos(props){

    const [com,setcom]=useState([]);
    const [inputs, setInputs] = useState({});
    const [er, sete] = useState(true)
    const [showedit,setshowedit]=useState(false)
    const [editingPostId, setEditingPostId]= useState(null);
    const [showAddcom, setShowAddcom] = useState(false);

    const currentser=JSON.parse(localStorage.getItem("currentUser"));


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
    },[er,showedit,showAddcom])

    const erase=(id)=>{
        sete(!er)
        fetch(`http://localhost:3500/photos/${id}`,{
            method: "DELETE"
        })
        .then((response)=>{
            if(response.ok){
                console.log("erased frome the server");
            } else{
                throw new Error("failed to delate commite from the server")
            }
        })
        .catch((error)=>console.log("error delating commite",error))
    }

    const editc=()=>{
        let id=editingPostId
        return(
            <div style={{border:"2px, solid,black", margin:"5px",padding:"3px"}} >
                <h3>Edit photo:</h3>
                <p>photoId: {id}</p>
                <label>title:
                    <input
                        placeholder="title"
                        type="text"
                        name="Updatetitle"
                        value={inputs.Updatetitle || ""}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>url:
                    <input
                        placeholder="url"
                        type="text"
                        name="Updateurl"
                        value={inputs.Updateurl || ""}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button onClick={()=>{endEdit(id)}}>Edit</button>
                </div>
        )
    }

    const endEdit=(id)=>{
        
        const data = {
            "albumId": Number(props.id),
            "id": JSON.stringify(id),
            "title": inputs.Updatetitle,
            "thumbnailUrl": inputs.Updateurl
          }
      
          fetch(`http://localhost:3500/photos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(() => {
            //   const updatecom = com.map(com => com.id === id ? { ...com, ...data } : com);
            //   setcom(updatecom);
              console.log("Post photo successfully");
              setshowedit(false)
            })
            .catch((error) => console.error("Error updating post: ", error));
    }

    const submiteAdd=(id,name)=>{
        const data={
           "albumId": Number(props.id),
            "id": JSON.stringify(id),
            "title": inputs.title,
            "thumbnailUrl": inputs.thumbnailUrl
        }
        const requestOption={
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(data),
        };
        fetch("http://localhost:3500/photos",{ method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(data)})
        .then((response)=> {response.json
        })
        .then(()=> {
            console.log("update photo",data)
            setcom((prevPosts) => [...prevPosts, data])
           
        })
        .catch((error)=>console.error("Error updating phto: ",error));
        setShowAddcom(false)
      }

    const addcom=()=>{
        return (
            <div style={{ border: "2px solid black", margin: "5px", padding: "3px" }}>
                <p>albumId: {props.id}</p>
                <p>id: {com.length+1}</p>
                <label>title:
                    <input
                        placeholder="title"
                        type="text"
                        name="title"
                        value={inputs.title || ""}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>thumbnailUrl:
                    <input
                        placeholder="thumbnailUrl"
                        type="text"
                        name="thumbnailUrl"
                        value={inputs.thumbnailUrl || ""}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button onClick={() => submiteAdd((com.length+1),currentser.name)}>Add photo</button>
            </div>
        );
      }

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
              <p>id: {filtered[i].id } , title: {filtered[i].title}</p>
              <img src={filtered[i].thumbnailUrl}/>
              <br/>
                {<button onClick={() => {setshowedit(true); setEditingPostId(filtered[i].id)}}>Edit</button>}
                {<button onClick={() => {erase(filtered[i].id)}}>Erase</button>}

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
            {<button onClick={()=>setShowAddcom(true)}>Add photo</button>}
            <br/>
            {showAddcom&& addcom()}
            {showedit&& editc()}
            {showc()}

        </div>
    )
}
export default Photos;
