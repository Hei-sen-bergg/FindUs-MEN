import React, { Suspense, useContext, useEffect } from 'react';
import './ProfilePage.scss';
import List from '../../components/List/List';
import Chat from '../../components/Chat/Chat';
import apiRequest from '../../lib/apiRequest';
import { Await, Link, useLoaderData, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { postTitle, chat: initialChat } = location.state || {}; // Retrieve postTitle and chat from location state

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='profilePage'>
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>Avatar : <img src={currentUser.avatar || "/noavatar.jpg"} alt="" /></span>
            <span>Username : <b>{currentUser.username}</b></span>
            <span>Email : <b>{currentUser.email}</b></span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) => (
                <Chat chats={chatResponse.data} postTitle={postTitle} initialChat={initialChat} />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
