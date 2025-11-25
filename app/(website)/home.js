import NewsletterForm from "@/components/blog/NewsletterForm";
import Container from "@/components/container";
import SteelMasterForm from "@/components/form/SteelMasterForm";
import PostList from "@/components/postlist";

export default function Post({ posts }) {
  return (
    <>
      {posts && (
        <Container className="min-h-screen">
          <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
            {posts.slice(0, 2).map(post => (
              <PostList
                key={post._id}
                post={post}
                aspect="landscape"
                preloadImage={true}
              />
            ))}
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
            {posts.slice(2, 14).map(post => (
              <PostList key={post._id} post={post} aspect="square" />
            ))}
          </div>
        </Container>
      )}
      <div className="mx-auto max-w-xl px-4 py-10 md:py-14">
        <SteelMasterForm />
      </div>
    </>
  );
}
