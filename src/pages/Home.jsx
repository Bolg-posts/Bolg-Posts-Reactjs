import React from "react";

export default function Home(props) {
  const { posts } = props;
  console.log(posts);
  return (
    <div>
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <img src={post.image} alt="image" />
          </div>
        ))}
      </div>
    </div>
  );
}
