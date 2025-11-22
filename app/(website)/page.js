import { getAllBlogs } from "@/services/blog/api";
import HomePage from "./home";
import { getSEObyPageType } from "@/services/seo/api";

export async function generateMetadata() {
  const seoData = await getSEObyPageType("home");
  if (seoData?._id) {
    return {
      title: seoData?.metaTitle,
      description: seoData?.metaDescription,
      alternates: {
        canonical: seoData?.canonicalUrl
      },
      robots: {
        index: true,
        follow: true,
        nocache: true
      },
      openGraph: {
        images: [seoData?.ogImage?.asset?.url]
      }
    };
  }
  return {
    title: "Blog",
    description: "Blog"
  };
}

export default async function IndexPage() {
  const posts = await getAllBlogs();

  return <HomePage posts={posts} />;
}
