import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import noAvatar from "../../assets/noAvatar.webp";
import { BASE_URL } from "../../baseUrl";
import { addToFollowings } from "../../redux/userReducer";

const RightbarUser = ({ user, currentUser }) => {
  const [isUserFollowed, setIsUserFollowed] = useState(currentUser?.followings?.includes(user._id));
  const dispatch = useDispatch();

  const handleFollow = async () => {
    try {
      const res = await axios.put(`/api/users/follow/${currentUser._id}`, {
        userId: user._id
      },{
        headers: {
          Authorization: window.localStorage.getItem("tauthtoken")
        }
      });  
      console.log(res.data);
      dispatch(addToFollowings(user._id));
      setIsUserFollowed((prev) => !prev);
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <Link to={`/profile/${user?._id}`} className="link"><div className="rightbarFollowContainer">
      <div className="rightbarFollowLeft">
        <img
          src={user?.profilePicture ? user.profilePicture : noAvatar}
          alt="user profile"
          className="rightbarFollowImg"
        />
        <div className="rightbarFollowUser">
          <p className="rightbarFollowUserName">{user?.username}</p>
          <p className="rightbarFollowUserTag">@{user?.username}</p>
        </div>
      </div>
      {isUserFollowed ? (
        <button
          className="topicFeedTopicItemButton"
          onClick={handleFollow}
        >
          <span className="topicFeedTopicItemSpan">Following</span>
        </button>
      ) : (
        <button
          className="rightbarFollowButton"
          onClick={handleFollow}
        >
          Follow
        </button>
      )}
    </div>
    </Link>
  )
}

export default RightbarUser