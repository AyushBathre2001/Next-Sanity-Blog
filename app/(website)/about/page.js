import { getAboutPage } from "@/lib/sanity/client";
import About from "./about";

export default async function AboutPage() {
  const aboutPage = await getAboutPage();
  return <About about={aboutPage} />;
}

// export const revalidate = 60;
