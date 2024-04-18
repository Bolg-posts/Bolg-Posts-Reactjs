import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Home(props) {
  const { posts, currUserPosts, handleDeletePost, handleUpdatePost } = props;
  console.log(currUserPosts);
  console.log(posts);
  return (
    <div>
      <div className="banner">
        <div className="relative inline-block w-full align-top">
          <div className="">
            <img src="https://zoya.qodeinteractive.com/wp-content/uploads/2021/04/blog-list-img-75.jpg" />
          </div>
          <div className="absolute left-0 top-0 w-full  h-full flex flex-col items-center justify-center gap-5 bg-black bg-opacity-25 ">
            <h1 className="text-white text-4xl font-bold font-serif">
              Details That Make Every Outfit Great
            </h1>
            <p className="text-white text-2xl font-serif">
              April 2, 2024 | By Lundia
            </p>
          </div>
        </div>
      </div>
      <div className="py-20 flex flex-col justify-center items-center ">
        <h1 className="text-gray-950  text-center font-serif text-2xl">
          Latest Posts
        </h1>
        <div className="grid  grid-rows-1 mt-10 grid-flow-col justify-center items-center  gap-3">
          {posts.slice(0, 3).map((post) => (
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
      <div className="py-20">
        <div className="relative inline-block w-full align-top">
          <div className="">
            <img src="https://zoya.qodeinteractive.com/wp-content/uploads/2020/07/blog-list-img-105.jpg" />
          </div>
          <div className="absolute left-0 top-0 w-full  h-full flex flex-col items-center justify-center gap-5 bg-black bg-opacity-25 ">
            <h1 className="text-white text-4xl font-bold font-serif">
              Get UseFul Travel Tips, News & Adivce
            </h1>
            <p className="text-white text-2xl font-serif">
              Jun 10, 2023 | By Ford
            </p>
          </div>
        </div>
      </div>
      <div className="py-20 flex flex-col justify-center items-center ">
        <h1 className="text-gray-950  text-center font-serif text-2xl">
          Latest Posts
        </h1>
        <div className="grid  grid-rows-1 mt-10 grid-flow-col justify-center items-center  gap-3">
          {posts.slice(0, 3).map((post) => (
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
