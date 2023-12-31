import { BsArrowLeft, BsCalendar2Event } from "react-icons/bs";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import "./profileFeed.css";
import Post from "../post/Post";
import { BASE_URL } from "../../baseUrl";
import noAvatar from "../../assets/noAvatar.webp";
import noCover from "../../assets/noCover.png";
import OpenSetupProfile from "./OpenSetupProfile";
import SingleComment from "../singleComment/SingleComment";
import Comment from "../comment/Comment";
import WhoToFollow from "../whoToFollow/WhoToFollow";
import { addToFollowings } from "../../redux/userReducer";

const ProfileFeed = () => {
  const [active, setActive] = useState("tweets");
  const [openSetUpProfile, setOpenSetUpProfile] = useState(false);
  const [setUpProfilePage, setSetUpProfilePage] = useState(1);
  const [user, setUser] = useState(null);
  const [usersPosts, setUsersPosts] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const [usersComments, setUsersComments] = useState([]);
  const [usersLikedPosts, setUsersLikedPosts] = useState([]);
  const [usersLikedComments, setUsersLikedComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();

  //get user
  useEffect(() => {
    const getUser = async () => {
      try {
        // const res = await axios.get(`${BASE_URL}/users/${params.id}`,{
        const res = await axios.get(`/api/users/${params.id}`,{
          headers: {
            Authorization: window.localStorage.getItem("tauthtoken")
          }
        });  
        setUser(res.data);
      } catch (err) {
        console.log(err);
      };
    };
    getUser();
  }, [params.id]);

  //get user's posts
  useEffect(() => {
    if (user) {
      const getUsersPosts = async () => {
        try {
          // const res = await axios.get(`${BASE_URL}/users/posts/${user._id}`,{
          const res = await axios.get(`/api/users/posts/${user._id}`,{
            headers: {
              Authorization: window.localStorage.getItem("tauthtoken")
            }
          });            
          setUsersPosts(res.data)
        } catch (err) {
          console.log(err);
        };
      };
      getUsersPosts();
    };
  }, [user]);


  //filter posts wihout images or videos
  const postsWithMedia = usersPosts.filter((post) => post.images.length > 0 || post.video !== undefined);

  //get user's liked posts
  useEffect(() => {
    if (user) {
      const getUsersLikedPosts = async () => {
        try {          
          const res = await axios.get(`/api/users/liked-posts/${user?._id}`,{
            headers: {
              Authorization: window.localStorage.getItem("tauthtoken")
            }
          });            
          setUsersLikedPosts(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getUsersLikedPosts();
    };
  }, [user]);

  // get user's liked comments
  // useEffect(() => {
  //   if (user) {
  //     const getUsersLikedComments = async () => {
  //       try {
  //         const res = await axios.get(`${BASE_URL}/users/liked-comments/${user._id}`);
  //         setUsersLikedComments(res.data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     getUsersLikedComments();
  //   };
  // }, [user]);

  const [isUserFollowed, setIsUserFollowed] = useState(currentUser?.followings?.includes(user?._id));

  const handleFollow = async () => {
    try {
      // const res = await axios.put(`http://localhost:8000/api/users/follow/${currentUser._id}`, {
      const res = await axios.put(`/api/users/follow/${currentUser._id}`, {
        userId: user._id
      },{
        headers: {
          Authorization: window.localStorage.getItem("tauthtoken")
        }
      });        
      dispatch(addToFollowings(user._id));
      setIsUserFollowed((prev) => !prev);
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <div className="profileFeed">
      <div className="profileNavbar">
        <Link
          to="/"
          className="link"
        >
          <div className="profileNavbarBackIconContainer">
            <BsArrowLeft className="profileNavbarBackIcon" />
          </div>
        </Link>
        <div>
          <div className="profileNavbarUserName">{user?.username}</div>
          <div className="profileNavbarUserTweetsCount">
            {usersPosts?.length}{" "}Tweets
          </div>
        </div>
      </div>
      <div className="profileFeedImages">
        <img
          src={user?.coverPicture ? user.coverPicture : noCover}
          alt="user cover"
          className="profileFeedCoverImg"
        />
        <img
          src={user?.profilePicture ? user.profilePicture : noAvatar}
          alt="user profile"
          className="profileFeedProfileImg"
        />
      </div>
      <div className="profileFeedSetup">
        {currentUser?._id !== user?._id ? (
          <div style={{ marginRight: "15px" }}>
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
        ) : (
          <button
            className="profileFeedSetupButton"
            onClick={() => setOpenSetUpProfile((prev) => !prev)}
          >
            Set up profile
          </button>
        )}
      </div>
      <div className="profileFeedUserInfo">
        <div className="profileFeedUserName">
          {user?.username}
        </div>
        <div className="profileFeedUserTags">
          @{user?.username}
        </div>
        <div className="profileFeedUserJoinedDate">
          <BsCalendar2Event className="profileFeedUserIcon" />
          <div className="profileFeedUserJoinedText">
            Joined {moment(user?.createdAt).format("LLL")}
          </div>
        </div>
        <div className="profileFeedUserFollowContainer">
          <Link to={`/following/${user?._id}`} className="link">
            <div className="profileFeedUserFollowing">
              <b>{user?.followings?.length}</b> <span className="profileFeedUserFollowText">Following</span>
            </div>
          </Link>
          <Link to={`/followers/${user?._id}`} className="link">
            <div className="profileFeedUserFollowers">
              <b>{user?.followers?.length}</b> <span className="profileFeedUserFollowText">Followers</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="profileFeedSelectorContainer">
        <p
          className={active === "tweets" ? "profileFeedSelectorItemActive" : "profileFeedSelectorItem"}
          onClick={() => setActive("tweets")}
        >
          Tweets
        </p>
        {/* <p
          className={active === "tweetsReplies" ? "profileFeedSelectorItemActive" : "profileFeedSelectorItem"}
          onClick={() => setActive("tweetsReplies")}
        >
          Replies
        </p> */}
        {/* <p
          className={active === "media" ? "profileFeedSelectorItemActive" : "profileFeedSelectorItem"}
          onClick={() => setActive("media")}
        >
          Media
        </p> */}
        <p
          className={active === "likes" ? "profileFeedSelectorItemActive" : "profileFeedSelectorItem"}
          onClick={() => setActive("likes")}
        >
          Likes
        </p>
      </div>
      {active === "tweets" && (
        <div>
          {usersPosts?.map((post) => (
            <Post post={post} key={post._id} />
          ))}
          {(!usersPosts || usersPosts.length === 0) && (
            <WhoToFollow />
          )}
        </div>
      )}
      {active === "tweetsReplies" && (
        <div>
          {usersComments?.map((comment) => (
            <SingleComment
              comment={comment}
              currentUser={currentUser}
              key={comment._id}
            />
          ))}
          {(!usersComments || usersComments.length === 0) && (
            <div className="profileFeedNoContentContainer">
              <h1>You don’t have any replies yet</h1>
              <p className="profileFeedNoContentText">
                Tap the chat bubble on any Tweet to comment it.
                When you do, it’ll show up here.
              </p>
            </div>
          )}
        </div>
      )}
      {active === "media" && (
        <div>
          {postsWithMedia?.map((post) => (
            <Post post={post} key={post._id} />
          ))}
          {(!postsWithMedia || postsWithMedia.length === 0) && (
            <div className="profileFeedNoContentContainer">
              <img
                src="https://abs.twimg.com/sticky/illustrations/empty-states/masked-doll-head-with-camera-800x400.v1.png"
                alt="no posts with media"
                className="profileFeedNoContentImg"
              />
              <h1>Lights, camera ... attachments!</h1>
              <p className="profileFeedNoContentText">
                When you send Tweets with photos or videos in them,
                it will show up here.
              </p>
            </div>
          )}
        </div>
      )}
      {active === "likes" && (
        <div>
          {usersLikedPosts?.map((post) => (
            <Post post={post} key={post._id} />
          ))}
          {/* {usersLikedComments?.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))} */}
          {((!usersLikedPosts && !usersLikedComments) || (usersLikedPosts.length === 0 && usersLikedComments.length === 0)) && (
            <div className="profileFeedNoContentContainer">
              <h1>You don’t have any likes yet</h1>
              <p className="profileFeedNoContentText">
                Tap the heart on any Tweet to show it some love.
                When you do, it’ll show up here.
              </p>
            </div>
          )}
        </div>
      )}
      {openSetUpProfile && (
        <OpenSetupProfile
          user={user}
          setUser={setUser}
          currentUser={currentUser}
          setUpProfilePage={setUpProfilePage}
          setOpenSetUpProfile={setOpenSetUpProfile}
          setSetUpProfilePage={setSetUpProfilePage}
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
          coverPicture={coverPicture}
          setCoverPicture={setCoverPicture}
          about={about}
          setAbout={setAbout}
          location={location}
          setLocation={setLocation}
        />
      )}
    </div>
  )
}

export default ProfileFeed