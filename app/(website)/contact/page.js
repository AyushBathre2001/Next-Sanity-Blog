import { getSettings } from "@/lib/sanity/client";
import Contact from "./contact";
import { getSEObyPageType } from "@/services/seo/api";

export async function generateMetadata() {
  const seoData = await getSEObyPageType("contact");
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

export default async function ContactPage() {
  const settings = await getSettings();
  return <Contact settings={settings} />;
}

// export const revalidate = 60;
