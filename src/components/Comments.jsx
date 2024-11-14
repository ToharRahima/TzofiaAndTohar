import React, { useState,useEffect } from "react";
function Comments(props){
    const [com,setcom]=useState([]);
    const [showedit,setshowedit]=useState(false)
    const [editingPostId, setEditingPostId]= useState(null);
    const [inputs, setInputs] = useState({});
    const [er, sete] = useState(true)
    const [showAddcom, setShowAddcom] = useState(false);



    const currentser=JSON.parse(localStorage.getItem("currentUser"));

    useEffect(()=>{
        const fetchItem= async()=>{
            try{
                const res= await fetch("http://localhost:3500/comments");
                const comments=await res.json();
                setcom(comments);
            } catch(err){
                console.log(err.stack)
            } 
        }
        (async ()=> await fetchItem())();
    },[com, showedit,er,showAddcom])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

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

    const showc=()=>{
        const arr = com.filter(item => item.postId == props.id);
        if (arr.length === 0) {
            return <p>No comments available.</p>;
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
              <p>commentId: {filtered[i].id}</p>
              <p>name: {filtered[i].name}</p>
              <p>body: {filtered[i].body}</p>
                {currentser.name==filtered[i].name&&<button onClick={() => {setshowedit(true); setEditingPostId(filtered[i].id)}}>Edit</button>}
                {currentser.name==filtered[i].name&&<button onClick={() => {erase(filtered[i].id)}}>Erase</button>}

            </div> 
          );
        }
        return s;
    }

    const editc=()=>{
        let id=editingPostId
        return(
            <div style={{border:"2px, solid,black", margin:"5px",padding:"3px"}} >
                <h3>Edit commite:</h3>
                <p>commentId: {id}</p>
                <p>name: {currentser.name} </p>
                <label>Body:
                    <input
                        placeholder="Body"
                        type="text"
                        name="Updatebody"
                        value={inputs.Updatebody || ""}
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
            "postId": Number(props.id),
            "id": JSON.stringify(id),
            "name": currentser.name,
            "body": inputs.Updatebody
          }
      
          fetch(`http://localhost:3500/comments/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(() => {
              const updatecom = com.map(com => com.id === id ? { ...com, ...data } : com);
              setcom(updatecom);
              console.log("Post updated successfully");
              setshowedit(false)
            })
            .catch((error) => console.error("Error updating post: ", error));
    }

    const submiteAdd=(id,name)=>{
        const data={
           "postId": Number(props.id),
            "id": JSON.stringify(id),
            "name": name,
            "email": currentser.email,
            "body": inputs.body
        }
        const requestOption={
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(data),
        };
        fetch("http://localhost:3500/comments",{ method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(data)})
        .then((response)=> {response.json
        })
        .then(()=> {
            console.log("update comment",data)
            setcom((prevPosts) => [...prevPosts, data])
           
        })
        .catch((error)=>console.error("Error updating commente: ",error));
        setShowAddcom(false)
      }

    const addcom=()=>{
        return (
            <div style={{ border: "2px solid black", margin: "5px", padding: "3px" }}>
                <p>postId: {props.id}</p>
                <p>commiteId: {com.length+1}</p>
                <p>name: {currentser.name}</p>
                <label>Body:
                    <input
                        placeholder="Body"
                        type="text"
                        name="body"
                        value={inputs.body || ""}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button onClick={() => submiteAdd((com.length+1),currentser.name)}>Add Commite</button>
            </div>
        );
      }

      function handleSubmit(event){
        event.preventDefault();
    }
    
    return(
        <div style={{backgroundColor:"wheat",color:"gray"}}>
            <h1>Comments {props.id}</h1>
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
            {showedit&& editc()}
            {showc()}
            {<button onClick={()=>setShowAddcom(true)}>Add Commite</button>}
            {showAddcom&& addcom()}
        </div>
    )
}
export default Comments;
