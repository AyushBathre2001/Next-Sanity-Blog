import { client } from "@/lib/sanity/client";

const query = `*[_type == "seo" && pageType == $pageType][0]{
  _id,
    pageType,
    metaTitle,
    metaDescription,
    keywords,
    canonicalUrl,
    ogImage {
      asset->{
        _id,
        url
      },
      alt
    }
}`;

export async function getSEObyPageType(pageType) {
  if (client) {
    return (await client.fetch(query, { pageType })) || {};
  }
  return {};
}
