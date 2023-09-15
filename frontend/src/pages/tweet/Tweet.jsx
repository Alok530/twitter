import Rightbar from "../../components/rightbar/Rightbar";
import Share from "../../components/share/Share";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import "./tweet.css";
import { useNavigate } from "react-router-dom";

const Tweet = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [postdone, setPostdone] = useState(false);

  useEffect(()=>{
    if(postdone){
      navigate('/');
    }
  },[postdone])

  return (
    <div className="tweet">
      <Sidebar />
      <Share type="tweet" setPosts={setPosts} postdone={setPostdone}/>
      <Rightbar />
    </div>
  )
}

export default Tweet;