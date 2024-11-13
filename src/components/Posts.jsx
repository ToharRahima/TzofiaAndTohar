import React from "react";
import Navber from "./Navber";
import { useState ,useEffect } from "react";
import Comments from "./Comments";

function Posts(){
    const [showAddPost, setShowAddPost] = useState(false);
    const [inputs, setInputs] = useState({});
    const [showMine,setshowMine]=useState(true)
    const [myp,setmyp]=useState([])
    const [allp,setallp]=useState([])
    const [showMorem, setShowMorem] = useState();
    const [showMorea, setShowMorea] = useState();
    const [er, sete] = useState(true)
    const [showedit,setshowedit]=useState(false)
    const [editingPostId, setEditingPostId]= useState(null);
    const [showMoremc, setShowMoremc] = useState();

    const currentser=JSON.parse(localStorage.getItem("currentUser"));

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    useEffect(()=>{
        const fetchItem= async()=>{
            try{
                const res= await fetch("http://localhost:3500/posts");
                const posts=await res.json();
                setallp(posts);
                setmyp(posts)
            } catch(err){
                console.log(err.stack)
            } 
        }
        (async ()=> await fetchItem())();
    },[showAddPost,er,showedit])

    useEffect(()=>{
        setShowMorem(new Array(myp.length).fill(true))
    },[myp])

    useEffect(()=>{
        setShowMorea(new Array(allp.length).fill(true))
        setShowMoremc(new Array(allp.length).fill(true))
    },[allp])

    const setformyp = () => {
        let upd = allp.filter((item) => Number(item.userId )== Number(currentser.id));
        const arraysAreEqual = JSON.stringify(upd) !== JSON.stringify(myp);
        if (arraysAreEqual) {
          setmyp(upd); 
        }
      };
    setformyp()

    const Showc = (index) => {
        const updated = [...showMoremc]; 
        updated[index] = !updated[index]; 
        setShowMoremc(updated); 
    };


    const Showp = (index) => {
        const updated = [...showMorem]; 
        updated[index] = !updated[index]; 
        setShowMorem(updated); 
    };

    const Showa = (index) => {
        const updated = [...showMorea]; 
        updated[index] = !updated[index]; 
        setShowMorea(updated); 
    };

    const erase=(id)=>{
        sete(!er)
        fetch(`http://localhost:3500/posts/${id}`,{
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
    const endEdit=(id,userid)=>{
        
        const data = {
            "userId": Number(userid),
            "id": JSON.stringify(id),
            "title": inputs.Updatetitle,
            "body": inputs.Updatebody
          }
      
          fetch(`http://localhost:3500/posts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(() => {
              const updatedPosts = myp.map(post => post.id === id ? { ...post, ...data } : post);
              setmyp(updatedPosts);
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
                <h3>Edit Post:</h3>
                <p>id: {userId}</p>
                <p>postId: {id} </p>
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
                <button onClick={()=>{endEdit(id,userId)}}>Edit</button>
                </div>
        )
    }

    const mypost = () => {
        let s = [];
        let filtered=[]
        if(inputs.serch){
         filtered=myp.filter((item)=>{
            return (item.userId.toString().includes(inputs.serch)||item.id.toString().includes(inputs.serch)||item.title.toString().includes(inputs.serch)||item.body.toString().includes(inputs.serch))});
        } else { filtered=myp}
        for (let i = 0; i < filtered.length; i++) {
          s.push(
            <div style={{border:"2px, solid,black", margin:"5px",padding:"3px"}} key={filtered[i].id}>
              <p>userId: {filtered[i].userId}</p>
              <p>postId: {filtered[i].id}</p>
              <p>title: {filtered[i].title}</p>
              {showMorem[i]==false&&<p>body: {filtered[i].body}</p>}
              <button onClick={() => Showp(i)}>
                    {showMorem[i] ? 'Show More':'Show Less' }
                </button>    
                <button onClick={()=>{erase(filtered[i].id)}}>Erase</button>   
                <button onClick={() => {setshowedit(true); setEditingPostId(filtered[i].id)}}>Edit</button>      
            </div>
          );
        }
        
        return s
      };

    const allpost=()=>{
        let s = [];
        let filtered=[]
        if(inputs.serch){
         filtered=allp.filter((item)=>{
            return (item.userId.toString().includes(inputs.serch)||item.id.toString().includes(inputs.serch)||item.title.toString().includes(inputs.serch)||item.body.toString().includes(inputs.serch))});
        } else { filtered=allp}
        for (let i = 0; i < filtered.length; i++) {
          s.push(
            <div style={{border:"2px, solid,black", margin:"5px",padding:"3px"}} key={filtered[i].id}>
              <p>userId: {filtered[i].userId}</p>
              <p>postId: {filtered[i].id}</p>
              <p>title: {filtered[i].title}</p>
              {showMorea[i]==false&&<p>body: {filtered[i].body}</p>}
              <button onClick={() => Showa(i)}>
                    {showMorea[i] ? 'Show More':'Show Less' }
                </button>  
                {showMoremc[i]==false&&<Comments id={filtered[i].id}/>}    
                <button onClick={() => Showc(i)}>
                    {showMoremc[i] ? 'Show comments':'unshow comments' }
                </button>         
              
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
            "body": inputs.body
        }
        const requestOption={
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(data),
        };
        fetch("http://localhost:3500/posts",{ method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(data)})
        .then((response)=> {response.json
        })
        .then(()=> {
            console.log("update post",data)
            setmyp((prevPosts) => [...prevPosts, data])
           
        })
        .catch((error)=>console.error("Error updating post: ",error));
        setShowAddPost(false)
      }
    
      const addPost=()=>{
        return (
            <div style={{ border: "2px solid black", margin: "5px", padding: "3px" }}>
                <p>userId: {currentser.id}</p>
                <p>postId: {allp.length + 1}</p>
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
                <button onClick={() => submiteAdd(currentser.id, allp.length + 1)}>Add Post</button>
            </div>
        );
      }

    function handleSubmit(event){
        event.preventDefault();
    }


    return(
        <>
            <h1>Posts</h1>
            <Navber/>
            <br/><br/>
            <button onClick={()=>{setshowMine(true)}}> my posts </button>
            <button onClick={()=>{setshowMine(false)}}> all posts </button>
            <button onClick={() => setShowAddPost(true)}> Add Post </button>
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
            {showAddPost && addPost()}
            {showedit&& editPost()}
            {showMine?mypost():allpost()}
        </>
    )
}
export default Posts;
