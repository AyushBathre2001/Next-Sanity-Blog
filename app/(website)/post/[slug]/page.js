import { urlForImage } from "@/lib/sanity/image";
import PostPage from "./default";

import { getPostBySlug } from "@/lib/sanity/client";

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  const seoData = post?.seo;
  const ogImage = seoData && urlForImage(seoData?.ogImage);

  if (seoData) {
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
        images: [ogImage?.src]
      }
    };
  }
  return {
    title: "Blog",
    description: "Blog"
  };
}

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params?.slug);

  return <PostPage post={post} />;
}

export const revalidate = 0;
