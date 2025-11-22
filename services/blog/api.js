export const getAllBlogs = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/data/query/production?query=*%5B_type+%3D%3D+%22article%22%5D+%7C+order%28publishedAt+desc%2C+_createdAt+desc%29+%7B%0A++_id%2C%0A++_createdAt%2C%0A++publishedAt%2C%0A++image+%7B%0A++++...%2C%0A++++%22blurDataURL%22%3Aasset-%3Emetadata.lqip%2C%0A++++%22ImageColor%22%3A+asset-%3Emetadata.palette.dominant.background%2C%0A++%7D%2C%0A++slug%2C%0A++title%2C%0A++author-%3E+%7B%0A++++_id%2C%0A++++name%2C%0A++++slug%2C%0A++++image%0A++%7D%2C%0A++categories%5B%5D-%3E%2C%0A%7D&perspective=drafts`
    );

    const posts = await response.json();
    return posts?.result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
