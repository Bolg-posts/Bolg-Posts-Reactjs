import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "./interceptor/interceptor";
import PostForm from "./pages/PostForm";
import UpdatePostForm from "./pages/UpdatePostForm";
import { IsAuthContext } from "./context/IsAuthContext";
import Blog from "./pages/Blog";

function App() {
  const [posts, setPosts] = useState([]);
  const postsIds = [];
  const { isAuth } = useContext(IsAuthContext);
  const [currUser, setCurrUser] = useState("");
  const [currUserPosts, setCurrUserPosts] = useState([]);
  console.log(isAuth);
  useEffect(() => {
    async function fetchPostsData() {
      const { data } = await axios.get("http://localhost:3000/posts");
      console.log(data);
      setPosts(data);
    }
    async function fetchUserData() {
      const { data } = await axiosInstance.get(
        "http://localhost:3000/user/useProfiles"
      );
      console.log(data);
      setCurrUser(data);
      setCurrUserPosts(data.posts);
      console.log(data.posts);
    }
    fetchPostsData();
    fetchUserData();
  }, []);

  const handleAddNewPost = (newPost) => {
    console.log(newPost);
    const newPosts = [...posts];
    newPosts.push(newPost);
    setPosts(newPosts);
  };

  const handleUpdatePost = async (updatedPost) => {
    console.log(updatedPost);
    const newPosts = [...posts];
    const index = posts.findIndex((post) => post._id === updatedPost._id);
    newPosts[index] = { ...updatedPost };
    setPosts(newPosts);
  };

  const handleDeletePost = async (selectedPost) => {
    console.log(selectedPost);
    let newPosts = [...posts];

    const newPostsArr = newPosts.filter(
      (post) => post._id !== selectedPost._id
    );
    console.log(newPostsArr);
    setPosts(newPostsArr);

    await axiosInstance.delete(
      `http://localhost:3000/posts/${selectedPost._id}`
    );
  };

  posts.map((post) => {
    postsIds.push(post._id);
  });
  return (
    <>
      <BrowserRouter>
        {/* <Navbar currUser={currUser} /> */}
        <Routes>
          <Route
            path="/blog"
            element={
              <Blog
                posts={posts}
                currUserPosts={currUserPosts}
                handleDeletePost={handleDeletePost}
                handleUpdatePost={handleUpdatePost}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home
                posts={posts}
                currUserPosts={currUserPosts}
                handleDeletePost={handleDeletePost}
                handleUpdatePost={handleUpdatePost}
              />
            }
          ></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/post/addpost"
            element={<PostForm handleAddNewPost={handleAddNewPost} />}
          />
          <Route
            path="/post/edit/:id"
            element={
              <UpdatePostForm
                handleUpdatePost={handleUpdatePost}
                posts={posts}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
