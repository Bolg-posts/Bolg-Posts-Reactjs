import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Blog(props) {
  const { posts, currUserPosts, handleDeletePost, handleUpdatePost } = props;
  const navigate = useNavigate();
  console.log(currUserPosts);
  const handleClick = () => {
    navigate("/post/addpost");
  };
  console.log(posts);
  const userPosts = localStorage.getItem("userposts");
  console.log(userPosts);
  return (
    <div>
      <div className=" flex justify-end px-20 mt-10">
        <button
          className="border bg-yellow-800 text-white rounded-2xl px-4 py-2 hover:border-yellow-800 hover:text-yellow-800 hover:bg-white "
          onClick={() => handleClick()}
        >
          Add New Post
        </button>
      </div>
      <div className="py-10 flex flex-col justify-center items-center ">
        <h1 className="text-gray-950  text-center font-serif text-2xl">
          BLOGS
        </h1>
        <div className="grid  grid-rows-1 mt-10 grid-flow-col justify-center items-center  gap-3">
          {posts.map((post) => (
            <PostCard
              postData={post}
              currUserPosts={currUserPosts}
              handleDeletePost={handleDeletePost}
              handleUpdatePost={handleUpdatePost}
              key={post._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
