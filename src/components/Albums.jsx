import React from "react";
import Navber from "./Navber";
import { useState ,useEffect } from "react";
import Photos from "./Photos";


function Albums(){

    const [showAddPost, setShowAddPost] = useState(false);
    const [com,setcom]=useState([]);
    const [inputs, setInputs] = useState({});
    const [showMore, setShowMore] = useState([]);
    const [showedit,setshowedit]=useState(false)
    const [editingPostId, setEditingPostId]= useState(null);
    const [er, sete] = useState(true)



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
    },[showAddPost,showedit,er])

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

    const erase=(id)=>{
        sete(!er)
        fetch(`http://localhost:3500/albums/${id}`,{
            method: "DELETE"
        })
        .then((response)=>{
            if(response.ok){
                console.log("erased frome the server");
            } else{
                throw new Error("failed to delate post from the server")
            }
        })
        .catch((error)=>console.log("error delating post",error))
    }

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
            <div key={filtered[i].id} style={{width:"900px",margin:"5px",padding:"3px", border:"2px solid black"}}>
                <p style={{width:"100%"}} onClick={() => Showp(i)}>id: {filtered[i].id},   title: {filtered[i].title}</p>
                <button onClick={()=>{erase(filtered[i].id)}}>Erase</button> 
                <button onClick={() => {setshowedit(true); setEditingPostId(filtered[i].id)}}>Edit</button>      
                {showMore[i]&&(
                    <div style={{ border: "2px solid black", margin: "5px", padding: "3px" }}>
                        <p>userId: {filtered[i].userId}</p>
                        <div style={{height:"400px",overflow:"scroll"}}><Photos id={filtered[i].id}/></div>
                    </div>
                )}  
            </div>  
          );
        }
        return s;
    }

    const submiteAdd=(userid,postid)=>{
        const data={
            "userId": Number(userid),
            "id": JSON.stringify(postid),
            "title": inputs.title,
        }
        const requestOption={
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(data),
        };
        fetch("http://localhost:3500/albums",{ method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(data)})
        .then((response)=> {response.json
        })
        .then(()=> {
            console.log("update post",data)
           
        })
        .catch((error)=>console.error("Error updating post: ",error));
        setShowAddPost(false)
      }
    
      const addPost=()=>{
        return (
            <div style={{ border: "2px solid black", margin: "5px", padding: "3px" }}>
                <p>userId: {currentser.id}</p>
                <p>id: {com.length + 1}</p>
                <label>Title:
                    <input
                        placeholder="Title"
                        type="text"
                        name="title"
                        value={inputs.title || ""}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button onClick={() => submiteAdd(currentser.id, com.length + 1)}>Add Album</button>
            </div>
        );
      }

      const endEdit=(id,userid)=>{
        
        const data = {
            "userId": Number(userid),
            "id": JSON.stringify(id),
            "title": inputs.Updatetitle
          }
      
          fetch(`http://localhost:3500/albums/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(() => {
              const updatedPosts = com.map(post => post.id === id ? { ...post, ...data } : post);
              setcom(updatedPosts);
              console.log("Post updated successfully");
              setshowedit(false)
            })
            .catch((error) => console.error("Error updating post: ", error));
    }

    const editPost=()=>{
        let id=editingPostId
        let userId=currentser.id
        return(
            <div style={{border:"2px, solid,black", margin:"5px",padding:"3px"}} >
                <h3>Edit Album:</h3>
                <p>userId: {userId}</p>
                <p>id: {id} </p>
            <label>Title:
                    <input
                        placeholder="Update Title"
                        type="text"
                        name="Updatetitle"
                        value={inputs.Updatetitle || ""}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button onClick={()=>{endEdit(id,userId)}}>Edit</button>
                </div>
        )
    }

    return(
        <>
            <h1>Albums</h1>
            <Navber/>
            <br/><br/>
            <button onClick={() => setShowAddPost(true)}> Add Album </button>
            <br/>
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
            {showAddPost && addPost()}
            {showedit&& editPost()}
            {showa()}
        </>
    )
}
export default Albums;
