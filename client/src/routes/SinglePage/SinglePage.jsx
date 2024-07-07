import React, { useContext, useState } from "react";
import "./SinglePage.scss";
import Slider from "../../components/Slider/Slider";
import Map from "../../components/Map/Map";
import { useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const SinglePage = () => {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  const handleSendMessage = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    if (currentUser.id === post.userId) {
      alert("You cannot message yourself.");
      return;
    }
    try {
      await apiRequest.post("/chats", { receiverId: post.userId });
      navigate("/profile", { state: { postTitle: post.title } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    navigate(`/update/${post.id}`);
  };

  const handleDelete = async () => {
    if (!currentUser || currentUser.id !== post.userId) {
      alert('You are not the owner of this post!');
      return;
    }

    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const token = getCookie('token'); // Retrieve the token from cookies
        await apiRequest.delete(`/posts/${post.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Post deleted successfully');
        navigate('/profile'); 
      } catch (err) {
        console.error(err);
        alert('Failed to delete saved post');
      }
    }
  };

  return (
    <div className="SinglePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
            {currentUser && currentUser.id === post.userId && (
              <div className="buttons">
                <button onClick={handleEdit}>Edit post</button>
                <button onClick={handleDelete}>Delete post</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets are allowed</p>
                ) : (
                  <p>Pets are not allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Parking</span><br/>
                {post.postDetail.parking}
              </div>
            </div>
          </div>
          <p className="title">Room sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} bed</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/bus.png" alt="" />
              <div className="featureText">
                <span>Bus stop</span>
                <p>{post.postDetail.bus} km away </p>
              </div>
            </div>
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>Airport</span>
                <p>{post.postDetail.airport} km away </p>
              </div>
            </div>
            <div className="feature">
              <img src="/restaurant.png" alt="" />
              <div className="featureText">
                <span>Train</span>
                <p>{post.postDetail.train} km away </p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button onClick={handleSendMessage}>
              <img src="/chat.png" alt="" />
              Send a message
            </button>
            <button onClick={handleSave} style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}>
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
