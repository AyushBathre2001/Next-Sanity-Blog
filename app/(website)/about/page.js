import { getAboutPage } from "@/lib/sanity/client";
import About from "./about";
import { getSEObyPageType } from "@/services/seo/api";

export async function generateMetadata() {
  const seoData = await getSEObyPageType("about");
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

export default async function AboutPage() {
  const aboutPage = await getAboutPage();
  return <About about={aboutPage} />;
}

// export const revalidate = 60;
