import { useEffect, useState } from "react";
import axios from "axios";
import { FiSettings } from "react-icons/fi";
import Navbar from "../navbar/Navbar";

import Post from "../post/Post";
import "./exploreFeed.css";
import { BASE_URL } from "../../baseUrl";
import SearchInput from "../searchInput/SearchInput";

const ExploreFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`/api/posts`,{
          headers: {
            Authorization: window.localStorage.getItem("tauthtoken")
          }
        });  
        setPosts(res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
        );
      } catch (err) {
        console.log(err);
      };
    };
    getPosts();
  }, []);

  return (
    <div className="exploreFeed">
      <Navbar title="Explore" />    
      <div
        className="searchFeedWrapper"
        style={{ position: "sticky", top: "0", zIndex: "99999", backgroundColor: "rgba(255, 255, 255, 0.95)",borderBottom:'1px solid lightgrey' }}
      >
        <SearchInput />
        <div className="searchFeedIconContainer">
          <FiSettings className="searchFeedIcon" />
        </div>
      </div>
      <div className="feedWrapper" style={{'marginTop':'2%'}}>
        {posts?.map((post) => (
          <Post post={post} key={post._id} setPosts={setPosts} />
        ))}
      </div>
    </div>
  )
}

export default ExploreFeed