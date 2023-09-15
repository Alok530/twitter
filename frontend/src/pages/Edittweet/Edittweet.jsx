import Rightbar from "../../components/rightbar/Rightbar";
import Share from "../../components/share/Share";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import "./edittweet.css";
import { useNavigate, useParams } from "react-router-dom";

import { BASE_URL } from "../../baseUrl";
import Edittweetform from "./Edittweetform";

const Edittweet = () => {
  const postId = useParams().postId;
  console.log(postId);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [postdone, setPostdone] = useState(false);
  const [post, setPost] = useState();

  useEffect(()=>{
    if(postdone){
      navigate('/');
    }
  },[postdone])  

  return (
    <div className="tweet">
      <Sidebar />      
      <Edittweetform type="Edit" setPosts={setPosts} postId={postId}/>
      <Rightbar />
    </div>
  )
}

export default Edittweet;