import React from "react";
import PostList from "../postlist";

const RelatedArticles = ({ posts }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <h3 className="text-[24px] font-semibold">Related Articles</h3>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {posts?.map(post => (
          <PostList
            key={post?.title}
            post={post}
            aspect="landscape"
            preloadImage={true}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
