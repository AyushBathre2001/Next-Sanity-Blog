import { client } from "@/lib/sanity/client";

const query = `*[_type == "nav"][0]{
 logo
}`;

export const getNavLogo = async () => {
  if (client) {
    return (await client.fetch(query)) || {};
  }
  return null;
};
